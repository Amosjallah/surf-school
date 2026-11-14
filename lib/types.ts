import type { EmailMode } from "@/lib/email";
import type { PaymentStart } from "@/lib/payments";

export type LessonView = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  durationMins: number;
  priceCents: number;
  currency: string;
  maxGroupSize: number;
  skillLevel: string;
  exclusive: boolean;
  includes: string[];
};

export type SlotView = {
  id: string;
  startTime: string;
  remaining: number;
  capacity: number;
  past: boolean;
  closed: boolean;
};

export type DayView = {
  date: string;
  label: string;
  blockedReason: string | null;
  slots: SlotView[];
};

export type BookingReceipt = {
  reference: string;
  lessonName: string;
  dateLabel: string;
  startTime: string;
  endTime: string;
  whenLabel: string;
  groupSize: number;
  totalCents: number;
  currency: string;
  totalLabel: string;
  email: string;
  name: string;
  shallowWater: boolean;
  emailDelivered: boolean;
  emailMode: EmailMode;
  calendarUrl: string;
  ics: string;
  whatsappUrl: string;
  payment: PaymentStart;
};

export type FieldErrors = Partial<
  Record<
    | "lessonId"
    | "slotId"
    | "groupSize"
    | "name"
    | "phone"
    | "email"
    | "skillLevel"
    | "swimmingAbility"
    | "medicalNotes"
    | "waiverAccepted",
    string
  >
>;

export type SubmitResult =
  | { ok: true; booking: BookingReceipt }
  | { ok: false; formError?: string; fieldErrors?: FieldErrors; step?: 1 | 2 | 3 | 4 };
