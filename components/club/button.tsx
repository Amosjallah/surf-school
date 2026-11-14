import Link from "next/link";
import { cx } from "@/lib/cx";

export function ClubButton({
  href,
  children,
  tone = "dark",
}: {
  href: string;
  children: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex h-11 items-center justify-center border px-5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
        tone === "light"
          ? "border-white text-white hover:bg-white hover:text-[#0c3d48]"
          : "border-[#0c3d48] text-[#0c3d48] hover:bg-[#0c3d48] hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}
