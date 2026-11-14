import Image from "next/image";
import { ClubButton } from "@/components/club/button";

export function ClubTraining() {
  return (
    <section id="training" className="relative overflow-hidden bg-white py-16 text-[#14282e] md:py-24" aria-labelledby="training-heading">
      <p aria-hidden="true" className="pointer-events-none absolute top-6 right-4 hidden text-[6.5rem] leading-none font-extrabold tracking-tight text-[#0c3d48]/[0.06] uppercase lg:block">
        Training
      </p>
      <div className="relative mx-auto grid w-full max-w-[1120px] items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 id="training-heading" className="club-title text-[clamp(1.8rem,3vw,2.6rem)]">
            Surf Training
          </h2>
          <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-[#5a7076]">
            By better understanding the various aspects of surfing, you will improve faster and have more fun in the water.
          </p>
          <div className="mt-8">
            <ClubButton href="/lessons">Read more</ClubButton>
          </div>
        </div>
        <div className="relative h-[380px] overflow-hidden rounded-2xl sm:h-[460px]">
          <Image
            src="/surf/px-boards.jpg"
            alt="A surfer holding a wooden board under one arm"
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
