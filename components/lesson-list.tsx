import { ButtonLink } from "@/components/button";
import { formatDuration, formatMoney } from "@/lib/format";
import type { LessonView } from "@/lib/types";

function LessonRow({
  lesson,
  detailed,
  featured,
}: {
  lesson: LessonView;
  detailed: boolean;
  featured: boolean;
}) {
  const Title = detailed ? "h2" : "h3";
  return (
    <article className="border-t border-line py-8 first:border-t-0 md:py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[62ch]">
          <Title className={featured ? "text-[clamp(2.2rem,4vw,3.5rem)]" : "text-3xl"}>{lesson.name}</Title>
          <p className="measure mt-3">{lesson.summary}</p>
          <p className="mt-3 text-sm text-soft">
            {formatDuration(lesson.durationMins)} · up to {lesson.maxGroupSize} · {lesson.skillLevel}
            {lesson.exclusive ? " · holds the whole time" : ""}
          </p>
        </div>
        <p className="font-display text-5xl leading-none md:text-right">
          {formatMoney(lesson.priceCents, lesson.currency)}
          <span className="mt-2 block font-sans text-sm font-normal text-soft">
            {lesson.exclusive ? "for one person" : "per person"}
          </span>
        </p>
      </div>
      {detailed ? (
        <>
          <p className="measure mt-6">{lesson.description}</p>
          <ul className="mt-6 max-w-[62ch]">
            {lesson.includes.map((item) => (
              <li key={item} className="border-t border-line py-2">
                {item}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <div className="mt-6">
        <ButtonLink href={`/book?lesson=${lesson.slug}`} variant={featured && detailed ? "primary" : "quiet"}>
          Book this lesson
        </ButtonLink>
      </div>
    </article>
  );
}

export function LessonList({ lessons, detailed }: { lessons: LessonView[]; detailed: boolean }) {
  if (lessons.length === 0) {
    return <p>No lessons are in the schedule yet.</p>;
  }

  return (
    <div>
      {lessons.map((lesson, index) => (
        <LessonRow key={lesson.id} lesson={lesson} detailed={detailed} featured={index === 0} />
      ))}
    </div>
  );
}
