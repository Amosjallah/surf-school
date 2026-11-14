"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconArrow, IconFacebook, IconInstagram, IconX } from "@/components/club/icons";
import { cx } from "@/lib/cx";
import { instagramUrl } from "@/lib/site";

const slides = [
  {
    src: "/surf/hero-1.jpg",
    alt: "A surfer crouched inside a turquoise barrel",
  },
  {
    src: "/surf/px-barrel.jpg",
    alt: "A surfer riding along the face of a large turquoise wave",
  },
  {
    src: "/surf/px-surfer2.jpg",
    alt: "A surfer turning on a wave at sunset",
  },
  {
    src: "/surf/s1.jpg",
    alt: "A surfer launching off the lip of a wave",
  },
] as const;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function ClubHero() {
  const [index, setIndex] = useState(0);
  const instagram = instagramUrl();
  const socials = [
    { label: "Facebook", href: "/contact", icon: IconFacebook },
    { label: "X", href: "/contact", icon: IconX },
    { label: "Instagram", href: instagram ?? "/contact", icon: IconInstagram },
  ];

  function show(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <section className="relative min-h-[560px] overflow-hidden bg-[#06343c] text-white md:min-h-[640px] lg:h-[min(78vh,740px)]" aria-roledescription="carousel" aria-label="Surf slides">
      {slides.map((slide, slideIndex) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slideIndex === index ? slide.alt : ""}
          fill
          priority={slideIndex === 0}
          sizes="100vw"
          className={cx(
            "object-cover object-[center_40%] transition-opacity duration-700",
            slideIndex === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

      <ul className="absolute top-1/2 left-5 z-10 hidden -translate-y-1/2 flex-col gap-4 xl:flex">
        {socials.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              aria-label={item.label}
              className="grid size-9 place-items-center text-white/90 hover:text-white"
              {...(item.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <item.icon className="size-[18px]" />
            </a>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mx-auto flex h-full min-h-[560px] w-full max-w-[1120px] items-center px-5 md:min-h-[640px] md:px-8 lg:min-h-[inherit]">
        <div className="max-w-xl pt-16">
          <h1 className="text-[clamp(3.15rem,6.5vw,5.5rem)]">
            Let’s Ride
            <br />
            A Wave
          </h1>
          <p className="mt-4 text-lg font-medium text-white/90">Best beaches on the Coast</p>
          <div className="mt-7 flex items-center gap-3">
            <Link
              href="/book"
              className="inline-flex h-11 items-center border border-white px-5 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-white hover:text-[#0c3d48]"
            >
              Get started
            </Link>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-white hover:bg-white hover:text-[#0c3d48]"
              aria-label="Next slide"
              onClick={() => show(index + 1)}
            >
              <IconArrow className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute right-5 bottom-6 z-10 flex items-center gap-3 md:right-10 md:bottom-8 md:gap-5">
        <p className="text-4xl font-light tracking-wide text-white/90 md:text-6xl" aria-live="polite">
          {pad(index + 1)}
        </p>
        <div className="flex gap-2">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show slide ${slideIndex + 1}`}
              aria-current={slideIndex === index ? "true" : undefined}
              onClick={() => show(slideIndex)}
              className={cx(
                "relative h-11 w-14 overflow-hidden border-2 md:h-14 md:w-[4.5rem]",
                slideIndex === index ? "border-white" : "border-transparent opacity-75",
              )}
            >
              <Image src={slide.src} alt="" fill sizes="72px" className="object-cover" />
            </button>
          ))}
        </div>
        <p className="text-4xl font-light tracking-wide text-white/55 md:text-6xl">{pad(slides.length)}</p>
      </div>
    </section>
  );
}
