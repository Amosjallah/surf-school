# Saltline Surf School

A small site for booking surf lessons at Surfers Corner, Muizenberg. The booking page holds spots in a database. It does not take payment.

This is a working build with **draft** identity, prices, and policies. Replace those before anyone relies on the site. The list is at the bottom of this file.

## Run it locally

You need Node.js 20 or newer.

```bash
npm install
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The local desk password, from `.env`, is `saltline-desk`. Change it before anyone else can reach the machine. The desk is at [http://localhost:3000/admin](http://localhost:3000/admin).

npm 11 does not run dependency install scripts until they are allowed. `package.json` already allows Prisma and esbuild. Leave the `allowScripts` field in place so `prisma generate` can download its engine.

Check the overbooking guard:

```bash
npm run check:capacity
```

Lint, types, and production build:

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run db:setup` creates the SQLite file, generates the Prisma client, and seeds lessons, 14 days of times, one paused day, and two sample bookings. Seeding again updates lesson copy and adds any missing times. It does not wipe bookings. It will not run when `NODE_ENV=production` unless you set `ALLOW_SEED=true`.

## Environment

Copy `.env.example` to `.env`.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | SQLite file, for example `file:./dev.db` |
| `ADMIN_PASSWORD` | Desk password. No default in code. |
| `ADMIN_SECRET` | Signs the desk cookie. Use a long random string. |
| `NEXT_PUBLIC_SITE_URL` | Public URL, no trailing slash |
| `NEXT_PUBLIC_PHONE_DISPLAY` | Phone as people should read it |
| `NEXT_PUBLIC_PHONE_TEL` | Phone for the `tel:` link |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only, country code, no `+` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email |
| `NEXT_PUBLIC_INSTAGRAM` | Handle without `@`. Leave empty to hide the link. |
| `RESEND_API_KEY` | If empty, email is logged and not sent |
| `EMAIL_FROM` | Verified Resend sender, for example `Saltline <bookings@yourdomain.com>` |
| `PAYMENT_PROVIDER` | A note for you. It does not turn charging on. |

## Payments

Charging is intentionally not implemented. `lib/payments.ts` is the integration point for Paystack, Stripe, or mobile money.

A finished booking has `paymentStatus: "unpaid"`. Do not mark a booking paid in the browser. Do it from a verified webhook, after the provider says the money arrived. Do not trust a success URL on its own.

## Email

`lib/email.ts` sends through Resend when both `RESEND_API_KEY` and `EMAIL_FROM` are set. Otherwise it logs a stub and the confirmation screen says the email was not sent. The booking is still saved.

## Time and capacity

Times are South African Standard Time (UTC+2, no daylight saving). A slot’s capacity is the number of students. A private lesson locks the whole slot. The hold happens in a database transaction: the slot only updates if the spots are still free, and the booking row is written in the same transaction. Cancelling frees the spots the same way.

Blocking a date, or closing one time, stops new bookings. It does not cancel people who already have a reference. Cancel those from the desk if the lesson is off.

## Deploying to Vercel

The app is a Next.js project and can be imported into Vercel. Set the environment variables there.

SQLite will not keep bookings on Vercel. The filesystem is not a shared database. Before you deploy for real:

1. Create a Postgres database (Supabase is the straightforward option).
2. In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
3. Set `DATABASE_URL` to the Postgres connection string.
4. Run `npx prisma db push` (or a migration) against that database, then seed if you want the lesson rows.
5. Add the Resend and admin variables.

Do not commit `.env`.

## Replace before launch

These are placeholders, not approved business facts.

- **Name and place.** Saltline, Surfers Corner, Muizenberg, Cape Town. Edit `lib/site.ts`. Map pin and postal code are approximate.
- **Prices.** Draft rand amounts in `lib/catalog.ts`. Re-run `npm run db:seed` after you change them. Old bookings keep the total they were given.
- **Policies and the waiver.** `lib/policies.ts` and the payment sentence in `lib/payments.ts`. They appear on the about page, the booking checkbox, and the confirmation email. Have someone who can approve them read that file. This is not legal advice.
- **Minimum age.** `minimumAge` in `lib/policies.ts` (currently 8).
- **Hours and lesson start times.** `lib/site.ts`.
- **Coaches, testimonials, and gallery.** Sample copy in `lib/content.ts`. The testimonials are not real reviews.
- **Photographs.** Frames are labelled placeholders. Pass a `src` from `public/` into `MediaFrame`, and set the hero the same way in `components/hero.tsx`.
- **Phone, WhatsApp, email, Instagram.** Environment variables above. The phone number in the example is not a real line.
- **Payment keys.** Not wired. See `lib/payments.ts`.

## What’s in the database

Lessons: name, description, duration, price, max group size, skill level, and whether the lesson locks the slot.

Slots: date, start time, capacity, spots held, and a closed flag.

Bookings: reference, people, spots held, contact details, swimming ability, medical notes, waiver time, status, and payment status (`unpaid` until you connect a provider).
