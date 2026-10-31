import SignatureOpening from "@/components/home/SignatureOpening";
import SignatureDish from "@/components/home/SignatureDish";
import CulinaryCollection from "@/components/home/CulinaryCollection";
import TheCraft from "@/components/home/TheCraft";
import BrandStory from "@/components/home/BrandStory";
import FinalStatement from "@/components/home/FinalStatement";

export default function HomePage() {
  return (
    <>
      {/* EXPERIENCE 01: The Signature Opening */}
      <SignatureOpening />

      {/* EXPERIENCE 02: The Signature Dish */}
      <SignatureDish />

      {/* EXPERIENCE 03: The Culinary Collection */}
      <CulinaryCollection />

      {/* EXPERIENCE 04: The Craft */}
      <TheCraft />

      {/* EXPERIENCE 05: The Brand Story */}
      <BrandStory />

      {/* EXPERIENCE 06: The Final Statement */}
      <FinalStatement />
    </>
  );
}
