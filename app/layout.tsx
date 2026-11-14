import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { LocalBusinessJsonLd } from "@/components/local-business";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm",
  display: "swap",
});

const themeBoot = `(function(){try{var t=localStorage.getItem("saltline-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${site.legalName} in Muizenberg`,
    template: `%s · ${site.name}`,
  },
  description:
    "Beginner surf lessons at Surfers Corner, Muizenberg. Small groups, boards and wetsuits included. Book a time in a few steps.",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: site.legalName,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3ede2" },
    { media: "(prefers-color-scheme: dark)", color: "#071c20" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="min-h-full bg-bg font-sans text-text antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <a className="skip" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
