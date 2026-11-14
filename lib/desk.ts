import { prisma } from "@/lib/db";
import { skillLabels, swimLabels, type SkillLevel, type SwimLevel } from "@/lib/format";
import { formatDayLabel, upcomingDates } from "@/lib/time";

export async function getDesk(dayCount = 14) {
  const dates = upcomingDates(dayCount);
  const start = dates[0];
  const [slots, blocked, bookings] = await Promise.all([
    prisma.slot.findMany({
      where: { date: { in: dates } },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
    }),
    prisma.blockedDate.findMany({
      where: { date: { gte: start } },
      orderBy: { date: "asc" },
    }),
    prisma.booking.findMany({
      where: { slot: { date: { in: dates } } },
      include: { lesson: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const blockedByDate = new Map(blocked.map((row) => [row.date, row.reason]));
  const bookingsBySlot = new Map<string, typeof bookings>();
  for (const booking of bookings) {
    const list = bookingsBySlot.get(booking.slotId) ?? [];
    list.push(booking);
    bookingsBySlot.set(booking.slotId, list);
  }

  const slotsByDate = new Map<string, typeof slots>();
  for (const slot of slots) {
    const list = slotsByDate.get(slot.date) ?? [];
    list.push(slot);
    slotsByDate.set(slot.date, list);
  }

  const days = dates.map((date) => ({
    date,
    label: formatDayLabel(date),
    blockedReason: blockedByDate.get(date) ?? null,
    slots: (slotsByDate.get(date) ?? []).map((slot) => ({
      id: slot.id,
      startTime: slot.startTime,
      capacity: slot.capacity,
      bookedCount: slot.bookedCount,
      blocked: slot.blocked,
      bookings: (bookingsBySlot.get(slot.id) ?? []).map((booking) => ({
        id: booking.id,
        reference: booking.reference,
        name: booking.name,
        phone: booking.phone,
        email: booking.email,
        lessonName: booking.lesson.name,
        groupSize: booking.groupSize,
        spotsHeld: booking.spotsHeld,
        totalCents: booking.totalCents,
        currency: booking.currency,
        skill: skillLabels[booking.skillLevel as SkillLevel] ?? booking.skillLevel,
        swimming: swimLabels[booking.swimmingAbility as SwimLevel] ?? booking.swimmingAbility,
        medicalNotes: booking.medicalNotes,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
      })),
    })),
  }));

  return { days, blocked };
}

export type DeskData = Awaited<ReturnType<typeof getDesk>>;
