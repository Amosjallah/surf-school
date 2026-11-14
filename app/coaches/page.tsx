import Image from "next/image";
import Link from "next/link";
import { PageBand } from "@/components/club/page-band";
import { coaches } from "@/lib/content";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Coaches",
  "Meet the Saltline coaches at Muizenberg: beginners, improvers, and kids and families.",
);

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => /[A-Za-zÀ-ÿ]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function CoachesPage() {
  return (
    <main id="content" className="page-shell">
      <PageBand
        eyebrow="Coaches"
        title="Three coaches. One beach."
        lede={`Lessons at ${site.beach} stay small. The coach who meets you on the sand is the coach in the water with you.`}
      />

      <section className="mx-auto w-full max-w-[1120px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {coaches.map((coach) => (
            <article key={coach.name} className="flex flex-col rounded-3xl border border-[#d7e4e7] bg-white p-6">
              <p
                className="grid size-16 place-items-center rounded-full bg-[#0d4552] text-lg font-semibold text-white"
                aria-hidden="true"
              >
                {initials(coach.name)}
              </p>
              <p className="mt-6 text-[11px] font-semibold tracking-[0.18em] text-[#0d4552] uppercase">{coach.role}</p>
              <h2 className="mt-2 text-3xl">{coach.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#4e656c]">{coach.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] items-center gap-8 px-5 pb-16 md:px-8 md:pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-[clamp(2rem,4vw,3rem)]">Meet on the sand.</h2>
          <p className="mt-4 text-[#4e656c]">
            {site.meetingPoint}, {site.town}. Desk hours are {site.hours[0].value.toLowerCase()}.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-[#f0c014] px-5 text-sm font-semibold text-[#1c1604] hover:bg-[#ffd84a]"
          >
            Book a lesson
          </Link>
        </div>
        <div className="relative min-h-[240px] overflow-hidden rounded-3xl sm:min-h-[320px]">
          <Image
            src="/surf/px-ride.jpg"
            alt="A surfer riding a small wave at sunset"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-[center_40%]"
          />
        </div>
      </section>
    </main>
  );
}
