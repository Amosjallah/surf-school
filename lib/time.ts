import { TIMEZONE } from "@/lib/site";

export function johannesburgParts(now = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const bag: Record<string, string> = {};
  for (const part of fmt.formatToParts(now)) {
    if (part.type !== "literal") bag[part.type] = part.value;
  }
  const hour = bag.hour === "24" ? "00" : bag.hour;
  return {
    date: `${bag.year}-${bag.month}-${bag.day}`,
    time: `${hour}:${bag.minute}`,
  };
}

export function addDays(dateStr: string, days: number) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day + days));
  return utc.toISOString().slice(0, 10);
}

export function upcomingDates(count: number, from = johannesburgParts().date) {
  return Array.from({ length: count }, (_, index) => addDays(from, index));
}

export function isPastSlot(date: string, time: string, now = johannesburgParts()) {
  if (date < now.date) return true;
  if (date > now.date) return false;
  return time <= now.time;
}

function zonedDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 10, 0, 0));
}

export function formatDayLabel(dateStr: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(zonedDate(dateStr));
}

export function formatLongDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(zonedDate(dateStr));
}

export function addMinutes(time: string, minutes: number) {
  const [hour, minute] = time.split(":").map(Number);
  const total = hour * 60 + minute + minutes;
  const wrapped = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const nextHour = Math.floor(wrapped / 60);
  const nextMinute = wrapped % 60;
  return `${String(nextHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
}

/** South Africa Standard Time is UTC+2 all year. There is no daylight saving. */
export function sastToUtc(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour - 2, minute));
}
