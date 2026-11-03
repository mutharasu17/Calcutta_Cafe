import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Corporate Inquiries | The Calcutta Cafe",
  description:
    "Connect with The Calcutta Cafe for catering inquiries, cloud kitchen expansion feedback, or corporate collaborations across Bangalore and India.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Connect with The Calcutta Cafe",
    description:
      "Direct communications for catering, bulk orders, and corporate inquiries with The Calcutta Cafe.",
    url: "https://thecalcuttacafe.com/contact",
    images: [
      {
        url: "/images/hero-bengali-bhoj.jpg",
        width: 1200,
        height: 675,
        alt: "The Calcutta Cafe Contact and Kitchen Locations",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://thecalcuttacafe.com" },
          { name: "Contact", url: "https://thecalcuttacafe.com/contact" },
        ]}
      />
      <ContactClient />
    </>
  );
}
