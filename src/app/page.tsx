import GSAPFullscreenHero from "@/components/home/GSAPFullscreenHero";
import HensslerBrandIntro from "@/components/home/HensslerBrandIntro";
import HensslerSignatureExperience from "@/components/home/HensslerSignatureExperience";
import GSAPCategoryDiscovery from "@/components/home/GSAPCategoryDiscovery";
import GSAPFilteredMenu from "@/components/home/GSAPFilteredMenu";
import HensslerCampaignBanner from "@/components/home/HensslerCampaignBanner";
import HensslerRestaurantStory from "@/components/home/HensslerRestaurantStory";
import HensslerVisualGallery from "@/components/home/HensslerVisualGallery";
import HensslerOrderOnline from "@/components/home/HensslerOrderOnline";
import HensslerRestaurantInfo from "@/components/home/HensslerRestaurantInfo";

export default function HomePage() {
  return (
    <>
      {/* 1. FULL-SCREEN CINEMATIC HOMEPAGE HERO (100svh, TEXT DIRECTLY OVER IMAGE) */}
      <GSAPFullscreenHero />

      {/* 2. BENGALI CULINARY INTRODUCTION (WARM IVORY EDITORIAL) */}
      <HensslerBrandIntro />

      {/* 3. SIGNATURE FOOD EXPERIENCE (FLAME & CLAYPOT CRAFTSMANSHIP) */}
      <HensslerSignatureExperience />

      {/* 4. ANIMATED FOOD CATEGORY DISCOVERY (GSAP DRAWSVG & MOTIONPATH RINGS) */}
      <GSAPCategoryDiscovery />

      {/* 5. FILTERABLE MENU & SIGNATURE DISH CARDS (RELIABLE DISH VISIBILITY & ADD TO CART) */}
      <GSAPFilteredMenu />

      {/* 6. EDITORIAL BENGALI FOOD CAMPAIGN SECTION (BURGUNDY SUNDAY KOSHA RITUAL) */}
      <HensslerCampaignBanner />

      {/* 7. BRAND AND CULINARY HERITAGE STORY (AKASH SANTRA MONOGRAPH) */}
      <HensslerRestaurantStory />

      {/* 8. VISUAL FOOD GALLERY (A1 GALLERY PHOTOGRAPHIC ANTHOLOGY) */}
      <HensslerVisualGallery />

      {/* 9. ORDER ONLINE SECTION (DEDICATED CONVERSION WITH SWIGGY & ZOMATO) */}
      <HensslerOrderOnline />

      {/* 10. CONTACT AND RESTAURANT INFORMATION (BANGALORE HUBS & OPERATIONS) */}
      <HensslerRestaurantInfo />
    </>
  );
}
