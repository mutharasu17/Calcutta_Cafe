import AnandHero from "@/components/home/AnandHero";
import BrandManifesto from "@/components/home/BrandManifesto";
import AnandCategoryGrid from "@/components/home/AnandCategoryGrid";
import BrandBenefitsStrip from "@/components/home/BrandBenefitsStrip";
import AnandBestSellers from "@/components/home/AnandBestSellers";
import PromotionalCampaign from "@/components/home/PromotionalCampaign";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import SpecialityShowcase from "@/components/home/SpecialityShowcase";
import FoodDiscoverySection from "@/components/home/FoodDiscoverySection";
import BrandStorySpread from "@/components/home/BrandStorySpread";
import JournalPreview from "@/components/home/JournalPreview";

export default function HomePage() {
  return (
    <>
      {/* 1. LARGE PROMOTIONAL HERO (ANAND SWEETS × A1 GALLERY) */}
      <AnandHero />

      {/* 2. INTRODUCTORY BRAND STATEMENT */}
      <BrandManifesto />

      {/* 3. SHOP OUR RANGE — IMAGE-LED CATEGORY GRID */}
      <AnandCategoryGrid />

      {/* 4. BRAND BENEFITS / INFORMATION STRIP */}
      <BrandBenefitsStrip />

      {/* 5. BEST SELLERS — PRODUCT GALLERY REDESIGN */}
      <AnandBestSellers />

      {/* 6. LARGE PROMOTIONAL VISUAL CAMPAIGN */}
      <PromotionalCampaign />

      {/* 7. FEATURED BENGALI COLLECTIONS */}
      <FeaturedCollections />

      {/* 8. SPECIALITY SHOWCASE — ALTERNATING VISUAL COMPOSITIONS */}
      <SpecialityShowcase />

      {/* 9. FOOD DISCOVERY / CATEGORY SHOWCASE (INTERACTIVE) */}
      <FoodDiscoverySection />

      {/* 10. BRAND STORY — AKASH SANTRA 2019 MONOGRAPH */}
      <BrandStorySpread />

      {/* 11. JOURNAL / LATEST STORIES (FEATURED + SUPPORTING) */}
      <JournalPreview />
    </>
  );
}
