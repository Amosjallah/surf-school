import Image from "next/image";

const side = [
  {
    src: "/surf/about-sand.jpg",
    alt: "Bare feet standing on an orange surfboard on the sand",
  },
  {
    src: "/surf/px-ride.jpg",
    alt: "A surfer riding a small wave at sunset",
  },
  {
    src: "/surf/px-boards.jpg",
    alt: "A surfer holding a wooden board under one arm",
  },
  {
    src: "/surf/s1.jpg",
    alt: "A surfer carving the lip of a turquoise wave",
  },
] as const;

export function ClubGallery() {
  return (
    <section id="beach" className="bg-white py-16 text-[#14282e] md:py-24" aria-labelledby="beach-heading">
      <div className="mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <h2 id="beach-heading" className="club-title text-[clamp(1.8rem,3vw,2.6rem)]">
          On the sand
        </h2>
        <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-[#5a7076]">
          Boards, whitewater, and the walk back up the beach at the end of the lesson.
        </p>
        <div className="mt-10 grid gap-3 lg:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl sm:min-h-[460px]">
            <Image
              src="/surf/hero-2.jpg"
              alt="A yellow longboard standing on the sand, facing the surf"
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {side.map((frame) => (
              <div key={frame.src} className="relative min-h-[140px] overflow-hidden rounded-2xl sm:min-h-[224px]">
                <Image src={frame.src} alt={frame.alt} fill sizes="(min-width: 1024px) 260px, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
