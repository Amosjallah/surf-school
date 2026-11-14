"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { IconBag, IconClose, IconMenu, IconSearch, IconUser } from "@/components/club/icons";
import { ClubLogo } from "@/components/club/logo";
import { cx } from "@/lib/cx";

const links = [
  { href: "/#about", label: "About Us" },
  { href: "/lessons", label: "Programs" },
  { href: "/#training", label: "Blog" },
  { href: "/#surfboards", label: "Shop" },
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
  const home = pathname === "/";
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
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
        home ? "absolute inset-x-0 top-0" : "sticky top-0 bg-[#0c3d48]",
        open && "bg-[#0c3d48]",
      )}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-[1120px] items-center gap-6 px-5 md:px-8">
        <ClubLogo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Pages">
          {links.map((link) => {
            const current = link.href === pathname;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cx("text-[15px] font-medium text-white/90 hover:text-white", current && "text-white underline underline-offset-4")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="grid size-11 place-items-center"
            aria-expanded={searchOpen}
            aria-controls="site-search"
            aria-label={searchOpen ? "Close search" : "Search"}
            onClick={() => setSearchOpen((value) => !value)}
          >
            <IconSearch className="size-[18px]" />
          </button>
          <Link href="/book" className="grid size-11 place-items-center" aria-label="Book a lesson">
            <IconUser className="size-[18px]" />
          </Link>
          <Link href="/lessons" className="grid size-11 place-items-center" aria-label="Lessons">
            <IconBag className="size-[18px]" />
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setMenuPath(open ? null : pathname)}
          >
            {open ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
          </button>
        </div>
      </div>
      {searchOpen ? (
        <form id="site-search" action="/lessons" className="border-t border-white/15 bg-[#0c3d48] px-5 py-3 md:px-8">
          <div className="mx-auto flex w-full max-w-[1120px] gap-2">
            <label htmlFor="site-search-input" className="sr-only">
              Search lessons
            </label>
            <input
              id="site-search-input"
              name="q"
              type="search"
              placeholder="Search lessons"
              className="h-11 min-w-0 flex-1 border border-white/30 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/50"
            />
            <button type="submit" className="h-11 bg-white px-4 text-[11px] font-bold tracking-[0.14em] text-[#0c3d48] uppercase">
              Search
            </button>
          </div>
        </form>
      ) : null}
      <nav id="site-menu" aria-label="Pages" hidden={!open} className="border-t border-white/15 bg-[#0c3d48] px-5 py-2 lg:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
            className="flex min-h-11 items-center text-base"
            onClick={() => setMenuPath(null)}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/book" className="flex min-h-11 items-center text-base" onClick={() => setMenuPath(null)}>
          Book a lesson
        </Link>
        <Link href="/contact" className="flex min-h-11 items-center text-base" onClick={() => setMenuPath(null)}>
          Contact
        </Link>
        <button type="button" className="flex min-h-11 items-center text-base" onClick={toggleTheme}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </nav>
    </header>
  );
}
