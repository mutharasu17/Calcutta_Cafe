import type { Metadata } from "next";
import { Suspense } from "react";
import { getPublicCategories, getPublicMenuItems } from "@/lib/menuService";
import { MenuJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Explore Our Menu — Bengali Culinary Repertoire | The Calcutta Cafe",
  description:
    "Explore the authentic flavours of Bengal: Shorshe Ilish, slow-cooked Kosha Mangsho, Daab Chingri, Bhetki Paturi, and artisanal Mishti Doi. Cooked fresh daily in Bangalore.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Explore Our Menu — The Calcutta Cafe",
    description:
      "Authentic Bengali culinary repertoire: slow-cooked Sunday Kosha Mangsho, river Hilsa, Bhetki Paturi, and earthen Mishti Doi.",
    url: "https://thecalcuttacafe.com/menu",
    images: [
      {
        url: "/images/hero-bengali-bhoj.jpg",
        width: 1200,
        height: 675,
        alt: "The Calcutta Cafe Bengal Menu",
      },
    ],
  },
};

export default function MenuPage() {
  const categories = getPublicCategories();
  const items = getPublicMenuItems();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://thecalcuttacafe.com" },
          { name: "Menu", url: "https://thecalcuttacafe.com/menu" },
        ]}
      />
      <MenuJsonLd categories={categories} items={items} />
      <Suspense fallback={null}>
        <MenuClient initialItems={items} />
      </Suspense>
    </>
  );
}
