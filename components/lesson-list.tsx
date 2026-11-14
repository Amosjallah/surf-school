import Link from "next/link";
import { formatDuration, formatMoney } from "@/lib/format";
import type { LessonView } from "@/lib/types";

function BookPill({ href, onDark }: { href: string; onDark?: boolean }) {
  return (
    <Link
      href={href}
      className={
        onDark
          ? "inline-flex h-11 items-center justify-center rounded-full bg-[#f0c014] px-5 text-sm font-semibold text-[#1c1604] hover:bg-[#ffd84a]"
          : "inline-flex h-11 items-center justify-center rounded-full bg-[#0d4552] px-5 text-sm font-semibold text-white hover:bg-[#102f36]"
      }
    >
      Book this lesson
    </Link>
  );
}

export function LessonList({
  lessons,
  layout,
}: {
  lessons: LessonView[];
  layout: "lessons" | "pricing";
}) {
  if (lessons.length === 0) {
    return <p className="text-[#4e656c]">No lessons are in the schedule yet.</p>;
  }

  if (layout === "pricing") {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {lessons.map((lesson, index) => {
          const featured = index === 0;
          return (
            <article
              key={lesson.id}
              className={
                featured
                  ? "flex flex-col rounded-3xl bg-[#0d4552] p-6 text-white"
                  : "flex flex-col rounded-3xl border border-[#d7e4e7] bg-[#f7fbfb] p-6 text-[#14282e]"
              }
            >
              <p className={featured ? "text-[11px] font-semibold tracking-[0.18em] text-[#f0c014] uppercase" : "text-[11px] font-semibold tracking-[0.18em] text-[#0d4552] uppercase"}>
                {lesson.skillLevel}
              </p>
              <h2 className="mt-3 text-2xl">{lesson.name}</h2>
              <p className={`mt-5 text-4xl leading-none font-semibold ${featured ? "text-[#f0c014]" : "text-[#0d4552]"}`}>
                {formatMoney(lesson.priceCents, lesson.currency)}
              </p>
              <p className={`mt-2 text-sm ${featured ? "text-white/75" : "text-[#4e656c]"}`}>
                {lesson.exclusive ? "for one person" : "per person"}
              </p>
              <ul className={`mt-6 space-y-2 text-sm ${featured ? "text-white/85" : "text-[#4e656c]"}`}>
                <li>{formatDuration(lesson.durationMins)}</li>
                <li>{lesson.exclusive ? "Holds the whole time" : `Up to ${lesson.maxGroupSize}`}</li>
              </ul>
              <div className="mt-8">
                <BookPill href={`/book?lesson=${lesson.slug}`} onDark={featured} />
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {lessons.map((lesson, index) => (
        <article key={lesson.id} className="flex flex-col rounded-3xl border border-[#d7e4e7] bg-white p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#0d4552] uppercase">{lesson.skillLevel}</p>
              <h2 className="mt-2 text-3xl">{lesson.name}</h2>
            </div>
            {index === 0 ? (
              <span className="shrink-0 rounded-full bg-[#f0c014] px-3 py-1 text-[11px] font-semibold tracking-wide text-[#1c1604] uppercase">
                Start here
              </span>
            ) : null}
          </div>
          <p className="mt-4 text-[#14282e]">{lesson.summary}</p>
          <p className="mt-3 text-sm text-[#4e656c]">{lesson.description}</p>
          <p className="mt-6 text-3xl font-semibold text-[#0d4552]">
            {formatMoney(lesson.priceCents, lesson.currency)}
            <span className="mt-1 block text-sm font-normal text-[#4e656c]">
              {formatDuration(lesson.durationMins)} · {lesson.exclusive ? "holds the whole time" : `up to ${lesson.maxGroupSize}`}
            </span>
          </p>
          <ul className="mt-6 border-t border-[#d7e4e7]">
            {lesson.includes.map((item) => (
              <li key={item} className="border-b border-[#d7e4e7] py-3 text-sm text-[#14282e]">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <BookPill href={`/book?lesson=${lesson.slug}`} />
          </div>
        </article>
      ))}
    </div>
  );
}
