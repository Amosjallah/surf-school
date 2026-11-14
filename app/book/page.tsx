import { BookFlow } from "@/components/booking/book-flow";
import { buttonClasses } from "@/components/button";
import { Wrap } from "@/components/section";
import { getPublicDays } from "@/lib/availability";
import { getActiveLessons } from "@/lib/lessons";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";
import { generalWhatsappMessage, whatsappHref } from "@/lib/whatsapp";

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
  const lessons = await getActiveLessons();
  let days;
  try {
    days = await getPublicDays(14);
  } catch (error) {
    console.error("Could not read lesson times from Supabase.", error);
    days = null;
  }

  if (!days) {
    return (
      <main id="content" className="py-10 md:py-14">
        <Wrap>
          <h1 className="text-[clamp(2.6rem,6vw,4.5rem)]">Book a lesson</h1>
          <p className="measure mt-4">
            The schedule is not connected yet, so this page cannot hold a spot. Message us and we will save the time for you.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <a className={buttonClasses("primary")} href={whatsappHref(generalWhatsappMessage())}>
              Message on WhatsApp
            </a>
            <a className="underline underline-offset-4" href={`tel:${site.phoneTel}`}>
              {site.phoneDisplay}
            </a>
          </div>
        </Wrap>
      </main>
    );
  }

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
