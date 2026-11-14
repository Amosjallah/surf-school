import { prisma } from "@/lib/db";
import { formatDayLabel, isPastSlot, upcomingDates } from "@/lib/time";
import type { DayView } from "@/lib/types";

export async function getPublicDays(count = 14): Promise<DayView[]> {
  const dates = upcomingDates(count);
  const [slots, blocked] = await Promise.all([
    prisma.slot.findMany({
      where: { date: { in: dates } },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
    }),
    prisma.blockedDate.findMany({ where: { date: { in: dates } } }),
  ]);

  const blockedByDate = new Map(blocked.map((row) => [row.date, row.reason]));
  const slotsByDate = new Map<string, typeof slots>();
  for (const slot of slots) {
    const list = slotsByDate.get(slot.date) ?? [];
    list.push(slot);
    slotsByDate.set(slot.date, list);
  }

  return dates.map((date) => ({
    date,
    label: formatDayLabel(date),
    blockedReason: blockedByDate.get(date) ?? null,
    slots: (slotsByDate.get(date) ?? []).map((slot) => ({
      id: slot.id,
      startTime: slot.startTime,
      remaining: Math.max(0, slot.capacity - slot.bookedCount),
      capacity: slot.capacity,
      past: isPastSlot(date, slot.startTime),
      closed: slot.blocked,
    })),
  }));
}
