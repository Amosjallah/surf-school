import Link from "next/link";

export function ClubLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-white" aria-label="Surfing Club, home">
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M8 23c3.2-5.2 6-5.2 8.8 0s5.6 5.2 8.8 0 5.2-5.2 6.4 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M9 28c2.4-3.4 4.4-3.4 6.6 0s4.2 3.4 6.6 0 4-3.4 5.2 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="leading-none">
        <span className="block text-[15px] font-extrabold tracking-[0.16em]">SURFING</span>
        <span className="mt-1 block text-[10px] font-semibold tracking-[0.34em]">CLUB</span>
      </span>
    </Link>
  );
}
