"use client";

import Image from "next/image";
import { useState } from "react";
import { IconChevron } from "@/components/club/icons";
import { cx } from "@/lib/cx";

const spots = [
  {
    name: "Maldives",
    src: "/surf/px-tropical.jpg",
    alt: "Palm trees over a white-sand lagoon",
  },
  {
    name: "Canary Islands",
    src: "/surf/s1.jpg",
    alt: "A surfer carving the lip of a turquoise wave",
  },
  {
    name: "Bali",
    src: "/surf/spot-bali.jpg",
    alt: "A waterside temple in Bali",
  },
] as const;

export function ClubSpots() {
  const [index, setIndex] = useState(0);
  const visible = [0, 1, 2].map((offset) => spots[(index + offset) % spots.length]);

  function shift(direction: number) {
    setIndex((current) => (current + direction + spots.length) % spots.length);
  }

  return (
    <section id="spots" className="relative overflow-hidden py-16 text-white md:py-24" aria-labelledby="spots-heading">
      <Image src="/surf/px-barrel.jpg" alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[#063640]/68" />
      <p aria-hidden="true" className="pointer-events-none absolute top-1/2 left-0 hidden -translate-y-1/2 -rotate-90 text-[11px] font-semibold tracking-[0.55em] text-white/45 xl:block">
        Surfing Club
      </p>
      <p aria-hidden="true" className="pointer-events-none absolute top-4 -left-2 hidden text-[7.5rem] leading-none font-extrabold tracking-tight text-white/[0.07] uppercase xl:block">
        Let’s
      </p>
      <p aria-hidden="true" className="pointer-events-none absolute -right-2 bottom-0 hidden text-[7.5rem] leading-none font-extrabold tracking-tight text-white/[0.07] uppercase xl:block">
        Wave
      </p>

      <div className="relative mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <div className="relative mb-10 text-center md:mb-12">
          <p aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(3.2rem,11vw,8.5rem)] leading-none font-extrabold tracking-tight whitespace-nowrap text-white/10 uppercase">
            Surfing Spots
          </p>
          <h2 id="spots-heading" className="club-title relative text-[clamp(1.8rem,3vw,2.6rem)]">
            Surfing Spots
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {visible.map((spot, spotIndex) => (
            <article key={`${spot.name}-${spotIndex}`} className={cx("relative aspect-[3/4] overflow-hidden", spotIndex > 0 && "hidden md:block")}>
              <Image src={spot.src} alt={spot.alt} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-3 pt-16 pb-5 text-center">
                <p className="text-sm font-semibold tracking-[0.14em] text-white uppercase">{spot.name}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous surfing spot"
        onClick={() => shift(-1)}
        className="absolute top-1/2 left-3 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/80 bg-black/10 text-white hover:bg-white hover:text-[#0c3d48] md:left-6"
      >
        <IconChevron direction="left" className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next surfing spot"
        onClick={() => shift(1)}
        className="absolute top-1/2 right-3 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/80 bg-black/10 text-white hover:bg-white hover:text-[#0c3d48] md:right-6"
      >
        <IconChevron className="size-5" />
      </button>
    </section>
  );
}
