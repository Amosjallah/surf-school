import { ClubAbout } from "@/components/club/about";
import { ClubBoards } from "@/components/club/boards";
import { ClubCoaches } from "@/components/club/coaches";
import { ClubGallery } from "@/components/club/gallery";
import { ClubHero } from "@/components/club/hero";
import { ClubQuestions } from "@/components/club/questions";
import { ClubSpots } from "@/components/club/spots";
import { ClubSteps } from "@/components/club/steps";
import { ClubTraining } from "@/components/club/training";
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
      <ClubSteps />
      <ClubCoaches />
      <ClubGallery />
      <ClubQuestions />
    </main>
  );
}
