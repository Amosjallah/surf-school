import Link from "next/link";
import { PageBand } from "@/components/club/page-band";
import { LessonList } from "@/components/lesson-list";
import { getActiveLessons } from "@/lib/lessons";
import { pageMeta } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMeta(
  "Pricing",
  "Lesson prices at Saltline Surf School, Muizenberg. First Wave, Improver, Private, and Kids, in rand.",
);

export default async function PricingPage() {
  const lessons = await getActiveLessons();

  return (
    <main id="content" className="page-shell">
      <PageBand
        eyebrow="Pricing"
        title="Clear prices. No extras on the sand."
        lede="Boards, leashes, and wetsuits are in the price. You bring a swimsuit, a towel, and sunscreen for your face."
      />
      <section className="mx-auto w-full max-w-[1120px] px-5 py-14 md:px-8 md:py-20">
        <LessonList lessons={lessons} layout="pricing" />
        <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-[#f4f8f9] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[52ch] text-sm leading-relaxed text-[#4e656c]">
            Group lessons are priced per person. A private lesson is priced once and holds that whole time. Sending a request holds the spots. Payment is arranged on WhatsApp or when you arrive.
          </p>
          <Link
            href="/book"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#f0c014] px-5 text-sm font-semibold text-[#1c1604] hover:bg-[#ffd84a]"
          >
            Book a lesson
          </Link>
        </div>
      </section>
    </main>
  );
}
