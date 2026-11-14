import { z } from "zod";
import { skillLabels, swimLabels } from "@/lib/format";

export const skillLevelSchema = z.enum(
  ["never", "tried", "improver"],
  { errorMap: () => ({ message: "Tell us whether you have surfed before." }) },
);

export const swimLevelSchema = z.enum(
  ["confident", "short", "not-confident"],
  { errorMap: () => ({ message: "Tell us how comfortable you are in the water." }) },
);

export const bookingSchema = z.object({
  lessonId: z.string().min(1, "Choose a lesson."),
  slotId: z.string().min(1, "Choose a date and time."),
  groupSize: z
    .number({ invalid_type_error: "Choose how many people are coming." })
    .int()
    .min(1, "Book at least one person.")
    .max(12, "For more than 12 people, call the school."),
  name: z
    .string()
    .trim()
    .min(2, "Enter the name we should write on the booking.")
    .max(80, "That name is too long.")
    .refine((value) => /\p{L}/u.test(value), "Enter a name."),
  phone: z
    .string()
    .trim()
    .min(8, "Enter a phone number with WhatsApp.")
    .max(20, "That phone number is too long.")
    .regex(/^[0-9+()\-\s]+$/, "Use digits, spaces, and a country code.")
    .refine(
      (value) => value.replace(/\D/g, "").length >= 8,
      "Enter a phone number with at least 8 digits.",
    ),
  email: z
    .string()
    .trim()
    .email("Enter an email address we can send the confirmation to."),
  skillLevel: skillLevelSchema,
  swimmingAbility: swimLevelSchema,
  medicalNotes: z
    .string()
    .trim()
    .max(500, "Keep medical notes under 500 characters."),
  waiverAccepted: z.literal(true, {
    errorMap: () => ({ message: "Tick the safety box to send the request." }),
  }),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const detailsSchema = bookingSchema.pick({
  name: true,
  phone: true,
  email: true,
  skillLevel: true,
  swimmingAbility: true,
  medicalNotes: true,
});

export function zodFieldErrors(error: z.ZodError) {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fields[key]) fields[key] = issue.message;
  }
  return fields;
}

export const capacitySchema = z.object({
  slotId: z.string().min(1),
  capacity: z.coerce
    .number()
    .int()
    .min(0, "Capacity can’t be negative.")
    .max(30, "Keep capacity at 30 or under."),
});

export const blockDateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date."),
  reason: z
    .string()
    .trim()
    .min(3, "Give a short reason students will understand.")
    .max(120, "Keep the reason under 120 characters."),
});

export { skillLabels, swimLabels };
