import CinematicFullscreenHero from "@/components/home/CinematicFullscreenHero";
import HensslerBrandIntro from "@/components/home/HensslerBrandIntro";
import HensslerSignatureExperience from "@/components/home/HensslerSignatureExperience";
import CinematicCategoryDiscovery from "@/components/home/CinematicCategoryDiscovery";
import CinematicFeaturedMenu from "@/components/home/CinematicFeaturedMenu";
import HensslerCampaignBanner from "@/components/home/HensslerCampaignBanner";
import HensslerRestaurantStory from "@/components/home/HensslerRestaurantStory";
import HensslerVisualGallery from "@/components/home/HensslerVisualGallery";
import HensslerOrderOnline from "@/components/home/HensslerOrderOnline";
import HensslerRestaurantInfo from "@/components/home/HensslerRestaurantInfo";

export default function HomePage() {
  return (
    <>
      {/* 1. FULL-SCREEN CINEMATIC HOMEPAGE HERO (100svh, TEXT OVER IMAGE) */}
      <CinematicFullscreenHero />

      {/* 2. BENGALI BRAND INTRODUCTION (WARM IVORY EDITORIAL) */}
      <HensslerBrandIntro />

      {/* 3. SIGNATURE FOOD EXPERIENCE (ASYMMETRIC FLAME & CLAYPOT CRAFT) */}
      <HensslerSignatureExperience />

      {/* 4. ANIMATED FOOD CATEGORY DISCOVERY (INDIVIDUAL ORBITING RING MOTION) */}
      <CinematicCategoryDiscovery />

      {/* 5. FEATURED SIGNATURE DISHES WITH ADD TO CART & FILTER TABS */}
      <CinematicFeaturedMenu />

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
