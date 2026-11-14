import { PageBand } from "@/components/club/page-band";
import { faqs } from "@/lib/content";
import { pageMeta } from "@/lib/metadata";
import { instagramUrl, site } from "@/lib/site";
import { generalWhatsappMessage, whatsappHref } from "@/lib/whatsapp";

export const metadata = pageMeta(
  "Questions",
  "Answers about lessons at Saltline Surf School, plus WhatsApp, phone, and email for Surfers Corner, Muizenberg.",
);

export default function ContactPage() {
  const instagram = instagramUrl();

  return (
    <main id="content" className="page-shell">
      <PageBand
        eyebrow="Questions"
        title="Ask before you book."
        lede="For a lesson, booking is faster than a message. If you already have a reference, send it on WhatsApp and we can move the time."
      />

      <section className="mx-auto grid w-full max-w-[1120px] items-start gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.35fr_0.75fr]">
        <div>
          {faqs.map((item) => (
            <details key={item.q} className="group border-b border-[#d7e4e7]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold">
                <span>{item.q}</span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f4f8f9] text-xl leading-none text-[#0d4552] group-open:bg-[#f0c014]">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">–</span>
                </span>
              </summary>
              <p className="max-w-[62ch] pb-5 text-[#4e656c]">{item.a}</p>
            </details>
          ))}
        </div>

        <aside className="rounded-3xl bg-[#0d4552] p-6 text-white lg:sticky lg:top-24">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#f0c014] uppercase">Get in touch</p>
          <h2 className="mt-3 text-3xl">We answer from the beach.</h2>
          <a
            className="mt-6 inline-flex h-11 items-center rounded-full bg-[#f0c014] px-5 text-sm font-semibold text-[#1c1604] hover:bg-[#ffd84a]"
            href={whatsappHref(generalWhatsappMessage())}
            target="_blank"
            rel="noreferrer"
          >
            Message us on WhatsApp
          </a>
          <dl className="mt-8 space-y-5 text-sm">
            <div>
              <dt className="text-white/60">Phone</dt>
              <dd className="mt-1 text-lg">
                <a className="underline underline-offset-4" href={`tel:${site.phoneTel}`}>
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-white/60">Email</dt>
              <dd className="mt-1 break-all text-lg">
                <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </dd>
            </div>
            {instagram ? (
              <div>
                <dt className="text-white/60">Instagram</dt>
                <dd className="mt-1 text-lg">
                  <a className="underline underline-offset-4" href={instagram} rel="noreferrer">
                    @{site.instagram.replace(/^@/, "")}
                  </a>
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="text-white/60">Meet</dt>
              <dd className="mt-1 text-lg">
                {site.meetingPoint}, {site.town}
              </dd>
            </div>
          </dl>
        </aside>
      </section>
    </main>
  );
}
