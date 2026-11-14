import { BookingError, cancelBookingById, createBooking } from "../lib/booking";
import { prisma } from "../lib/db";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function expectFail(run: () => Promise<unknown>, label: string) {
  try {
    await run();
  } catch (error) {
    if (error instanceof BookingError) return;
    throw error;
  }
  throw new Error(`Expected a refusal: ${label}`);
}

async function main() {
  const lesson = await prisma.lesson.findUnique({ where: { slug: "first-wave" } });
  const priv = await prisma.lesson.findUnique({ where: { slug: "private" } });
  assert(lesson && priv, "Seed the database before running capacity checks.");

  const date = "2099-06-01";
  await prisma.booking.deleteMany({ where: { slot: { date: { in: [date, "2099-06-02", "2000-01-01"] } } } });
  await prisma.slot.deleteMany({ where: { date: { in: [date, "2099-06-02", "2000-01-01"] } } });
  await prisma.blockedDate.deleteMany({ where: { date: { in: [date, "2099-06-02"] } } });

  const slot = await prisma.slot.create({
    data: { date, startTime: "08:00", capacity: 3, bookedCount: 0 },
  });

  const base = {
    lessonId: lesson.id,
    slotId: slot.id,
    name: "Capacity Check",
    phone: "+27210000001",
    email: "capacity-check@saltline.example",
    skillLevel: "never" as const,
    swimmingAbility: "confident" as const,
    medicalNotes: "",
    waiverAccepted: true as const,
  };

  await createBooking({ ...base, groupSize: 2 });
  const afterFirst = await prisma.slot.findUnique({ where: { id: slot.id } });
  assert(afterFirst?.bookedCount === 2, "Two spots should be held.");

  await expectFail(() => createBooking({ ...base, groupSize: 2 }), "over capacity");
  const lastSpot = await createBooking({ ...base, groupSize: 1 });
  await expectFail(() => createBooking({ ...base, groupSize: 1 }), "full slot");

  await cancelBookingById(
    (await prisma.booking.findUniqueOrThrow({ where: { reference: lastSpot.reference } })).id,
  );
  const reopened = await prisma.slot.findUnique({ where: { id: slot.id } });
  assert(reopened?.bookedCount === 2, "Cancelling should free one spot.");

  const privateSlot = await prisma.slot.create({
    data: { date, startTime: "10:30", capacity: 6, bookedCount: 0 },
  });
  const locked = await createBooking({
    ...base,
    lessonId: priv.id,
    slotId: privateSlot.id,
    groupSize: 1,
  });
  const lockedRow = await prisma.slot.findUnique({ where: { id: privateSlot.id } });
  assert(lockedRow?.bookedCount === 6, "A private lesson should hold the whole slot.");
  await expectFail(
    () => createBooking({ ...base, slotId: privateSlot.id, groupSize: 1 }),
    "group beside a private",
  );
  await cancelBookingById(
    (await prisma.booking.findUniqueOrThrow({ where: { reference: locked.reference } })).id,
  );
  const unlocked = await prisma.slot.findUnique({ where: { id: privateSlot.id } });
  assert(unlocked?.bookedCount === 0, "Cancelling a private lesson should free the slot.");

  const past = await prisma.slot.create({
    data: { date: "2000-01-01", startTime: "08:00", capacity: 6, bookedCount: 0 },
  });
  await expectFail(() => createBooking({ ...base, slotId: past.id, groupSize: 1 }), "past slot");

  await prisma.blockedDate.create({ data: { date: "2099-06-02", reason: "Test swell" } });
  const paused = await prisma.slot.create({
    data: { date: "2099-06-02", startTime: "08:00", capacity: 6, bookedCount: 0 },
  });
  await expectFail(() => createBooking({ ...base, slotId: paused.id, groupSize: 1 }), "blocked date");

  await prisma.booking.deleteMany({
    where: { slot: { date: { in: [date, "2099-06-02", "2000-01-01"] } } },
  });
  await prisma.slot.deleteMany({ where: { date: { in: [date, "2099-06-02", "2000-01-01"] } } });
  await prisma.blockedDate.deleteMany({ where: { date: "2099-06-02" } });

  console.info("Capacity checks passed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
