import { minimumAge } from "@/lib/policies";

/**
 * DRAFT prices, in South African cents. The school has not confirmed them.
 * total = priceCents × people. A private lesson is priced once and locks the slot.
 */
export const lessonCatalog = [
  {
    slug: "first-wave",
    name: "First Wave",
    summary:
      "For people who have never stood up, or tried once and swallowed the Atlantic.",
    description:
      "Two hours on Muizenberg’s beach break. We start on the sand, then catch already-broken waves with a coach beside you. Most of the time you are in waist-deep to chest-deep water.",
    durationMins: 120,
    priceCents: 49500,
    currency: "ZAR",
    maxGroupSize: 6,
    skillLevel: "Beginner",
    exclusive: false,
    includes: [
      "Soft surfboard and leash",
      "Wetsuit in your size",
      "Beach briefing and pop-up practice",
      "A coach in the water with the group",
    ],
    sortOrder: 1,
  },
  {
    slug: "improver",
    name: "Improver",
    summary: "You can pop up. You want the ride to last longer than a second.",
    description:
      "Two hours for people who have already had a lesson or two. We work on where you sit, the timing of the pop-up, and riding out of the whitewater instead of sinking in it.",
    durationMins: 120,
    priceCents: 54500,
    currency: "ZAR",
    maxGroupSize: 4,
    skillLevel: "Improver",
    exclusive: false,
    includes: [
      "Board matched to your size",
      "Wetsuit",
      "A smaller group than First Wave",
      "One thing to practice before you come back",
    ],
    sortOrder: 2,
  },
  {
    slug: "private",
    name: "Private",
    summary: "One coach, just you. This holds the whole time slot.",
    description:
      "Ninety minutes with a coach to yourself. Useful if you want quiet, if you are nervous in a group, or if you already surf and want someone to watch your turns.",
    durationMins: 90,
    priceCents: 98000,
    currency: "ZAR",
    maxGroupSize: 1,
    skillLevel: "Any level",
    exclusive: true,
    includes: [
      "One coach, only your lesson in that time",
      "Board and wetsuit",
      "A plan for the next time you paddle out",
    ],
    sortOrder: 3,
  },
  {
    slug: "kids",
    name: "Kids",
    summary: `From ${minimumAge} years old. Shallow water, short boards, no being thrown in.`,
    description:
      "Ninety minutes for children who can swim a short distance. We stay in the shallows. A parent can stand on the sand the whole time. If a child wants to watch first, that is allowed.",
    durationMins: 90,
    priceCents: 42000,
    currency: "ZAR",
    maxGroupSize: 4,
    skillLevel: `Beginner, ${minimumAge} and up`,
    exclusive: false,
    includes: [
      "Small soft board and leash",
      "Kids wetsuit",
      "A coach who stays in the shallows",
      "Room for a parent on the sand",
    ],
    sortOrder: 4,
  },
] as const;

export type CatalogLesson = (typeof lessonCatalog)[number];
