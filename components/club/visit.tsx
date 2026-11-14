import Image from "next/image";
import { site } from "@/lib/site";

const facts = [
  { label: "Meet", value: site.meetingPoint },
  { label: "Desk", value: site.hours[0].value },
  { label: "Train", value: "Muizenberg station is about a ten-minute walk." },
] as const;

export function ClubVisit() {
  return (
    <section id="visit" className="bg-white py-16 text-[#14282e] md:py-24" aria-labelledby="visit-heading">
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="visit-heading" className="club-title text-[clamp(1.8rem,3vw,2.6rem)]">
            Find us
          </h2>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-[#5a7076]">
            {site.beach}, {site.town}. Look for us on the beach side of Beach Road, at Surfers Corner.
          </p>
          <dl className="mt-8 space-y-5">
            {facts.map((fact) => (
              <div key={fact.label} className="border-l-2 border-[#f0c014] pl-4">
                <dt className="text-[11px] font-semibold tracking-[0.18em] text-[#0d4552] uppercase">{fact.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={site.mapsUrl}
            className="mt-8 inline-flex h-11 items-center justify-center border border-[#0c3d48] px-5 text-[11px] font-semibold tracking-[0.18em] text-[#0c3d48] uppercase hover:bg-[#0c3d48] hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Open the map
          </a>
        </div>
        <div className="relative min-h-[280px] overflow-hidden rounded-3xl sm:min-h-[420px]">
          <Image
            src="/surf/px-surfer2.jpg"
            alt="A surfer dropping into a wave at sunset"
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover object-[58%_62%]"
          />
        </div>
      </div>
    </section>
  );
}
