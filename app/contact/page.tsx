import { buttonClasses } from "@/components/button";
import { Dek, SectionTitle, Wrap } from "@/components/section";
import { pageMeta } from "@/lib/metadata";
import { instagramUrl, site } from "@/lib/site";
import { generalWhatsappMessage, whatsappHref } from "@/lib/whatsapp";

export const metadata = pageMeta(
  "Contact",
  "WhatsApp, phone, and email for Saltline Surf School at Surfers Corner, Muizenberg.",
);

export default function ContactPage() {
  const instagram = instagramUrl();
  return (
    <main id="content" className="py-12 md:py-16">
      <Wrap>
        <SectionTitle as="h1">Contact</SectionTitle>
        <Dek>
          For a lesson, booking is faster than a message. If you already have a reference, send it on WhatsApp and we can move the time.
        </Dek>
        <div className="mt-8">
          <a className={buttonClasses("primary")} href={whatsappHref(generalWhatsappMessage())} target="_blank" rel="noreferrer">
            Message us on WhatsApp
          </a>
        </div>
        <ul className="mt-10 max-w-xl border-t border-line">
          <li className="border-b border-line py-4">
            <p className="text-sm text-soft">Phone</p>
            <a className="text-2xl underline underline-offset-4" href={`tel:${site.phoneTel}`}>
              {site.phoneDisplay}
            </a>
          </li>
          <li className="border-b border-line py-4">
            <p className="text-sm text-soft">Email</p>
            <a className="text-2xl underline underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li className="border-b border-line py-4">
            <p className="text-sm text-soft">Instagram</p>
            {instagram ? (
              <a className="text-2xl underline underline-offset-4" href={instagram} rel="noreferrer">
                @{site.instagram.replace(/^@/, "")}
              </a>
            ) : (
              <p className="text-2xl">Not set yet</p>
            )}
          </li>
          <li className="border-b border-line py-4">
            <p className="text-sm text-soft">Meet</p>
            <p className="text-2xl">
              {site.meetingPoint}, {site.town}
            </p>
          </li>
        </ul>
      </Wrap>
    </main>
  );
}
