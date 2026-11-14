import { lessonCatalog } from "../lib/catalog";
import { createBooking } from "../lib/booking";
import { prisma } from "../lib/db";
import { site } from "../lib/site";
import { addDays, johannesburgParts } from "../lib/time";

async function main() {
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_SEED !== "true") {
    throw new Error("Refusing to seed while NODE_ENV is production. Set ALLOW_SEED=true to override.");
  }

  for (const lesson of lessonCatalog) {
    const data = {
      name: lesson.name,
      summary: lesson.summary,
      description: lesson.description,
      durationMins: lesson.durationMins,
      priceCents: lesson.priceCents,
      currency: lesson.currency,
      maxGroupSize: lesson.maxGroupSize,
      skillLevel: lesson.skillLevel,
      exclusive: lesson.exclusive,
      includes: lesson.includes.join("\n"),
      sortOrder: lesson.sortOrder,
      active: true,
    };
    await prisma.lesson.upsert({
      where: { slug: lesson.slug },
      create: { slug: lesson.slug, ...data },
      update: data,
    });
  }

  const today = johannesburgParts().date;
  const dates = Array.from({ length: 14 }, (_, index) => addDays(today, index));
  for (const date of dates) {
    for (const startTime of site.slotTimes) {
      await prisma.slot.upsert({
        where: { date_startTime: { date, startTime } },
        create: { date, startTime, capacity: site.slotCapacity, bookedCount: 0 },
        update: {},
      });
    }
  }

  const pauseDate = addDays(today, 4);
  await prisma.blockedDate.upsert({
    where: { date: pauseDate },
    create: { date: pauseDate, reason: "Onshore wind — lessons paused" },
    update: {},
  });

  const already = await prisma.booking.findFirst({
    where: { email: "sample.guest@saltline.example" },
    select: { id: true },
  });
  if (already) {
    console.info("Sample bookings already exist. Lessons and missing slots were updated.");
    return;
  }

  const firstWave = await prisma.lesson.findUnique({ where: { slug: "first-wave" } });
  if (!firstWave) throw new Error("First Wave lesson missing after seed.");

  const partial = await prisma.slot.findUnique({
    where: { date_startTime: { date: addDays(today, 1), startTime: "08:00" } },
  });
  const full = await prisma.slot.findUnique({
    where: { date_startTime: { date: addDays(today, 2), startTime: "10:30" } },
  });

  const sample = {
    lessonId: firstWave.id,
    name: "Sample Guest",
    phone: "+27210000000",
    email: "sample.guest@saltline.example",
    skillLevel: "never" as const,
    swimmingAbility: "short" as const,
    medicalNotes: "Sample booking created by the seed script.",
    waiverAccepted: true as const,
  };

  if (partial) {
    await createBooking({ ...sample, slotId: partial.id, groupSize: 2, name: "Sample Guest" });
  }
  if (full) {
    await createBooking({
      ...sample,
      slotId: full.id,
      groupSize: firstWave.maxGroupSize,
      name: "Sample Group",
      email: "sample.group@saltline.example",
    });
  }

  console.info("Seeded lessons, 14 days of times, one paused day, and two sample bookings.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
