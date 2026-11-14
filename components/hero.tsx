import { ButtonLink } from "@/components/button";
import { MediaFrame } from "@/components/media-frame";
import { WaveEdge } from "@/components/wave-edge";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-deep text-deep-text">
      <MediaFrame
        aspect="hero"
        priority
        labelAt="start"
        label="Learners in the whitewater, Muizenberg beach break"
        alt="Placeholder for a wide photo of learners and a coach in the whitewater at Muizenberg"
      />
      <div className="hero-scrim absolute inset-0 z-[1]" aria-hidden="true" />
      <div className="relative z-[3] mx-auto w-full max-w-[1120px] px-5 pb-28 pt-16 md:px-8 md:pb-32">
        <h1 className="max-w-[11ch] text-[clamp(3.4rem,9vw,7.25rem)]">
          <span className="hero-line">
            <span>Stand up</span>
          </span>
          <span className="hero-line">
            <span>on your</span>
          </span>
          <span className="hero-line">
            <span>first wave.</span>
          </span>
        </h1>
        <p className="mt-6 max-w-[38ch] text-lg leading-snug text-deep-soft md:text-xl">
          Muizenberg’s beach break is gentle enough for a first lesson. Two hours, a small group, and a coach in the water with you.
        </p>
        <div className="mt-8">
          <ButtonLink href="/book?lesson=first-wave">Book a lesson</ButtonLink>
        </div>
        <p className="mt-5 text-sm text-deep-soft">Boards and wetsuits included · Surfers Corner</p>
      </div>
      <WaveEdge />
    </section>
  );
}
