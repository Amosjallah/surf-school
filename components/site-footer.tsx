import Link from "next/link";
import { site, instagramUrl } from "@/lib/site";
import { Wrap } from "@/components/section";

export function SiteFooter() {
  const instagram = instagramUrl();
  return (
    <footer className="border-t border-line bg-deep text-deep-text">
      <Wrap className="grid gap-10 py-12 md:grid-cols-4">
        <div>
          <p className="font-display text-3xl">Saltline</p>
          <p className="mt-3 max-w-[28ch] text-deep-soft">
            Surf lessons at {site.meetingPoint}, {site.town}.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Hours</h2>
          <dl className="mt-3 space-y-2 text-deep-soft">
            {site.hours.map((row) => (
              <div key={row.label}>
                <dt className="text-deep-text">{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="text-lg">Contact</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a className="underline underline-offset-4" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              {instagram ? (
                <a className="underline underline-offset-4" href={instagram} rel="noreferrer">
                  Instagram
                </a>
              ) : (
                <span className="text-deep-soft">Instagram handle not set</span>
              )}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg">On this site</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <Link className="underline underline-offset-4" href="/lessons">
                Lessons
              </Link>
            </li>
            <li>
              <Link className="underline underline-offset-4" href="/book">
                Book a lesson
              </Link>
            </li>
            <li>
              <Link className="underline underline-offset-4" href="/about">
                Safety
              </Link>
            </li>
            <li>
              <Link className="underline underline-offset-4" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </Wrap>
      <Wrap className="border-t border-white/15 py-4 text-sm text-deep-soft">
        <p>
          {site.legalName} · {site.streetAddress}, {site.beach}, {site.town}, {site.country}
        </p>
      </Wrap>
    </footer>
  );
}
