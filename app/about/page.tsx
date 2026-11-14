import Image from "next/image";
import { PageBand } from "@/components/club/page-band";
import { pageMeta } from "@/lib/metadata";
import {
  agePolicy,
  cancellationPolicy,
  certificationNote,
  detailsUse,
  safetyBriefing,
  weatherPolicy,
} from "@/lib/policies";
import { paymentNotice } from "@/lib/payments";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Schools",
  "How Saltline runs a lesson at Muizenberg: the meeting point, the safety briefing, Shark Spotters flags, and what happens when the wind is up.",
);

const facts = [
  { label: "Beach", value: site.beach },
  { label: "Meet", value: "Surfers Corner" },
  { label: "Desk", value: site.hours[0].value },
] as const;

const notes = [
  { title: "Weather", body: weatherPolicy },
  { title: "Cancellations", body: cancellationPolicy },
  { title: "Payment", body: paymentNotice },
  { title: "Certifications", body: certificationNote },
  { title: "Your details", body: detailsUse },
] as const;

export default function AboutPage() {
  return (
    <main id="content" className="page-shell">
      <PageBand
        eyebrow="Schools"
        title="The school on the beach."
        lede={`${site.legalName} teaches on the beach break at ${site.beach}. The wave is gentle whitewater most days, which is why beginners start here.`}
      />

      <section className="mx-auto grid w-full max-w-[1120px] items-center gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="max-w-[46ch] text-lg leading-relaxed">
            We meet at {site.meetingPoint}, {site.town}. Arrive a little early so there is time to look at the wind, the tide, and the flag before anyone gets changed.
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl bg-[#f4f8f9] px-4 py-5">
                <dt className="text-[11px] font-semibold tracking-[0.18em] text-[#0d4552] uppercase">{fact.label}</dt>
                <dd className="mt-2 text-base font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative min-h-[280px] overflow-hidden rounded-3xl sm:min-h-[360px]">
          <Image
            src="/surf/hero-2.jpg"
            alt="A yellow longboard lying on the sand"
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section id="safety" className="bg-[#f4f8f9]" aria-labelledby="briefing">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-14 md:px-8 md:py-20">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#0d4552] uppercase">Before you paddle</p>
          <h2 id="briefing" className="mt-3 max-w-[14ch] text-[clamp(2rem,4vw,3.2rem)]">
            Safety briefing
          </h2>
          <p className="mt-4 max-w-[52ch] text-[#4e656c]">This is what we go through on the sand before anyone paddles.</p>
          <ol className="mt-8 max-w-[760px]">
            {safetyBriefing.map((item, index) => (
              <li key={item} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-[#d7e4e7] py-5">
                <span className="text-sm font-semibold text-[#0d4552]">{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-[62ch] text-[#4e656c]">{agePolicy}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 py-14 md:px-8 md:py-20" aria-label="School notes">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <article key={note.title} className="rounded-3xl border border-[#d7e4e7] p-6">
              <h2 className="text-xl">{note.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4e656c]">{note.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
