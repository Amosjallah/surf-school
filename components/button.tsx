import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";

export function buttonClasses(variant: "primary" | "quiet" | "desk" = "primary") {
  const base =
    "inline-flex min-h-11 items-center justify-center px-4 text-base font-medium transition-[transform,background-color] duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50";
  if (variant === "primary") {
    return cx(base, "is-primary bg-wax text-wax-ink hover:bg-wax-hover");
  }
  if (variant === "desk") {
    return cx(base, "border border-stroke bg-bg text-text hover:bg-raised");
  }
  return cx(base, "underline decoration-1 underline-offset-4");
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "quiet" | "desk" }) {
  return <button className={cx(buttonClasses(variant), className)} {...props} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: "primary" | "quiet" | "desk";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cx(buttonClasses(variant), className)}>
      {children}
    </Link>
  );
}
