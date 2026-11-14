import { NewsletterForm } from "@/components/club/newsletter";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-[#0c3d48] text-white">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 py-12 md:grid-cols-3 md:gap-8 md:px-8 md:py-14">
        <div>
          <h2>Subscribe to our newsletter</h2>
          <NewsletterForm />
        </div>
        <div>
          <h2>Get in touch</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a className="hover:text-white hover:underline" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="hover:text-white hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Office location & hours</h2>
          <address className="mt-4 text-sm leading-relaxed text-white/80 not-italic">
            {site.streetAddress}
            <br />
            {site.beach}, {site.town}
            <br />
            {site.hours[0]?.value}
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-[1120px] px-5 py-4 text-xs text-white/50 md:px-8">
          {site.legalName} · {site.town}, {site.country}
        </p>
      </div>
    </footer>
  );
}
