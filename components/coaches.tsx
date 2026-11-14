import { coaches } from "@/lib/content";
import { MediaFrame } from "@/components/media-frame";
import { Dek, SectionTitle, Wrap } from "@/components/section";

export function Coaches() {
  return (
    <section className="bg-raised py-16 md:py-24" aria-labelledby="coaches-heading">
      <Wrap>
        <SectionTitle id="coaches-heading">Coaches</SectionTitle>
        <Dek>You are with one of these three. They all start in the shallows.</Dek>
        <div className="mt-10">
          {coaches.map((coach) => (
            <article key={coach.name} className="grid gap-6 border-t border-line py-8 md:grid-cols-[220px_1fr] md:items-start">
              <MediaFrame aspect="portrait" alt={coach.photoAlt} label={coach.photoAlt} />
              <div>
                <h3 className="text-3xl">{coach.name}</h3>
                <p className="mt-1 text-soft">{coach.role}</p>
                <p className="measure mt-4">{coach.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
