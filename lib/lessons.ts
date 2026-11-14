import { prisma } from "@/lib/db";
import type { LessonView } from "@/lib/types";

function toView(lesson: {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  durationMins: number;
  priceCents: number;
  currency: string;
  maxGroupSize: number;
  skillLevel: string;
  exclusive: boolean;
  includes: string;
}): LessonView {
  return {
    ...lesson,
    includes: lesson.includes.split("\n").map((line) => line.trim()).filter(Boolean),
  };
}

export async function getActiveLessons() {
  const lessons = await prisma.lesson.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
  return lessons.map(toView);
}
