import { cancellationPolicy, weatherPolicy } from "@/lib/policies";
import { paymentNotice } from "@/lib/payments";
import { site } from "@/lib/site";
import { peopleLabel } from "@/lib/format";

export type EmailMode = "resend" | "stub";

type Outbound = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail(message: Outbound): Promise<{ delivered: boolean; mode: EmailMode }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    console.info(`[email stub] ${message.subject} → ${message.to}`);
    return { delivered: false, mode: "stub" };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const result = await resend.emails.send({
    from,
    to: message.to,
    subject: message.subject,
    text: message.text,
  });

  if (result.error) {
    console.error("[email]", result.error);
    return { delivered: false, mode: "resend" };
  }

  return { delivered: true, mode: "resend" };
}

export function bookingConfirmationText(input: {
  name: string;
  reference: string;
  lessonName: string;
  whenLabel: string;
  groupSize: number;
  totalLabel: string;
}) {
  return [
    `Hi ${input.name},`,
    "",
    `You’re booked with ${site.legalName}.`,
    "",
    `Reference: ${input.reference}`,
    `Lesson: ${input.lessonName}`,
    `When: ${input.whenLabel} (South African time)`,
    `People: ${peopleLabel(input.groupSize)}`,
    `Total: ${input.totalLabel}`,
    paymentNotice,
    "",
    `Meet 15 minutes early at ${site.meetingPoint}, ${site.town}.`,
    "Bring a swimsuit, a towel, water, and sunscreen for your face. We have the board and the wetsuit.",
    "",
    cancellationPolicy,
    weatherPolicy,
    "",
    site.legalName,
    site.meetingPoint,
    site.phoneDisplay,
  ].join("\n");
}

export function cancellationText(input: {
  name: string;
  reference: string;
  lessonName: string;
  whenLabel: string;
}) {
  return [
    `Hi ${input.name},`,
    "",
    `We’ve cancelled your ${site.name} lesson.`,
    "",
    `Reference: ${input.reference}`,
    `Lesson: ${input.lessonName}`,
    `When: ${input.whenLabel}`,
    "",
    "Those spots are free again. Reply on WhatsApp if you want another day.",
    "",
    site.legalName,
  ].join("\n");
}
