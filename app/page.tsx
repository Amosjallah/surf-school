import { Coaches } from "@/components/coaches";
import { Faq } from "@/components/faq";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { LessonList } from "@/components/lesson-list";
import { LocationBlock } from "@/components/location-block";
import { Dek, SectionTitle, Wrap } from "@/components/section";
import { Testimonials } from "@/components/testimonials";
import { getActiveLessons } from "@/lib/lessons";
import { pageMeta } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMeta(
  "Saltline Surf School in Muizenberg",
  "Beginner surf lessons at Surfers Corner, Muizenberg. Small groups, boards and wetsuits included. Book a time in a few steps.",
  true,
);

export default async function HomePage() {
  const lessons = await getActiveLessons();

  return (
    <main id="content">
      <Hero />
      <section className="py-16 md:py-24" aria-labelledby="lessons-heading">
        <Wrap>
          <SectionTitle id="lessons-heading">Lessons</SectionTitle>
          <Dek>Prices are per person, in rand. Book one spot, or a few if you came with people.</Dek>
          <div className="mt-8">
            <LessonList lessons={lessons} detailed={false} />
          </div>
        </Wrap>
      </section>
      <HowItWorks />
      <Coaches />
      <Gallery />
      <Testimonials />
      <Faq />
      <LocationBlock />
    </main>
  );
}
