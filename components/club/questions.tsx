import { ClubButton } from "@/components/club/button";
import { faqs } from "@/lib/content";

const preview = faqs.slice(0, 4);

export function ClubQuestions() {
  return (
    <section id="questions" className="bg-[#f4f8f9] py-16 text-[#14282e] md:py-24" aria-labelledby="questions-heading">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 md:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <h2 id="questions-heading" className="club-title text-[clamp(1.8rem,3vw,2.6rem)]">
            Questions
          </h2>
          <p className="mt-4 max-w-[32ch] text-[15px] leading-relaxed text-[#5a7076]">
            What to bring, who can come, and what happens if the wind is up.
          </p>
          <div className="mt-8">
            <ClubButton href="/contact">All questions</ClubButton>
          </div>
        </div>
        <div>
          {preview.map((item) => (
            <details key={item.q} className="group border-b border-[#d7e4e7]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold">
                <span>{item.q}</span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-xl leading-none text-[#0d4552] group-open:bg-[#f0c014]">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">–</span>
                </span>
              </summary>
              <p className="max-w-[62ch] pb-5 text-sm leading-relaxed text-[#5a7076]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
