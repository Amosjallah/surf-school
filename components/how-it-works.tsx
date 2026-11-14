import { steps } from "@/lib/content";
import { Dek, SectionTitle, Wrap } from "@/components/section";

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="how-heading">
      <Wrap>
        <SectionTitle id="how-heading">How a lesson goes</SectionTitle>
        <Dek>Same shape every time. About two hours, a little less for kids and private lessons.</Dek>
        <ol className="mt-10">
          {steps.map((step, index) => (
            <li key={step.title} className="grid gap-3 border-t border-line py-8 md:grid-cols-[5.5rem_1fr]">
              <span className="font-display text-4xl leading-none">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-[1.7rem]">{step.title}</h3>
                <p className="measure mt-3 text-soft">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}
