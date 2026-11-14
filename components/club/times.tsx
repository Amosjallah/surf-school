import { ClubButton } from "@/components/club/button";
import { site } from "@/lib/site";

export function ClubTimes() {
  return (
    <section id="times" className="bg-white py-16 text-[#14282e] md:py-24" aria-labelledby="times-heading">
      <div className="mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="times-heading" className="club-title text-[clamp(1.8rem,3vw,2.6rem)]">
              The day
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-[#5a7076]">
              Four starts, every day. We still look at the tide, the swell, and the wind before anyone gets in.
            </p>
          </div>
          <ClubButton href="/book">See the week</ClubButton>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.slotTimes.map((time, index) => (
            <li key={time} className="rounded-3xl border border-[#d7e4e7] px-6 py-8">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#0d4552]">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-3 text-5xl font-semibold tracking-tight text-[#0d4552]">{time}</p>
              <p className="mt-3 text-sm text-[#5a7076]">Meet 15 minutes before</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-[#5a7076]">Desk open {site.hours[0].value.toLowerCase()}.</p>
      </div>
    </section>
  );
}
