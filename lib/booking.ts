import { randomInt } from "node:crypto";
import type { Prisma } from "@prisma/client";
import { buildIcs, calendarCopy, googleCalendarUrl, lessonRange } from "@/lib/calendar";
import { prisma } from "@/lib/db";
import {
  bookingConfirmationText,
  cancellationText,
  sendEmail,
  type EmailMode,
} from "@/lib/email";
import { formatMoney, peopleLabel } from "@/lib/format";
import { addMinutes, formatLongDate, isPastSlot } from "@/lib/time";
import { beginPayment, type PaymentStart } from "@/lib/payments";
import { site } from "@/lib/site";
import type { BookingReceipt } from "@/lib/types";
import type { BookingInput } from "@/lib/validators";
import { bookingWhatsappMessage, whatsappHref } from "@/lib/whatsapp";

const referenceAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export class BookingError extends Error {
  step: 1 | 2 | 4;

  constructor(message: string, step: 1 | 2 | 4 = 2) {
    super(message);
    this.name = "BookingError";
    this.step = step;
  }
}

function makeReference() {
  let body = "";
  for (let index = 0; index < 6; index += 1) {
    body += referenceAlphabet[randomInt(referenceAlphabet.length)];
  }
  return `SL-${body}`;
}

async function freshReference() {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const reference = makeReference();
    const existing = await prisma.booking.findUnique({ where: { reference }, select: { id: true } });
    if (!existing) return reference;
  }
  throw new BookingError("We couldn’t make a reference. Send the request again.", 4);
}

type Tx = Prisma.TransactionClient;

async function holdSpots(tx: Tx, input: BookingInput, reference: string) {
  const lesson = await tx.lesson.findUnique({ where: { id: input.lessonId } });
  if (!lesson || !lesson.active) {
    throw new BookingError("That lesson is no longer on the schedule.", 1);
  }

  const slot = await tx.slot.findUnique({ where: { id: input.slotId } });
  if (!slot) throw new BookingError("Choose a date and time.", 2);

  const blocked = await tx.blockedDate.findUnique({ where: { date: slot.date } });
  if (blocked) {
    throw new BookingError(`Lessons are paused that day: ${blocked.reason}`, 2);
  }
  if (slot.blocked || slot.capacity < 1) throw new BookingError("That time is closed.", 2);
  if (isPastSlot(slot.date, slot.startTime)) {
    throw new BookingError("That time has already started. Pick a later one.", 2);
  }
  if (input.groupSize > lesson.maxGroupSize) {
    throw new BookingError(`This lesson can take ${lesson.maxGroupSize} people at once.`, 2);
  }
  if (lesson.exclusive && input.groupSize !== 1) {
    throw new BookingError("A private lesson is for one person.", 2);
  }

  const spotsHeld = lesson.exclusive ? slot.capacity : input.groupSize;
  if (!lesson.exclusive && slot.bookedCount + input.groupSize > slot.capacity) {
    const left = Math.max(0, slot.capacity - slot.bookedCount);
    throw new BookingError(
      left === 0 ? "That time just filled up. Pick another." : `Only ${left} ${left === 1 ? "spot" : "spots"} left at that time.`,
      2,
    );
  }
  if (lesson.exclusive && slot.bookedCount > 0) {
    throw new BookingError("That time already has a group, so a private lesson won’t fit.", 2);
  }

  const updated = lesson.exclusive
    ? await tx.slot.updateMany({
        where: { id: slot.id, blocked: false, bookedCount: 0 },
        data: { bookedCount: slot.capacity },
      })
    : await tx.slot.updateMany({
        where: {
          id: slot.id,
          blocked: false,
          bookedCount: { lte: slot.capacity - input.groupSize },
        },
        data: { bookedCount: { increment: input.groupSize } },
      });

  if (updated.count !== 1) {
    throw new BookingError("That time just filled up. Pick another.", 2);
  }

  const booking = await tx.booking.create({
    data: {
      reference,
      lessonId: lesson.id,
      slotId: slot.id,
      groupSize: input.groupSize,
      spotsHeld,
      totalCents: lesson.priceCents * input.groupSize,
      currency: lesson.currency,
      name: input.name,
      phone: input.phone,
      email: input.email,
      skillLevel: input.skillLevel,
      swimmingAbility: input.swimmingAbility,
      medicalNotes: input.medicalNotes,
      waiverAcceptedAt: new Date(),
      status: "confirmed",
      paymentStatus: "unpaid",
    },
  });

  return { booking, lesson, slot, spotsHeld };
}

export async function createBooking(input: BookingInput): Promise<BookingReceipt> {
  const reference = await freshReference();
  const held = await prisma.$transaction((tx) => holdSpots(tx, input, reference));
  const { booking, lesson, slot } = held;
  const endTime = addMinutes(slot.startTime, lesson.durationMins);
  const whenLabel = `${formatLongDate(slot.date)}, ${slot.startTime}–${endTime}`;
  const totalLabel = formatMoney(booking.totalCents, booking.currency);
  const range = lessonRange(slot.date, slot.startTime, lesson.durationMins);
  const copy = calendarCopy({ reference, lessonName: lesson.name, whenLabel });

  let emailDelivered = false;
  let emailMode: EmailMode = "stub";
  try {
    const sent = await sendEmail({
      to: booking.email,
      subject: `Your ${site.name} lesson — ${reference}`,
      text: bookingConfirmationText({
        name: booking.name,
        reference,
        lessonName: lesson.name,
        whenLabel,
        groupSize: booking.groupSize,
        totalLabel,
      }),
    });
    emailDelivered = sent.delivered;
    emailMode = sent.mode;
  } catch (error) {
    console.error("[email] confirmation failed", error);
  }

  let payment: PaymentStart = { provider: "unconfigured", status: "unpaid" };
  try {
    payment = await beginPayment({
      reference,
      totalCents: booking.totalCents,
      currency: booking.currency,
      email: booking.email,
    });
  } catch (error) {
    console.error("[payment] hook failed", error);
  }

  const whatsappUrl = whatsappHref(
    bookingWhatsappMessage({
      reference,
      lessonName: lesson.name,
      whenLabel,
      groupSize: booking.groupSize,
    }),
  );

  return {
    reference,
    lessonName: lesson.name,
    dateLabel: formatLongDate(slot.date),
    startTime: slot.startTime,
    endTime,
    whenLabel,
    groupSize: booking.groupSize,
    totalCents: booking.totalCents,
    currency: booking.currency,
    totalLabel,
    email: booking.email,
    name: booking.name,
    shallowWater: input.swimmingAbility === "not-confident",
    emailDelivered,
    emailMode,
    calendarUrl: googleCalendarUrl({ ...copy, start: range.start, end: range.end }),
    ics: buildIcs({ ...copy, reference, start: range.start, end: range.end }),
    whatsappUrl,
    payment,
  };
}

export async function cancelBookingById(id: string) {
  const cancelled = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: { id },
      include: { lesson: true, slot: true },
    });
    if (!booking || booking.status !== "confirmed") {
      throw new Error("That booking is already cancelled.");
    }

    const marked = await tx.booking.updateMany({
      where: { id, status: "confirmed" },
      data: { status: "cancelled", cancelledAt: new Date() },
    });
    if (marked.count !== 1) throw new Error("That booking is already cancelled.");

    const released = await tx.slot.updateMany({
      where: { id: booking.slotId, bookedCount: { gte: booking.spotsHeld } },
      data: { bookedCount: { decrement: booking.spotsHeld } },
    });
    if (released.count !== 1) throw new Error("The spots could not be released. Refresh and try again.");

    return booking;
  });

  const endTime = addMinutes(cancelled.slot.startTime, cancelled.lesson.durationMins);
  const whenLabel = `${formatLongDate(cancelled.slot.date)}, ${cancelled.slot.startTime}–${endTime}`;
  try {
    await sendEmail({
      to: cancelled.email,
      subject: `Cancelled ${site.name} lesson — ${cancelled.reference}`,
      text: cancellationText({
        name: cancelled.name,
        reference: cancelled.reference,
        lessonName: cancelled.lesson.name,
        whenLabel,
      }),
    });
  } catch (error) {
    console.error("[email] cancellation failed", error);
  }

  return { reference: cancelled.reference, whenLabel, people: peopleLabel(cancelled.groupSize) };
}
