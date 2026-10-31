import HeroSection from "@/components/sections/HeroSection";
import SoulOfBengalSection from "@/components/sections/SoulOfBengalSection";
import CuisineExplorerSection from "@/components/sections/CuisineExplorerSection";
import CookingArtSection from "@/components/sections/CookingArtSection";
import JourneyTimelineSection from "@/components/sections/JourneyTimelineSection";
import FounderMessageSection from "@/components/sections/FounderMessageSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      {/* CHAPTER 01: The First Impression — The Food */}
      <HeroSection />

      {/* CHAPTER 02: The Identity — Bengal & The Bhoj Ritual */}
      <SoulOfBengalSection />

      {/* CHAPTER 03: The Experience — Six Worlds of Bengali Gastronomy */}
      <CuisineExplorerSection />

      {/* CHAPTER 04: The Preparation — Every Flavour Has a Story */}
      <CookingArtSection />

      {/* CHAPTER 05: The Journey — From Bengal to Bangalore & Beyond */}
      <JourneyTimelineSection />

      {/* CHAPTER 06: The People — Akash Santra & The Founder's Vision */}
      <FounderMessageSection />

      {/* CHAPTER 07: The Destination — A Taste of Bengal, Wherever You Are */}
      <FinalCtaSection />
    </>
  );
}
