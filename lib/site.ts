import { minimumAge } from "@/lib/policies";

export const TIMEZONE = "Africa/Johannesburg";

function env(name: string, fallback: string) {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : fallback;
}

export const site = {
  name: "Saltline",
  legalName: "Saltline Surf School",
  beach: "Muizenberg Beach",
  town: "Cape Town",
  region: "Western Cape",
  country: "South Africa",
  countryCode: "ZA",
  postalCode: "7945",
  streetAddress: "Surfers Corner, Beach Road",
  meetingPoint: "Surfers Corner, on the beach side of Beach Road",
  phoneDisplay: env("NEXT_PUBLIC_PHONE_DISPLAY", "+27 21 000 0000"),
  phoneTel: env("NEXT_PUBLIC_PHONE_TEL", "+27210000000"),
  whatsapp: env("NEXT_PUBLIC_WHATSAPP_NUMBER", "27210000000").replace(/\D/g, ""),
  email: env("NEXT_PUBLIC_CONTACT_EMAIL", "hello@saltline.example"),
  instagram: env("NEXT_PUBLIC_INSTAGRAM", ""),
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Surfers+Corner+Muizenberg+Cape+Town",
  geo: { latitude: -34.1084, longitude: 18.4716 },
  hours: [
    { label: "Desk", value: "07:30–17:00, every day" },
    { label: "Lesson starts", value: "08:00, 10:30, 13:00 and 15:30" },
  ],
  slotTimes: ["08:00", "10:30", "13:00", "15:30"],
  slotCapacity: 6,
  minimumAge,
} as const;

export function siteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export function instagramUrl() {
  if (!site.instagram) return null;
  return `https://instagram.com/${site.instagram.replace(/^@/, "")}`;
}
