import { ClubButton } from "@/components/club/button";

function Board({
  id,
  wide = false,
  tall = false,
  orange = false,
  rail = false,
}: {
  id: string;
  wide?: boolean;
  tall?: boolean;
  orange?: boolean;
  rail?: boolean;
}) {
  const width = wide ? 92 : 52;
  const fill = orange ? "#f26a32" : "#f7f8f8";
  const edge = orange ? "#c2410c" : "#d5dee2";
  return (
    <svg
      viewBox={`0 0 ${width} 210`}
      className={tall ? "h-64 w-14" : wide ? "h-52 w-[4.6rem]" : "h-56 w-12"}
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 18px 16px rgba(0,0,0,0.28))" }}
    >
      <defs>
        <linearGradient id={`${id}-face`} x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor={fill} />
          <stop offset="100%" stopColor={edge} />
        </linearGradient>
      </defs>
      <path
        d={
          wide
            ? "M46 6c18 2 28 20 30 48 3 46 1 96-6 132-4 18-12 22-24 22s-20-4-24-22c-7-36-9-86-6-132C18 26 28 8 46 6z"
            : "M26 4c10 1 16 12 17 32 2 36 3 92-2 142-2 16-7 22-15 22s-13-6-15-22c-5-50-4-106-2-142C10 16 16 5 26 4z"
        }
        fill={`url(#${id}-face)`}
      />
      <path d={wide ? "M46 28v150" : "M26 24v154"} stroke="rgba(12,61,72,0.2)" strokeWidth="1.1" />
      {rail ? <path d="M14 70c1 34 2 70 6 108" stroke="#1d6d86" strokeWidth="3.5" fill="none" strokeLinecap="round" /> : null}
      {orange ? <path d="M46 118l12 18-12 18-12-18z" fill="#d7dedf" /> : null}
      <circle cx={wide ? 46 : 26} cy="78" r="1.8" fill="#16343b" opacity="0.45" />
    </svg>
  );
}

const groups = [
  {
    number: "01",
    name: "Vesl profile islands",
    boards: (
      <>
        <Board id="short-blue" rail />
        <Board id="short-white" />
      </>
    ),
  },
  {
    number: "02",
    name: "Paddle board",
    boards: (
      <>
        <Board id="long" tall />
        <Board id="paddle" />
      </>
    ),
  },
  {
    number: "03",
    name: "Standup paddle",
    boards: (
      <>
        <Board id="sup-white" wide />
        <Board id="sup-orange" wide orange />
      </>
    ),
  },
];

export function ClubBoards() {
  return (
    <section id="surfboards" className="relative overflow-hidden bg-[#0d4552] py-16 text-white md:py-24" aria-labelledby="boards-heading">
      <p aria-hidden="true" className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 text-[clamp(3.5rem,10vw,7.5rem)] leading-none font-extrabold tracking-tight whitespace-nowrap text-white/[0.08] uppercase">
        Surfboards
      </p>
      <div className="relative mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <h2 id="boards-heading" className="club-title text-center text-[clamp(1.8rem,3vw,2.6rem)]">
          Surfboards
        </h2>
        <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
          {groups.map((group) => (
            <article key={group.number} className="text-center">
              <p className="text-3xl font-light tracking-[0.2em] text-white/75">{group.number}</p>
              <div className="mt-8 flex h-64 items-end justify-center gap-5">{group.boards}</div>
              <h3 className="mt-8 text-[11px] font-semibold tracking-[0.22em] text-white/80 uppercase">{group.name}</h3>
            </article>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <ClubButton href="/lessons" tone="light">
            Show all
          </ClubButton>
        </div>
      </div>
    </section>
  );
}
