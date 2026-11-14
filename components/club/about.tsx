import Image from "next/image";
import Link from "next/link";
import { IconPlay } from "@/components/club/icons";
import { ClubButton } from "@/components/club/button";

const points = [
  {
    title: "Equipment",
    body: "We have everything you need for safe surfing and all-weather training.",
  },
  {
    title: "Yacht",
    body: "Activities on a 13 metre yacht with a cockpit and a shower on board.",
  },
  {
    title: "Team",
    body: "Professional surf instructors with experience in riding and teaching various board disciplines.",
  },
] as const;

export function ClubAbout() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-16 text-[#14282e] md:py-24">
      <p aria-hidden="true" className="club-watermark top-0 right-0 text-[#0c3d48]/[0.07] md:-top-4">
        About Us
      </p>
      <div className="relative mx-auto grid w-full max-w-[1120px] items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="club-title text-[clamp(1.8rem,3vw,2.6rem)]">About Us</h2>
          <div className="mt-8 space-y-6">
            {points.map((point) => (
              <div key={point.title}>
                <h3>{point.title}</h3>
                <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-[#5a7076]">{point.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ClubButton href="/about">Read more</ClubButton>
          </div>
        </div>

        <div className="relative">
          <div className="relative h-72 overflow-hidden sm:h-80">
            <Image
              src="/surf/hero-2.jpg"
              alt="A yellow longboard standing on the sand, facing the surf"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
          </div>
          <Link
            href="/about"
            aria-label="Read about the school"
            className="absolute top-72 left-7 z-10 grid size-14 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0c3d48] shadow-lg sm:top-80"
          >
            <IconPlay className="ml-0.5 size-5" />
          </Link>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="relative h-28 overflow-hidden sm:h-36">
              <Image
                src="/surf/about-sand.jpg"
                alt="A rider standing on an orange surfboard in whitewater"
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
            <div className="relative h-28 overflow-hidden sm:h-36">
              <Image
                src="/surf/px-ride.jpg"
                alt="A surfer dropping into a wave at sunset"
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
