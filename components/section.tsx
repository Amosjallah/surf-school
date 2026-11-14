import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export function Wrap({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-[1120px] px-5 md:px-8", className)}>{children}</div>;
}

export function SectionTitle({
  children,
  id,
  as = "h2",
}: {
  children: ReactNode;
  id?: string;
  as?: "h1" | "h2";
}) {
  const Tag = as;
  return (
    <Tag id={id} className="text-[clamp(2rem,4vw,3.25rem)]">
      {children}
    </Tag>
  );
}

export function Dek({ children }: { children: ReactNode }) {
  return <p className="measure mt-4 text-soft">{children}</p>;
}
