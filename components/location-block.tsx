import { ButtonLink } from "@/components/button";
import { site } from "@/lib/site";
import { SectionTitle, Wrap } from "@/components/section";

export function LocationBlock() {
  return (
    <section className="bg-raised py-16 md:py-24" aria-labelledby="find-heading">
      <Wrap className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionTitle id="find-heading">Find us</SectionTitle>
          <p className="measure mt-4">
            We meet on the sand at {site.meetingPoint}. Look towards the water from Beach Road. The train station is about a ten-minute walk.
          </p>
          <address className="mt-6 not-italic">
            {site.legalName}
            <br />
            {site.streetAddress}
            <br />
            {site.beach}
            <br />
            {site.town}, {site.country}
          </address>
          <div className="mt-6 flex flex-wrap gap-4">
            <a className="inline-flex min-h-11 items-center underline underline-offset-4" href={site.mapsUrl}>
              Open Muizenberg in Maps
            </a>
            <ButtonLink href="/book?lesson=first-wave" variant="quiet">
              Book a lesson
            </ButtonLink>
          </div>
        </div>
        <dl className="border-t border-line md:border-t-0 md:border-l md:pl-8">
          {site.hours.map((row) => (
            <div key={row.label} className="border-b border-line py-4">
              <dt className="text-sm text-soft">{row.label}</dt>
              <dd className="mt-1 text-xl">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Wrap>
    </section>
  );
}
