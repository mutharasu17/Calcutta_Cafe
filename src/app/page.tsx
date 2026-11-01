import RetailHeroBanner from "@/components/home/RetailHeroBanner";
import ShopOurRange from "@/components/home/ShopOurRange";
import BrandTrustStrip from "@/components/home/BrandTrustStrip";
import BestSellersGallery from "@/components/home/BestSellersGallery";
import PromotionalBanners from "@/components/home/PromotionalBanners";
import OurSpeciality from "@/components/home/OurSpeciality";
import StreetFoodShowcase from "@/components/home/StreetFoodShowcase";
import BrandStorySection from "@/components/home/BrandStorySection";
import JournalGrid from "@/components/home/JournalGrid";

export default function HomePage() {
  return (
    <>
      {/* 1. LARGE PROMOTIONAL HERO BANNER (ANAND SWEETS RETAIL STYLE) */}
      <RetailHeroBanner />

      {/* 2. SHOP OUR RANGE — CATEGORY FIRST VISUAL STRUCTURE */}
      <ShopOurRange />

      {/* 3. BRAND INFORMATION & TRUST STRIP (4 VERIFIED PILLARS) */}
      <BrandTrustStrip />

      {/* 4. FEATURED DISHES & BEST SELLERS (ANAND STYLE PRODUCT GALLERY) */}
      <BestSellersGallery />

      {/* 5. PROMOTIONAL EDITORIAL CAMPAIGN BANNERS (RIVER FISH & SUNDAY KOSHA) */}
      <PromotionalBanners />

      {/* 6. OUR SPECIALITY — IMAGE-LED SIGNATURE CULINARY SHOWCASE */}
      <OurSpeciality />

      {/* 7. STREET SAVOURIES & SNACK DISCOVERY (PARK STREET KATHI ROLLS & CUTLETS) */}
      <StreetFoodShowcase />

      {/* 8. OUR STORY — AKASH SANTRA 2019 FOUNDING MONOGRAPH & PHILOSOPHY */}
      <BrandStorySection />

      {/* 9. THE BENGAL JOURNAL — EDITORIAL ARTICLE GRID */}
      <JournalGrid />
    </>
  );
}
