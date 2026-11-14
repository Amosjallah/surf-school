import { Dek, SectionTitle, Wrap } from "@/components/section";
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
  "Safety and the school",
  "How Saltline runs a lesson at Muizenberg: certifications, the safety briefing, Shark Spotters flags, and what happens when the wind is up.",
);

export default function AboutPage() {
  return (
    <main id="content" className="py-12 md:py-16">
      <Wrap>
        <SectionTitle as="h1">Safety and the school</SectionTitle>
        <Dek>
          {site.legalName} teaches on the beach break at {site.beach}. The wave is a gentle whitewater most days, which is why beginners start here rather than on a point or a reef.
        </Dek>

        <div className="measure mt-12 space-y-12">
          <section aria-labelledby="certs">
            <h2 id="certs" className="text-3xl">
              Certifications
            </h2>
            <p className="mt-4">{certificationNote}</p>
          </section>

          <section id="safety" aria-labelledby="briefing">
            <h2 id="briefing" className="text-3xl">
              Safety briefing
            </h2>
            <p className="mt-4">This is what we go through on the sand before anyone paddles.</p>
            <ul className="mt-4">
              {safetyBriefing.map((item) => (
                <li key={item} className="border-t border-line py-3">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">{agePolicy}</p>
          </section>

          <section aria-labelledby="weather">
            <h2 id="weather" className="text-3xl">
              Weather and cancellations
            </h2>
            <p className="mt-4">{weatherPolicy}</p>
            <p className="mt-4">{cancellationPolicy}</p>
            <p className="mt-4">{paymentNotice}</p>
          </section>

          <section aria-labelledby="details">
            <h2 id="details" className="text-3xl">
              Your details
            </h2>
            <p className="mt-4">{detailsUse}</p>
          </section>
        </div>
      </Wrap>
    </main>
  );
}
