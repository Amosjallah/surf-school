import Link from "next/link";
import { lessonCatalog } from "@/lib/catalog";
import { formatDuration, formatMoney } from "@/lib/format";

export function ClubPrices() {
  return (
    <section id="prices" className="bg-[#0d4552] py-16 text-white md:py-24" aria-labelledby="prices-heading">
      <div className="mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="prices-heading" className="club-title text-[clamp(1.8rem,3vw,2.6rem)] text-white">
              Prices
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-white/75">
              Boards, leashes, and wetsuits are included. Group lessons are priced per person.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center border border-white px-5 text-[11px] font-semibold tracking-[0.18em] text-white uppercase hover:bg-white hover:text-[#0c3d48]"
          >
            All prices
          </Link>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {lessonCatalog.map((lesson, index) => (
            <article
              key={lesson.slug}
              className={index === 0 ? "rounded-3xl bg-[#f0c014] p-6 text-[#1c1604]" : "rounded-3xl bg-white/10 p-6"}
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase">{lesson.skillLevel}</p>
              <h3 className="step-title mt-3 text-inherit">{lesson.name}</h3>
              <p className="mt-5 text-4xl leading-none font-semibold">{formatMoney(lesson.priceCents, lesson.currency)}</p>
              <p className="mt-2 text-sm opacity-80">{lesson.exclusive ? "for one person" : "per person"}</p>
              <p className="mt-4 text-sm opacity-80">
                {formatDuration(lesson.durationMins)} · {lesson.exclusive ? "holds the time" : `up to ${lesson.maxGroupSize}`}
              </p>
              <Link href={`/book?lesson=${lesson.slug}`} className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">
                Book {lesson.name}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
