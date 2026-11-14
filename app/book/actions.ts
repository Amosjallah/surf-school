"use server";

import { revalidatePath } from "next/cache";
import { BookingError, createBooking } from "@/lib/booking";
import type { SubmitResult } from "@/lib/types";
import { bookingSchema, zodFieldErrors } from "@/lib/validators";

export async function submitBooking(input: unknown): Promise<SubmitResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors = zodFieldErrors(parsed.error);
    const step = fieldErrors.lessonId
      ? 1
      : fieldErrors.slotId || fieldErrors.groupSize
        ? 2
        : fieldErrors.waiverAccepted
          ? 4
          : 3;
    return { ok: false, fieldErrors, step };
  }

  try {
    const booking = await createBooking(parsed.data);
    revalidatePath("/");
    revalidatePath("/lessons");
    revalidatePath("/book");
    revalidatePath("/admin");
    return { ok: true, booking };
  } catch (error) {
    if (error instanceof BookingError) {
      return { ok: false, formError: error.message, step: error.step };
    }
    console.error(error);
    return {
      ok: false,
      formError: "We couldn’t save the booking. Try again in a moment.",
      step: 4,
    };
  }
}
