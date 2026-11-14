"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconArrow, IconChevron } from "@/components/club/icons";
import { cx } from "@/lib/cx";

const slides = [
  {
    src: "/surf/px-surfer2.jpg",
    alt: "A surfer in a dark wetsuit riding the face of a wave at sunset",
    position: "object-[58%_62%]",
  },
  {
    src: "/surf/hero-1.jpg",
    alt: "A surfer crouched inside a turquoise barrel",
    position: "object-center",
  },
  {
    src: "/surf/px-barrel.jpg",
    alt: "A surfer riding along a large turquoise wave",
    position: "object-[28%_center]",
  },
] as const;

export function ClubHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  function show(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#102f36] text-white" aria-roledescription="carousel" aria-label="Surf lessons">
      {slides.map((slide, slideIndex) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slideIndex === index ? slide.alt : ""}
          fill
          priority={slideIndex === 0}
          sizes="100vw"
          className={cx(
            "object-cover transition-opacity duration-700",
            slide.position,
            slideIndex === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/15" />

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => show(index - 1)}
        className="absolute top-1/2 left-3 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-black/20 text-white hover:bg-white hover:text-[#102f36] md:grid"
      >
        <IconChevron direction="left" className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => show(index + 1)}
        className="absolute top-1/2 right-3 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-black/20 text-white hover:bg-white hover:text-[#102f36] md:grid"
      >
        <IconChevron className="size-5" />
      </button>

      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 pt-28 pb-16 md:px-8 md:pb-20">
        <h1 className="hero-title max-w-[11ch] text-[clamp(2.85rem,5.2vw,4.6rem)]">
          Your first wave
          <br />
          starts here.
        </h1>
        <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-white/90 md:text-base">
          Small-group surf lessons at Muizenberg, planned every morning around the tide, the swell and the wind.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/book"
            className="inline-flex h-11 items-center rounded-full bg-[#f0c014] px-5 text-sm font-semibold text-[#1c1604] hover:bg-[#ffd84a]"
          >
            Book a lesson
          </Link>
          <Link
            href="/book"
            className="inline-flex h-11 items-center gap-3 rounded-full border border-white/80 pr-1.5 pl-5 text-sm font-medium text-white hover:bg-white/10"
          >
            See the week
            <span className="grid size-8 place-items-center rounded-full border border-white/80">
              <IconArrow className="size-3.5" />
            </span>
          </Link>
        </div>
        <div className="mt-8 flex items-center gap-3" aria-label="Slides">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show slide ${slideIndex + 1}`}
              aria-current={slideIndex === index ? "true" : undefined}
              onClick={() => show(slideIndex)}
              className={cx(
                "h-1.5 rounded-full transition-all",
                slideIndex === index ? "w-9 bg-[#f0c014]" : "w-4 bg-white/55 hover:bg-white",
              )}
            />
          ))}
          <p className="ml-2 text-sm tracking-[0.2em] text-white/80" aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
