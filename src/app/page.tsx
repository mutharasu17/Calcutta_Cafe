import CinematicHero from "@/components/home/CinematicHero";
import SignatureDishGlass from "@/components/home/SignatureDishGlass";
import ImmersiveGallery from "@/components/home/ImmersiveGallery";
import TheCraftFilm from "@/components/home/TheCraftFilm";
import FounderEditorial from "@/components/home/FounderEditorial";
import OrderOnlineSection from "@/components/home/OrderOnlineSection";
import JournalSection from "@/components/home/JournalSection";

export default function HomePage() {
  return (
    <>
      {/* SCENE 1: Editorial Hero (Asymmetric Warm Ivory & Food Film) */}
      <CinematicHero />

      {/* SCENE 2: Signature Culinary Showcase (Traditional Kosha Mangsho) */}
      <SignatureDishGlass />

      {/* SCENE 3: Explore the Menu (6 Categories, Anand Sweets Inspired) */}
      <ImmersiveGallery />

      {/* SCENE 4: The Bengali Food Experience (Four Dining Courses & Craft Film) */}
      <TheCraftFilm />

      {/* SCENE 5: Brand Story (Akash Santra 2019 Founder Monograph) */}
      <FounderEditorial />

      {/* SCENE 6: Order Online (Verified Swiggy & Zomato Delivery) */}
      <OrderOnlineSection />

      {/* SCENE 7: The Bengal Journal (Curated Essays & Food Stories) */}
      <JournalSection />
    </>
  );
}
