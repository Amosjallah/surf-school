"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitBooking } from "@/app/book/actions";
import { Button } from "@/components/button";
import { Confirmation } from "@/components/booking/confirmation";
import { BookingProgress } from "@/components/booking/progress";
import { StepDetails, type DetailState } from "@/components/booking/step-details";
import { StepLesson } from "@/components/booking/step-lesson";
import { StepReview } from "@/components/booking/step-review";
import { slotBlockReason, StepTime } from "@/components/booking/step-time";
import { formatMoney, peopleLabel } from "@/lib/format";
import { addMinutes, formatLongDate } from "@/lib/time";
import type { BookingReceipt, DayView, FieldErrors, LessonView } from "@/lib/types";
import { bookingSchema, detailsSchema, zodFieldErrors } from "@/lib/validators";

function firstOpenDate(days: DayView[], lesson: LessonView | undefined) {
  const match = days.find((day) => {
    if (!lesson || day.blockedReason) return false;
    return day.slots.some((slot) => !slotBlockReason(slot, lesson, null));
  });
  return match?.date ?? days[0]?.date ?? "";
}

export function BookFlow({
  lessons,
  days,
  initialLessonSlug,
}: {
  lessons: LessonView[];
  days: DayView[];
  initialLessonSlug?: string;
}) {
  const router = useRouter();
  const initial = lessons.find((lesson) => lesson.slug === initialLessonSlug) ?? lessons[0];
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [lessonId, setLessonId] = useState(initial?.id ?? "");
  const [date, setDate] = useState(() => firstOpenDate(days, initial));
  const [slotId, setSlotId] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [details, setDetails] = useState<DetailState>({
    name: "",
    phone: "",
    email: "",
    skillLevel: "",
    swimmingAbility: "",
    medicalNotes: "",
  });
  const [waiver, setWaiver] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  const lesson = lessons.find((item) => item.id === lessonId) ?? lessons[0];
  const day = days.find((item) => item.date === date);
  const slot = day?.slots.find((item) => item.id === slotId);
  const count = lesson?.exclusive ? 1 : groupSize;
  const total = (lesson?.priceCents ?? 0) * count;
  const whenLabel =
    lesson && day && slot
      ? `${formatLongDate(day.date)}, ${slot.startTime}–${addMinutes(slot.startTime, lesson.durationMins)}`
      : "";

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step, receipt]);

  if (!lesson) {
    return <p>No lessons are in the schedule yet.</p>;
  }

  function chooseLesson(id: string) {
    const next = lessons.find((item) => item.id === id);
    setLessonId(id);
    setErrors({});
    setFormError(null);
    if (next?.exclusive) setGroupSize(1);
    if (slot && day && next && slotBlockReason(slot, next, day.blockedReason)) setSlotId("");
  }

  function chooseDate(nextDate: string) {
    setDate(nextDate);
    setSlotId("");
    setErrors({});
    setFormError(null);
  }

  function chooseSlot(id: string) {
    setSlotId(id);
    setErrors({});
    setFormError(null);
    const nextSlot = day?.slots.find((item) => item.id === id);
    if (lesson && nextSlot && !lesson.exclusive) {
      setGroupSize((current) => Math.max(1, Math.min(current, lesson.maxGroupSize, nextSlot.remaining)));
    }
  }

  function back() {
    setErrors({});
    setFormError(null);
    setStep((current) => (current > 1 ? ((current - 1) as 1 | 2 | 3 | 4) : current));
  }

  function goNext() {
    setFormError(null);
    if (step === 1) {
      setErrors({});
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!day || !slot) {
        setErrors({ slotId: "Choose a date and time." });
        return;
      }
      const block = slotBlockReason(slot, lesson, day.blockedReason);
      if (block) {
        setErrors({ slotId: "That time isn’t open. Pick another." });
        return;
      }
      if (!lesson.exclusive && groupSize > slot.remaining) {
        setErrors({ groupSize: `Only ${slot.remaining} ${slot.remaining === 1 ? "spot" : "spots"} left at that time.` });
        return;
      }
      setErrors({});
      setStep(3);
      return;
    }
    const parsed = detailsSchema.safeParse(details);
    if (!parsed.success) {
      setErrors(zodFieldErrors(parsed.error));
      return;
    }
    setDetails({ ...details, ...parsed.data });
    setErrors({});
    setStep(4);
  }

  async function send() {
    if (!day || !slot) {
      setStep(2);
      setFormError("Choose a date and time.");
      return;
    }
    const parsed = bookingSchema.safeParse({
      lessonId: lesson.id,
      slotId: slot.id,
      groupSize: lesson.exclusive ? 1 : groupSize,
      ...details,
      waiverAccepted: waiver ? true : false,
    });
    if (!parsed.success) {
      setErrors(zodFieldErrors(parsed.error));
      setFormError(null);
      return;
    }
    setPending(true);
    const result = await submitBooking(parsed.data);
    setPending(false);
    if (!result.ok) {
      setErrors(result.fieldErrors ?? {});
      setFormError(result.formError ?? "We couldn’t save the booking.");
      if (result.step) setStep(result.step);
      if (result.step === 2) router.refresh();
      return;
    }
    setReceipt(result.booking);
    router.refresh();
  }

  if (receipt) {
    return <Confirmation receipt={receipt} headingRef={headingRef} />;
  }

  const alertMessages = [formError, ...Object.values(errors)].filter((message): message is string => Boolean(message));
  const nextLabel = step === 1 ? "Choose a time" : step === 2 ? "Enter your details" : "Review booking";

  return (
    <div>
      <BookingProgress step={step} headingRef={headingRef} />
      {alertMessages.length > 0 ? (
        <div role="alert" className="mt-6 border border-danger px-3 py-3 text-danger">
          <ul className="space-y-1">
            {alertMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="mt-8">
        {step === 1 ? <StepLesson lessons={lessons} lessonId={lesson.id} onSelect={chooseLesson} /> : null}
        {step === 2 ? (
          <StepTime
            days={days}
            date={date}
            lesson={lesson}
            slotId={slotId}
            groupSize={groupSize}
            onDate={chooseDate}
            onSlot={chooseSlot}
            onGroup={setGroupSize}
          />
        ) : null}
        {step === 3 ? (
          <StepDetails
            details={details}
            errors={errors}
            onChange={(next) => {
              setDetails(next);
              setErrors({});
              setFormError(null);
            }}
          />
        ) : null}
        {step === 4 && whenLabel ? (
          <StepReview
            lesson={lesson}
            whenLabel={whenLabel}
            people={peopleLabel(count)}
            totalLabel={formatMoney(total, lesson.currency)}
            details={details}
            waiver={waiver}
            waiverError={errors.waiverAccepted}
            onWaiver={(value) => {
              setWaiver(value);
              setErrors({});
            }}
          />
        ) : null}
      </div>
      <div className="mt-8 flex flex-col gap-6 border-t border-line pt-5 sm:flex-row sm:items-end sm:justify-between">
        <p aria-live="polite">
          <span className="font-display text-4xl">{formatMoney(total, lesson.currency)}</span>
          <span className="mt-1 block text-sm text-soft">
            {peopleLabel(count)}
            {lesson.exclusive ? " · holds the whole time" : ""}
          </span>
        </p>
        <div className="flex flex-wrap gap-3">
          {step > 1 ? (
            <Button type="button" variant="quiet" onClick={back}>
              Back
            </Button>
          ) : null}
          {step < 4 ? (
            <Button type="button" onClick={goNext}>
              {nextLabel}
            </Button>
          ) : (
            <Button type="button" onClick={send} disabled={pending} aria-busy={pending}>
              {pending ? "Sending request…" : "Send booking request"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
