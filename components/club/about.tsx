import Image from "next/image";
import Link from "next/link";
import { IconPlay } from "@/components/club/icons";

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
    <section id="about" className="overflow-hidden bg-[#f6fbfb] py-16 text-[#14282e] md:py-24">
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[560px] pb-16 lg:mx-0 lg:max-w-none lg:pb-20">
          <div className="relative h-[420px] overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(13,69,82,0.18)] sm:h-[520px]">
            <Image
              src="/surf/hero-2.jpg"
              alt="A yellow longboard standing on the sand, facing the surf"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-[center_40%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#063640]/55 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-0 left-4 h-32 w-[46%] overflow-hidden rounded-2xl border-4 border-[#f6fbfb] shadow-xl sm:left-6 sm:h-40">
            <Image
              src="/surf/about-sand.jpg"
              alt="A rider standing on an orange surfboard in whitewater"
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
          <div className="absolute right-3 bottom-6 h-28 w-[38%] overflow-hidden rounded-2xl border-4 border-[#f6fbfb] shadow-xl sm:right-0 sm:h-36 sm:w-[42%]">
            <Image
              src="/surf/px-ride.jpg"
              alt="A surfer dropping into a wave at sunset"
              fill
              sizes="220px"
              className="object-cover object-[center_40%]"
            />
          </div>
          <Link
            href="/about"
            aria-label="Read about the school"
            className="absolute top-1/2 left-1/2 z-10 grid size-16 -translate-x-1/2 -translate-y-[70%] place-items-center rounded-full bg-[#f0c014] text-[#1c1604] shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:bg-[#ffd84a]"
          >
            <IconPlay className="ml-1 size-6" />
          </Link>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#0d4552] uppercase">Muizenberg</p>
          <h2 className="about-display mt-3 max-w-[8ch]">About us</h2>
          <p className="mt-5 max-w-[38ch] text-base leading-relaxed text-[#5a7076]">
            Small-group lessons on the beach break. The board, the wetsuit, and the coach are already waiting.
          </p>
          <ul className="mt-8 space-y-4">
            {points.map((point, index) => (
              <li key={point.title} className="flex gap-4 rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(13,69,82,0.06)]">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#0d4552] text-sm font-semibold text-[#f0c014]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="step-title">{point.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#5a7076]">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-[#f0c014] px-6 text-sm font-semibold text-[#1c1604] hover:bg-[#ffd84a]"
          >
            Read more
          </Link>
        </div>
      </div>
    </section>
  );
}
