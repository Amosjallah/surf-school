import { ClubAbout } from "@/components/club/about";
import { ClubBoards } from "@/components/club/boards";
import { ClubCoaches } from "@/components/club/coaches";
import { ClubGallery } from "@/components/club/gallery";
import { ClubHero } from "@/components/club/hero";
import { ClubPrices } from "@/components/club/prices";
import { ClubQuestions } from "@/components/club/questions";
import { ClubSpots } from "@/components/club/spots";
import { ClubSteps } from "@/components/club/steps";
import { ClubTimes } from "@/components/club/times";
import { ClubTraining } from "@/components/club/training";
import { ClubVisit } from "@/components/club/visit";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Saltline Surf School in Muizenberg",
  "Beginner surf lessons at Surfers Corner, Muizenberg. Small groups, boards and wetsuits included. Book a time in a few steps.",
  true,
);

export default function HomePage() {
  return (
    <main id="content" className="club-page">
      <ClubHero />
      <ClubAbout />
      <ClubSpots />
      <ClubBoards />
      <ClubTraining />
      <ClubPrices />
      <ClubSteps />
      <ClubTimes />
      <ClubCoaches />
      <ClubGallery />
      <ClubQuestions />
      <ClubVisit />
    </main>
  );
}
