import HensslerHero from "@/components/home/HensslerHero";
import HensslerBrandIntro from "@/components/home/HensslerBrandIntro";
import HensslerSignatureExperience from "@/components/home/HensslerSignatureExperience";
import HensslerMenuCategories from "@/components/home/HensslerMenuCategories";
import HensslerFeaturedDishes from "@/components/home/HensslerFeaturedDishes";
import HensslerCampaignBanner from "@/components/home/HensslerCampaignBanner";
import HensslerRestaurantStory from "@/components/home/HensslerRestaurantStory";
import HensslerVisualGallery from "@/components/home/HensslerVisualGallery";
import HensslerOrderOnline from "@/components/home/HensslerOrderOnline";
import HensslerRestaurantInfo from "@/components/home/HensslerRestaurantInfo";

export default function HomePage() {
  return (
    <>
      {/* SECTION 01 — CINEMATIC RESTAURANT HERO (HENSSLER STYLE) */}
      <HensslerHero />

      {/* SECTION 02 — BRAND INTRODUCTION (WARM IVORY EDITORIAL) */}
      <HensslerBrandIntro />

      {/* SECTION 03 — SIGNATURE FOOD EXPERIENCE (ASYMMETRIC SHOWCASE) */}
      <HensslerSignatureExperience />

      {/* SECTION 04 — EXPLORE OUR MENU (ANAND-INSPIRED CATEGORY DISCOVERY) */}
      <HensslerMenuCategories />

      {/* SECTION 05 — FEATURED MENU / SIGNATURE DISHES (DEEP RED RESTAURANT GALLERY) */}
      <HensslerFeaturedDishes />

      {/* SECTION 06 — EDITORIAL PROMOTIONAL BANNER (BURGUNDY RITUAL CAMPAIGN) */}
      <HensslerCampaignBanner />

      {/* SECTION 07 — BENGALI FOOD STORY (FOUNDER & RESTAURANT MONOGRAPH) */}
      <HensslerRestaurantStory />

      {/* SECTION 08 — FOOD AND RESTAURANT VISUAL GALLERY (A1 GALLERY ANTHOLOGY) */}
      <HensslerVisualGallery />

      {/* SECTION 09 — ORDER ONLINE (DEDICATED CONVERSION SECTION WITH SWIGGY & ZOMATO) */}
      <HensslerOrderOnline />

      {/* SECTION 10 — RESTAURANT INFORMATION / VISIT US (HUBS, HOURS & CONTACT) */}
      <HensslerRestaurantInfo />
    </>
  );
}
