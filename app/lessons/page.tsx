import Link from "next/link";
import { PageBand } from "@/components/club/page-band";
import { LessonList } from "@/components/lesson-list";
import { getActiveLessons } from "@/lib/lessons";
import { pageMeta } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMeta(
  "Lessons",
  "First Wave, Improver, Private, and Kids surf lessons at Muizenberg. Duration, group size, what’s included, and the price.",
);

export default async function LessonsPage() {
  const lessons = await getActiveLessons();

  return (
    <main id="content" className="page-shell">
      <PageBand
        eyebrow="Lessons"
        title="Four ways into the water."
        lede="Every group price is per person. A private lesson is priced once and holds the whole time, so a group is not added next to you."
      />
      <section className="mx-auto w-full max-w-[1120px] px-5 py-14 md:px-8 md:py-20">
        <LessonList lessons={lessons} layout="lessons" />
        <p className="mt-10 text-sm text-[#4e656c]">
          Want the numbers on their own?{" "}
          <Link href="/pricing" className="font-semibold text-[#0d4552] underline underline-offset-4">
            See pricing
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
