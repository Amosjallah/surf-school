"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { buttonClasses } from "@/components/button";
import { cx } from "@/lib/cx";

const links = [
  { href: "/lessons", label: "Lessons" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const themeEvent = "saltline-theme";

function subscribeToTheme(onChange: () => void) {
  window.addEventListener(themeEvent, onChange);
  return () => window.removeEventListener(themeEvent, onChange);
}

function themeSnapshot() {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const theme = useSyncExternalStore(subscribeToTheme, themeSnapshot, () => null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleTheme() {
    const next = themeSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("saltline-theme", next);
    window.dispatchEvent(new Event(themeEvent));
  }

  const themeLabel = theme === "dark" ? "Light" : theme === "light" ? "Dark" : "Theme";

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center gap-3 px-5 md:px-8">
        <Link href="/" className="mr-auto flex items-baseline gap-2" aria-label="Saltline, home">
          <span className="font-display text-2xl tracking-tight">Saltline</span>
          <span className="hidden text-sm text-soft sm:inline">Muizenberg</span>
        </Link>
        <nav className="hidden items-center gap-5 md:flex" aria-label="Pages">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cx("text-base", pathname === link.href && "underline underline-offset-4")}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="min-h-11 px-2 text-base md:ml-2"
          aria-label={
            theme === "dark" ? "Switch to light mode" : theme === "light" ? "Switch to dark mode" : "Switch colour mode"
          }
          onClick={toggleTheme}
        >
          {themeLabel}
        </button>
        <button
          type="button"
          className="min-h-11 px-2 text-base md:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setMenuPath(open ? null : pathname)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <Link href="/book" className={buttonClasses("primary")}>
          <span className="md:hidden">Book</span>
          <span className="hidden md:inline">Book a lesson</span>
        </Link>
      </div>
      <nav id="site-menu" aria-label="Pages" hidden={!open} className="border-t border-line px-5 py-2 md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
            className="flex min-h-11 items-center text-lg"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
