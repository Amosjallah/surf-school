"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { IconClose, IconMenu } from "@/components/club/icons";
import { cx } from "@/lib/cx";

const leftLinks = [
  { href: "/about", label: "Schools" },
  { href: "/lessons", label: "Lessons" },
  { href: "/lessons", label: "Pricing" },
];

const rightLinks = [
  { href: "/about", label: "Coaches" },
  { href: "/contact", label: "Questions" },
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

function NavLink({ href, label, pathname, onClick }: { href: string; label: string; pathname: string; onClick?: () => void }) {
  const current = pathname === href;
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      onClick={onClick}
      className={cx("text-sm font-medium text-white/90 hover:text-white", current && "text-white")}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const home = pathname === "/";
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

  return (
    <header
      className={cx(
        "z-40 text-white",
        home ? "absolute inset-x-0 top-0" : "sticky top-0 bg-[#102f36]",
        open && "bg-[#102f36]",
      )}
    >
      <div className="mx-auto grid h-[72px] w-full max-w-[1180px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8">
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Pages">
          {leftLinks.map((link) => (
            <NavLink key={link.label} {...link} pathname={pathname} />
          ))}
        </nav>
        <button
          type="button"
          className="grid size-11 place-items-center justify-self-start lg:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setMenuPath(open ? null : pathname)}
        >
          {open ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
        </button>
        <Link href="/" className="text-[13px] font-semibold tracking-[0.42em] text-white" aria-label="Saltline, home">
          SALTLINE
        </Link>
        <div className="flex items-center justify-end gap-7">
          <nav className="hidden items-center gap-7 lg:flex" aria-label="More pages">
            {rightLinks.map((link) => (
              <NavLink key={link.label} {...link} pathname={pathname} />
            ))}
          </nav>
          <Link
            href="/book"
            className="inline-flex h-9 items-center rounded-full bg-[#f0c014] px-4 text-sm font-semibold text-[#1c1604] hover:bg-[#ffd84a]"
          >
            Book
          </Link>
        </div>
      </div>
      <nav id="site-menu" aria-label="Pages" hidden={!open} className="border-t border-white/15 bg-[#102f36] px-5 py-2 lg:hidden">
        {[...leftLinks, ...rightLinks].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex min-h-11 items-center text-base"
            onClick={() => setMenuPath(null)}
          >
            {link.label}
          </Link>
        ))}
        <button type="button" className="flex min-h-11 items-center text-base" onClick={toggleTheme}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </nav>
    </header>
  );
}
