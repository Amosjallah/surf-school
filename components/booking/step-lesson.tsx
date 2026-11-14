import { formatDuration, formatMoney } from "@/lib/format";
import type { LessonView } from "@/lib/types";
import { cx } from "@/lib/cx";

export function StepLesson({
  lessons,
  lessonId,
  onSelect,
}: {
  lessons: LessonView[];
  lessonId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Choose a lesson</legend>
      <div>
        {lessons.map((lesson) => {
          const selected = lesson.id === lessonId;
          return (
            <label
              key={lesson.id}
              className={cx(
                "block cursor-pointer border-t border-line py-4 pr-2",
                selected ? "border-l-4 border-l-wax bg-raised pl-4" : "pl-1",
              )}
            >
              <input
                className="sr-only"
                type="radio"
                name="lesson"
                value={lesson.id}
                checked={selected}
                onChange={() => onSelect(lesson.id)}
              />
              <span className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="font-display text-3xl">{lesson.name}</span>
                <span className="font-display text-2xl">
                  {formatMoney(lesson.priceCents, lesson.currency)}
                  <span className="ml-2 font-sans text-sm font-normal text-soft">
                    {lesson.exclusive ? "for one person" : "per person"}
                  </span>
                </span>
              </span>
              <span className="mt-2 block max-w-[62ch]">{lesson.summary}</span>
              <span className="mt-2 block text-sm text-soft">
                {formatDuration(lesson.durationMins)} · up to {lesson.maxGroupSize} · {lesson.skillLevel}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
