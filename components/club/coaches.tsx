import { ClubButton } from "@/components/club/button";
import { coaches } from "@/lib/content";

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => /[A-Za-zÀ-ÿ]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ClubCoaches() {
  return (
    <section id="coaches" className="relative overflow-hidden bg-white py-16 text-[#14282e] md:py-24" aria-labelledby="coaches-heading">
      <p aria-hidden="true" className="pointer-events-none absolute top-6 right-6 hidden text-[6.5rem] leading-none font-extrabold tracking-tight text-[#0c3d48]/[0.06] uppercase xl:block">
        Coaches
      </p>
      <div className="relative mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="coaches-heading" className="club-title text-[clamp(1.8rem,3vw,2.6rem)]">
              The coaches
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-[#5a7076]">
              The person who meets you on the sand is the person in the water with you.
            </p>
          </div>
          <ClubButton href="/coaches">Read more</ClubButton>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {coaches.map((coach) => (
            <article key={coach.name} className="rounded-3xl border border-[#d7e4e7] p-6">
              <p className="grid size-14 place-items-center rounded-full bg-[#0d4552] text-base font-semibold text-white" aria-hidden="true">
                {initials(coach.name)}
              </p>
              <h3 className="step-title mt-5">{coach.name}</h3>
              <p className="mt-1 text-[11px] font-semibold tracking-[0.18em] text-[#0d4552] uppercase">{coach.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#5a7076]">{coach.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
