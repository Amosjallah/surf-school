import { testimonials } from "@/lib/content";
import { Wrap } from "@/components/section";

export function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <section className="bg-deep py-16 text-deep-text md:py-24" aria-labelledby="notes-heading">
      <Wrap>
        <h2 id="notes-heading" className="text-[clamp(2rem,4vw,3.25rem)]">
          After the lesson
        </h2>
        <figure className="mt-8 max-w-[22ch] sm:max-w-none">
          <blockquote className="max-w-[22ch] font-display text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.12] sm:max-w-[28ch]">
            {lead.quote}
          </blockquote>
          <figcaption className="mt-6 text-deep-soft">
            {lead.name}, {lead.detail}
          </figcaption>
        </figure>
        <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-2">
          {rest.map((item) => (
            <figure key={item.name}>
              <blockquote className="max-w-[46ch] text-lg leading-snug">{item.quote}</blockquote>
              <figcaption className="mt-3 text-sm text-deep-soft">
                {item.name}, {item.detail}
              </figcaption>
            </figure>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
