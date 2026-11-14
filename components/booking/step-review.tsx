import { waiverLabel } from "@/lib/policies";
import { paymentNotice } from "@/lib/payments";
import { skillLabels, swimLabels } from "@/lib/format";
import { site } from "@/lib/site";
import type { LessonView } from "@/lib/types";
import type { DetailState } from "@/components/booking/step-details";

export function StepReview({
  lesson,
  whenLabel,
  people,
  totalLabel,
  details,
  waiver,
  waiverError,
  onWaiver,
}: {
  lesson: LessonView;
  whenLabel: string;
  people: string;
  totalLabel: string;
  details: DetailState;
  waiver: boolean;
  waiverError?: string;
  onWaiver: (value: boolean) => void;
}) {
  const skill = details.skillLevel ? skillLabels[details.skillLevel] : "";
  const swim = details.swimmingAbility ? swimLabels[details.swimmingAbility] : "";

  return (
    <div>
      <dl className="border-t border-line">
        {[
          ["Lesson", lesson.name],
          ["When", whenLabel],
          ["Where", `${site.meetingPoint}, ${site.town}`],
          ["People", people],
          ["Name", details.name],
          ["Phone", details.phone],
          ["Email", details.email],
          ["Surfing", skill],
          ["In the water", swim],
        ].map(([label, value]) => (
          <div key={label} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[10rem_1fr]">
            <dt className="text-soft">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
        {details.medicalNotes ? (
          <div className="grid gap-1 border-b border-line py-3 sm:grid-cols-[10rem_1fr]">
            <dt className="text-soft">Notes for the coach</dt>
            <dd>{details.medicalNotes}</dd>
          </div>
        ) : null}
      </dl>
      <p className="mt-6 font-display text-5xl leading-none">{totalLabel}</p>
      <p className="measure mt-3 text-soft">{paymentNotice}</p>
      {details.swimmingAbility === "not-confident" ? (
        <p className="measure mt-3">
          Tell your coach when you arrive. They will keep the lesson in the shallows.
        </p>
      ) : null}
      <div className="mt-6">
        <label className="flex min-h-11 items-start gap-3">
          <input
            type="checkbox"
            className="mt-1"
            checked={waiver}
            onChange={(event) => onWaiver(event.target.checked)}
            aria-invalid={waiverError ? true : undefined}
            aria-describedby={waiverError ? "waiver-error" : "waiver-note"}
          />
          <span>
            {waiverLabel}{" "}
            <a className="underline underline-offset-4" href="/about#safety">
              Read the safety notes
            </a>
            .
          </span>
        </label>
        <p id="waiver-note" className="sr-only">
          Required before the request can be sent.
        </p>
        {waiverError ? (
          <p id="waiver-error" className="mt-2 text-sm text-danger">
            {waiverError}
          </p>
        ) : null}
      </div>
    </div>
  );
}
