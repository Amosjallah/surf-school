import { site } from "@/lib/site";
import { sastToUtc } from "@/lib/time";

function googleStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function lessonRange(date: string, startTime: string, durationMins: number) {
  const start = sastToUtc(date, startTime);
  const end = new Date(start.getTime() + durationMins * 60_000);
  return { start, end };
}

export function googleCalendarUrl(input: {
  title: string;
  start: Date;
  end: Date;
  details: string;
  location: string;
}) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    dates: `${googleStamp(input.start)}/${googleStamp(input.end)}`,
    details: input.details,
    location: input.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function icsStamp(date: Date) {
  return googleStamp(date);
}

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function buildIcs(input: {
  reference: string;
  title: string;
  start: Date;
  end: Date;
  details: string;
  location: string;
}) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Saltline//Surf lesson//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${input.reference}@saltline.local`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(input.start)}`,
    `DTEND:${icsStamp(input.end)}`,
    `SUMMARY:${escapeIcs(input.title)}`,
    `LOCATION:${escapeIcs(input.location)}`,
    `DESCRIPTION:${escapeIcs(input.details)}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

export function calendarCopy(input: {
  reference: string;
  lessonName: string;
  whenLabel: string;
}) {
  return {
    title: `Surf lesson with ${site.name}`,
    location: `${site.meetingPoint}, ${site.town}`,
    details: `Reference ${input.reference}. ${input.lessonName}. ${input.whenLabel}. Arrive 15 minutes early.`,
  };
}
