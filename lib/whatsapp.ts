import { site } from "@/lib/site";
import { peopleLabel } from "@/lib/format";

export function whatsappHref(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function bookingWhatsappMessage(input: {
  reference: string;
  lessonName: string;
  whenLabel: string;
  groupSize: number;
}) {
  return [
    `Hi ${site.name}, I just requested a lesson.`,
    `Reference: ${input.reference}`,
    `${input.lessonName}, ${input.whenLabel}, ${peopleLabel(input.groupSize)}.`,
  ].join("\n");
}

export function generalWhatsappMessage() {
  return `Hi ${site.name}, I’d like to ask about a lesson at ${site.beach}.`;
}
