import HeroSection from "@/components/sections/HeroSection";
import BrandIntroSection from "@/components/sections/BrandIntroSection";
import CuisineExplorerSection from "@/components/sections/CuisineExplorerSection";
import StoryPhilosophySection from "@/components/sections/StoryPhilosophySection";
import JourneyTimelineSection from "@/components/sections/JourneyTimelineSection";
import MissionVisionSection from "@/components/sections/MissionVisionSection";
import FounderMessageSection from "@/components/sections/FounderMessageSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Brand Introduction: A World of Bengal on Every Plate */}
      <BrandIntroSection />

      {/* 3. Explore Bengali Cuisine Categories */}
      <CuisineExplorerSection />

      {/* 4. Story Behind Brand & Food Philosophy */}
      <StoryPhilosophySection />

      {/* 5. Brand Journey Visual Timeline (2019 to Future) */}
      <JourneyTimelineSection />

      {/* 6. Brand Mission & Vision */}
      <MissionVisionSection />

      {/* 7. Founder Message from Akash Santra */}
      <FounderMessageSection />

      {/* 8. Final CTA Section */}
      <FinalCtaSection />
    </>
  );
}
