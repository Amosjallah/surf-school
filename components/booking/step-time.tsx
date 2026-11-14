import { addMinutes } from "@/lib/time";
import type { DayView, LessonView, SlotView } from "@/lib/types";
import { cx } from "@/lib/cx";

export function slotBlockReason(slot: SlotView, lesson: LessonView, blockedReason: string | null) {
  if (blockedReason) return blockedReason;
  if (slot.past) return "Started";
  if (slot.closed) return "Closed";
  if (slot.remaining <= 0) return "Full";
  if (lesson.exclusive && slot.remaining < slot.capacity) return "Has a group";
  return null;
}

export function StepTime({
  days,
  date,
  lesson,
  slotId,
  groupSize,
  onDate,
  onSlot,
  onGroup,
}: {
  days: DayView[];
  date: string;
  lesson: LessonView;
  slotId: string;
  groupSize: number;
  onDate: (date: string) => void;
  onSlot: (id: string) => void;
  onGroup: (size: number) => void;
}) {
  const day = days.find((item) => item.date === date) ?? days[0];
  const selected = day?.slots.find((slot) => slot.id === slotId);
  const reason = selected ? slotBlockReason(selected, lesson, day?.blockedReason ?? null) : "Choose a time";
  const maxPeople = lesson.exclusive
    ? 1
    : selected && !reason
      ? Math.min(lesson.maxGroupSize, selected.remaining)
      : 1;

  return (
    <div>
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2" role="group" aria-label="Dates">
        {days.map((item) => {
          const selectedDay = item.date === day?.date;
          return (
            <button
              key={item.date}
              type="button"
              aria-pressed={selectedDay}
              onClick={() => onDate(item.date)}
              className={cx(
                "min-h-[4.5rem] min-w-[5.75rem] shrink-0 px-3 text-left",
                selectedDay ? "bg-deep text-deep-text" : "border border-line",
              )}
            >
              <span className="block text-sm">{item.label}</span>
              {item.blockedReason ? <span className="block text-xs opacity-80">Paused</span> : null}
            </button>
          );
        })}
      </div>

      {day?.blockedReason ? (
        <p className="mt-6 border border-line bg-raised px-4 py-3" role="status">
          Lessons are paused: {day.blockedReason}
        </p>
      ) : (
        <div className="mt-6 grid gap-2 sm:grid-cols-2" role="group" aria-label="Times">
          {day?.slots.map((slot) => {
            const block = slotBlockReason(slot, lesson, null);
            const selectedSlot = slot.id === slotId;
            const spots =
              block ??
              (lesson.exclusive
                ? "Holds the whole time"
                : `${slot.remaining} ${slot.remaining === 1 ? "spot" : "spots"} left`);
            return (
              <button
                key={slot.id}
                type="button"
                aria-pressed={selectedSlot}
                aria-disabled={block ? true : undefined}
                onClick={() => {
                  if (!block) onSlot(slot.id);
                }}
                className={cx(
                  "min-h-[4.5rem] border px-3 py-2 text-left",
                  selectedSlot ? "border-deep bg-deep text-deep-text" : "border-line",
                  block && "text-soft",
                )}
              >
                <span className="block font-display text-2xl">
                  {slot.startTime}–{addMinutes(slot.startTime, lesson.durationMins)}
                </span>
                <span className="block text-sm">{spots}</span>
              </button>
            );
          })}
          {day && day.slots.length === 0 ? <p>No times on this day yet.</p> : null}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-4">
        <div>
          <p id="group-size-label" className="font-medium">
            People
          </p>
          <p className="text-sm text-soft">
            {lesson.exclusive
              ? "A private lesson is one person."
              : !selected || reason
                ? "Choose a time, then how many people."
                : `Up to ${maxPeople} at this time.`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="min-h-11 min-w-11 border border-stroke text-xl"
            aria-label="Fewer people"
            disabled={lesson.exclusive || groupSize <= 1}
            onClick={() => onGroup(groupSize - 1)}
          >
            −
          </button>
          <span className="min-w-8 text-center font-display text-3xl" aria-live="polite" aria-labelledby="group-size-label">
            {lesson.exclusive ? 1 : groupSize}
          </span>
          <button
            type="button"
            className="min-h-11 min-w-11 border border-stroke text-xl"
            aria-label="More people"
            disabled={lesson.exclusive || groupSize >= maxPeople}
            onClick={() => onGroup(groupSize + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
