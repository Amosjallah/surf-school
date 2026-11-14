import { ClubButton } from "@/components/club/button";
import { steps } from "@/lib/content";

export function ClubSteps() {
  return (
    <section id="lesson" className="relative overflow-hidden bg-[#f4f8f9] py-16 text-[#14282e] md:py-24" aria-labelledby="lesson-heading">
      <p aria-hidden="true" className="pointer-events-none absolute top-6 left-6 hidden text-[6.5rem] leading-none font-extrabold tracking-tight text-[#0c3d48]/[0.06] uppercase lg:block">
        Lesson
      </p>
      <div className="relative mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="lesson-heading" className="club-title text-[clamp(1.8rem,3vw,2.6rem)]">
              The morning
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-[#5a7076]">
              Four parts, about two hours. You stay with the same coach from the sand to the walk back up.
            </p>
          </div>
          <ClubButton href="/book">Book a lesson</ClubButton>
        </div>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title}>
              <p className="text-sm font-semibold tracking-[0.18em] text-[#0d4552]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="step-title mt-3">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a7076]">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
