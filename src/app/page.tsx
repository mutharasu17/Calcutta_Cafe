import BrightFullscreenHero from "@/components/home/BrightFullscreenHero";
import BrightBrandIntro from "@/components/home/BrightBrandIntro";
import BrightSignatureDish from "@/components/home/BrightSignatureDish";
import BrightCategoryDiscovery from "@/components/home/BrightCategoryDiscovery";
import BrightMenuPreview from "@/components/home/BrightMenuPreview";
import BrightSignatureCollection from "@/components/home/BrightSignatureCollection";
import BrightRestaurantStory from "@/components/home/BrightRestaurantStory";
import BrightVisualGallery from "@/components/home/BrightVisualGallery";
import BrightOrderOnline from "@/components/home/BrightOrderOnline";
import BrightRestaurantInfo from "@/components/home/BrightRestaurantInfo";
import { WebSiteJsonLd, OrganizationJsonLd, RestaurantJsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      {/* Search Engine Structured Data Schemas */}
      <WebSiteJsonLd />
      <OrganizationJsonLd />
      <RestaurantJsonLd />

      {/* 1. BRIGHT FULL-SCREEN CINEMATIC HERO (100svh, NATURAL WARM LIGHTING & SPLIT COMPOSITION) */}
      <BrightFullscreenHero />

      {/* 2. BENGALI CULINARY INTRODUCTION (WARM IVORY EDITORIAL & RIVER CATCH) */}
      <BrightBrandIntro />

      {/* 3. FEATURED SIGNATURE DISH (FLAME & CLAY KOSHA MANGSHO SPOTLIGHT) */}
      <BrightSignatureDish />

      {/* 4. EXPLORE FOOD CATEGORIES (GSAP DRAWSVG & MOTIONPATH ORBITING RINGS) */}
      <BrightCategoryDiscovery />

      {/* 5. COMPLETE MENU PREVIEW (FILTERABLE MENU & SOFT WHITE DISH CARDS) */}
      <BrightMenuPreview />

      {/* 6. SIGNATURE FOOD COLLECTION (CONNOISSEUR 3-PILLAR MASTERPIECES) */}
      <BrightSignatureCollection />

      {/* 7. BENGALI CULINARY STORY (AKASH SANTRA 2019 MONOGRAPH) */}
      <BrightRestaurantStory />

      {/* 8. FOOD GALLERY (A1 GALLERY-INSPIRED VISUAL ANTHOLOGY) */}
      <BrightVisualGallery />

      {/* 9. ORDER ONLINE (BANGALORE HUBS & SWIGGY / ZOMATO DISPATCH) */}
      <BrightOrderOnline />

      {/* 10. RESTAURANT INFORMATION (KITCHEN DISPATCH & HOURS) */}
      <BrightRestaurantInfo />
    </>
  );
}
