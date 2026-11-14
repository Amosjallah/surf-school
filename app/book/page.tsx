import { BookFlow } from "@/components/booking/book-flow";
import { Wrap } from "@/components/section";
import { getPublicDays } from "@/lib/availability";
import { getActiveLessons } from "@/lib/lessons";
import { pageMeta } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMeta(
  "Book a lesson",
  "Book a surf lesson at Saltline in four steps: lesson, time, your details, then confirm. No payment is taken on this page.",
);

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ lesson?: string | string[] }>;
}) {
  const params = await searchParams;
  const requested = Array.isArray(params.lesson) ? params.lesson[0] : params.lesson;
  const [lessons, days] = await Promise.all([getActiveLessons(), getPublicDays(14)]);

  return (
    <main id="content" className="py-10 md:py-14">
      <Wrap>
        <h1 className="text-[clamp(2.6rem,6vw,4.5rem)]">Book a lesson</h1>
        <p className="measure mt-4 text-soft">
          Four short steps. You get a reference at the end, and we hold the spots.
        </p>
        <BookFlow lessons={lessons} days={days} initialLessonSlug={requested} />
      </Wrap>
    </main>
  );
}
