import { ClubButton } from "@/components/club/button";

function Board({
  id,
  wide = false,
  tall = false,
  fill = "#f4f7f7",
  rail,
  pad,
}: {
  id: string;
  wide?: boolean;
  tall?: boolean;
  fill?: string;
  rail?: string;
  pad?: boolean;
}) {
  const width = wide ? 108 : 64;
  return (
    <svg
      viewBox={`0 0 ${width} 220`}
      className={tall ? "h-60 w-16" : wide ? "h-52 w-24" : "h-56 w-14"}
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 16px 14px rgba(0,0,0,0.28))" }}
    >
      <defs>
        <linearGradient id={`${id}-face`} x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="48%" stopColor={fill} />
          <stop offset="100%" stopColor={wide && fill !== "#f4f7f7" ? "#c2410c" : "#d5e0e3"} />
        </linearGradient>
      </defs>
      <path
        d={
          wide
            ? "M54 8c24 0 38 18 40 52 4 52 2 102-8 140-5 18-16 22-32 22s-27-4-32-22c-10-38-12-88-8-140C16 26 30 8 54 8z"
            : "M32 6c13 0 19 14 21 38 3 42 4 102-3 150-3 20-9 26-18 26s-15-6-18-26c-7-48-6-108-3-150C13 20 19 6 32 6z"
        }
        fill={`url(#${id}-face)`}
      />
      <path
        d={wide ? "M54 22v168" : "M32 20v166"}
        stroke="rgba(12,61,72,0.18)"
        strokeWidth="1.2"
      />
      {rail ? (
        <path d="M18 78c1 36 3 74 8 112" stroke={rail} strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : null}
      {pad ? <path d="M54 118l16 26-16 26-16-26z" fill="#c5cdce" /> : null}
      <circle cx={wide ? 54 : 32} cy={wide ? 78 : 86} r="2.2" fill="#16343b" opacity="0.55" />
    </svg>
  );
}

const groups = [
  {
    number: "01",
    name: "Vesl profile islands",
    boards: (
      <>
        <Board id="short-blue" rail="#1d6d86" />
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
        <Board id="sup-orange" wide fill="#f26a32" pad />
      </>
    ),
  },
] as const;

export function ClubBoards() {
  return (
    <section id="surfboards" className="relative overflow-hidden bg-[#0c3d48] py-16 text-white md:py-24" aria-labelledby="boards-heading">
      <p aria-hidden="true" className="club-watermark -top-4 right-0 text-white/10">
        Surfboards
      </p>
      <div className="relative mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <h2 id="boards-heading" className="club-title text-[clamp(1.8rem,3vw,2.6rem)]">
          Surfboards
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-6">
          {groups.map((group) => (
            <article key={group.number} className="text-center">
              <p className="text-4xl font-light tracking-wide text-white/80">{group.number}</p>
              <div className="mt-6 flex items-end justify-center gap-4">{group.boards}</div>
              <h3 className="mt-8 text-[11px] font-semibold tracking-[0.2em] text-white/85 uppercase">{group.name}</h3>
            </article>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <ClubButton href="/lessons" tone="light">
            Show all
          </ClubButton>
        </div>
      </div>
    </section>
  );
}
