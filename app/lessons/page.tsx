import { LessonList } from "@/components/lesson-list";
import { Dek, SectionTitle, Wrap } from "@/components/section";
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
    <main id="content" className="py-12 md:py-16">
      <Wrap>
        <SectionTitle as="h1">Lessons</SectionTitle>
        <Dek>
          Every price is per person. A private lesson is priced once and holds the whole time, so a group is not added next to you.
        </Dek>
        <div className="mt-10">
          <LessonList lessons={lessons} detailed />
        </div>
      </Wrap>
    </main>
  );
}
