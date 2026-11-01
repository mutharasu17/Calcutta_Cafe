import CinematicHero from "@/components/home/CinematicHero";
import SignatureDishGlass from "@/components/home/SignatureDishGlass";
import ImmersiveGallery from "@/components/home/ImmersiveGallery";
import TheCraftFilm from "@/components/home/TheCraftFilm";
import FounderEditorial from "@/components/home/FounderEditorial";
import BrandClosingCTA from "@/components/home/BrandClosingCTA";

export default function HomePage() {
  return (
    <>
      {/* SCENE A: Cinematic Hero (Full-Screen Film & Left-Aligned Typography) */}
      <CinematicHero />

      {/* SCENE B: Signature Cuisine Image with Floating Glass Panel */}
      <SignatureDishGlass />

      {/* SCENE C: Immersive Cuisine Gallery (Category Tabs & Glass Controls) */}
      <ImmersiveGallery />

      {/* SCENE D: Cinematic Preparation Film / The Craft Moments */}
      <TheCraftFilm />

      {/* SCENE E: Founder & Brand Story (Akash Santra Editorial Monograph) */}
      <FounderEditorial />

      {/* SCENE F: Full-Screen Brand Closing CTA */}
      <BrandClosingCTA />
    </>
  );
}
