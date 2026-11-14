"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  adminConfigured,
  clearAdminCookie,
  isAdmin,
  passwordMatches,
  setAdminCookie,
} from "@/lib/admin-auth";
import { cancelBookingById } from "@/lib/booking";
import { prisma } from "@/lib/db";
import { blockDateSchema, capacitySchema } from "@/lib/validators";

function deskError(message: string): never {
  redirect(`/admin?error=${encodeURIComponent(message)}`);
}

function deskNotice(message: string): never {
  redirect(`/admin?notice=${encodeURIComponent(message)}`);
}

async function requireAdmin() {
  if (!(await isAdmin())) deskError("Unlock the desk first.");
}

function refresh() {
  revalidatePath("/admin");
  revalidatePath("/book");
  revalidatePath("/");
}

export async function login(formData: FormData) {
  if (!adminConfigured()) {
    deskError("Set ADMIN_PASSWORD and ADMIN_SECRET in the environment.");
  }
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) deskError("That password didn’t match.");
  await setAdminCookie();
  redirect("/admin");
}

export async function logout() {
  await clearAdminCookie();
  redirect("/admin");
}

export async function updateCapacity(formData: FormData) {
  await requireAdmin();
  const parsed = capacitySchema.safeParse({
    slotId: formData.get("slotId"),
    capacity: formData.get("capacity"),
  });
  if (!parsed.success) deskError(parsed.error.issues[0]?.message ?? "Check the capacity.");

  const slot = await prisma.slot.findUnique({ where: { id: parsed.data.slotId } });
  if (!slot) deskError("That time is no longer on the schedule.");
  if (parsed.data.capacity < slot.bookedCount) {
    deskError("Capacity can’t be lower than the spots already held.");
  }

  const lock = await prisma.booking.findFirst({
    where: { slotId: slot.id, status: "confirmed", lesson: { exclusive: true } },
  });

  if (lock) {
    await prisma.$transaction([
      prisma.slot.update({
        where: { id: slot.id },
        data: { capacity: parsed.data.capacity, bookedCount: parsed.data.capacity },
      }),
      prisma.booking.update({
        where: { id: lock.id },
        data: { spotsHeld: parsed.data.capacity },
      }),
    ]);
  } else {
    const updated = await prisma.slot.updateMany({
      where: { id: slot.id, bookedCount: { lte: parsed.data.capacity } },
      data: { capacity: parsed.data.capacity },
    });
    if (updated.count !== 1) deskError("Capacity can’t be lower than the spots already held.");
  }

  refresh();
  deskNotice("Capacity updated.");
}

export async function setSlotClosed(formData: FormData) {
  await requireAdmin();
  const slotId = String(formData.get("slotId") ?? "");
  const closed = String(formData.get("closed") ?? "") === "true";
  if (!slotId) deskError("Choose a time.");
  await prisma.slot.update({ where: { id: slotId }, data: { blocked: closed } });
  refresh();
  deskNotice(closed ? "Time closed to new bookings." : "Time open again.");
}

export async function blockDate(formData: FormData) {
  await requireAdmin();
  const parsed = blockDateSchema.safeParse({
    date: formData.get("date"),
    reason: formData.get("reason"),
  });
  if (!parsed.success) deskError(parsed.error.issues[0]?.message ?? "Check the date.");
  await prisma.blockedDate.upsert({
    where: { date: parsed.data.date },
    create: parsed.data,
    update: { reason: parsed.data.reason },
  });
  refresh();
  deskNotice("Date blocked. Cancel the bookings below if people should not come.");
}

export async function unblockDate(formData: FormData) {
  await requireAdmin();
  const date = String(formData.get("date") ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) deskError("Choose a date.");
  await prisma.blockedDate.deleteMany({ where: { date } });
  refresh();
  deskNotice("Date open again.");
}

export async function cancelBooking(formData: FormData) {
  await requireAdmin();
  if (formData.get("confirm") !== "on") deskError("Tick the box to cancel that booking.");
  const id = String(formData.get("bookingId") ?? "");
  if (!id) deskError("Choose a booking.");
  try {
    const result = await cancelBookingById(id);
    refresh();
    deskNotice(`${result.reference} cancelled. The spots are free.`);
  } catch (error) {
    deskError(error instanceof Error ? error.message : "Could not cancel that booking.");
  }
}
