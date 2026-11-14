import { lessonCatalog } from "@/lib/catalog";
import { prisma } from "@/lib/db";
import type { LessonView } from "@/lib/types";

function lessonsFromCatalog(): LessonView[] {
  return lessonCatalog.map((lesson) => ({
    id: lesson.slug,
    slug: lesson.slug,
    name: lesson.name,
    summary: lesson.summary,
    description: lesson.description,
    durationMins: lesson.durationMins,
    priceCents: lesson.priceCents,
    currency: lesson.currency,
    maxGroupSize: lesson.maxGroupSize,
    skillLevel: lesson.skillLevel,
    exclusive: lesson.exclusive,
    includes: [...lesson.includes],
  }));
}

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
  try {
    const lessons = await prisma.lesson.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    return lessons.map(toView);
  } catch (error) {
    console.error("Could not read lessons from Supabase.", error);
    return lessonsFromCatalog();
  }
}
