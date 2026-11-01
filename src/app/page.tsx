import MobileWelcome from "@/components/home/MobileWelcome";
import CinematicHero from "@/components/home/CinematicHero";
import SignatureDishGlass from "@/components/home/SignatureDishGlass";
import AnandCategoryShowcase from "@/components/home/AnandCategoryShowcase";
import SignatureSelection from "@/components/home/SignatureSelection";
import TheCraftFilm from "@/components/home/TheCraftFilm";
import FounderEditorial from "@/components/home/FounderEditorial";
import OrderOnlineSection from "@/components/home/OrderOnlineSection";
import JournalSection from "@/components/home/JournalSection";

export default function HomePage() {
  return (
    <>
      {/* MOBILE SCREEN 1: Welcome & Brand Discovery (Dismissable/Remembered) */}
      <MobileWelcome />

      {/* SCENE 1: Editorial Hero (Asymmetric Warm Ivory & Bengali Food Film) */}
      <CinematicHero />

      {/* SCENE 2: Signature Culinary Showcase (Traditional Kosha Mangsho) */}
      <SignatureDishGlass />

      {/* SCENE 3: Anand Sweets Inspired Category Visual Merchandising (6 Categories) */}
      <AnandCategoryShowcase />

      {/* SCENE 4: Curated Best-Sellers & Signature Repertoire (With Interactive Dish Details & Favourites) */}
      <SignatureSelection />

      {/* SCENE 5: The Bengali Food Experience (Four Dining Courses & Craft Film) */}
      <TheCraftFilm />

      {/* SCENE 6: Brand Story (Akash Santra 2019 Founder Monograph) */}
      <FounderEditorial />

      {/* SCENE 7: Order Online (Verified Bangalore Swiggy & Zomato Delivery Hubs) */}
      <OrderOnlineSection />

      {/* SCENE 8: The Bengal Journal (Curated Essays & Food Culture) */}
      <JournalSection />
    </>
  );
}
