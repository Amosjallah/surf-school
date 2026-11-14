import { faqs } from "@/lib/content";
import { SectionTitle, Wrap } from "@/components/section";

export function Faq() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="faq-heading">
      <Wrap>
        <SectionTitle id="faq-heading">Good to know before you book</SectionTitle>
        <div className="mt-8 border-b border-line">
          {faqs.map((item) => (
            <details key={item.q} className="group border-t border-line">
              <summary className="flex min-h-14 items-center justify-between gap-4 py-3 text-left text-lg">
                <span>{item.q}</span>
                <span aria-hidden="true" className="font-display text-2xl leading-none group-open:hidden">
                  +
                </span>
                <span aria-hidden="true" className="hidden font-display text-2xl leading-none group-open:inline">
                  –
                </span>
              </summary>
              <p className="measure pb-5 text-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
