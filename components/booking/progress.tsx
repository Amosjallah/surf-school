import type { Ref } from "react";

const labels = ["Lesson", "Date and time", "Your details", "Review and confirm"] as const;

export function BookingProgress({
  step,
  headingRef,
}: {
  step: 1 | 2 | 3 | 4;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  return (
    <div className="mt-8">
      <p className="text-sm text-soft">Step {step} of 4</p>
      <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-[clamp(2rem,4vw,3rem)] outline-none">
        {labels[step - 1]}
      </h2>
      <div
        className="mt-4 h-1 bg-line"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={4}
        aria-valuenow={step}
        aria-valuetext={`Step ${step} of 4: ${labels[step - 1]}`}
      >
        <div className="h-full bg-wax" style={{ width: `${(step / 4) * 100}%` }} />
      </div>
      <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {labels.map((label, index) => (
          <li
            key={label}
            aria-current={index + 1 === step ? "step" : undefined}
            className={index + 1 === step ? "text-text" : "text-soft"}
          >
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}
