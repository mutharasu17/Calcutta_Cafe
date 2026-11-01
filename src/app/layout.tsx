import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileDock from "@/components/layout/MobileDock";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thecalcuttacafe.com"),
  title: "The Calcutta Cafe — Immersive Experience | Bengali Culinary Heritage",
  description:
    "The taste of Bengal. An extraordinary culinary experience. Authentic regional Bengali cuisine presented with quiet luxury. Founded by Akash Santra.",
  keywords: [
    "The Calcutta Cafe",
    "Bengali cuisine",
    "Akash Santra",
    "Bengali food Bangalore",
    "Kosha Mangsho",
    "Shorshe Ilish",
    "Mishti Doi",
    "Bengal culinary heritage",
  ],
  authors: [{ name: "Akash Santra" }],
  creator: "The Calcutta Cafe Foods Pvt Ltd",
  openGraph: {
    title: "The Calcutta Cafe — The Taste of Bengal",
    description: "An extraordinary culinary experience. Bringing authentic Bengali gastronomy closer to everyone.",
    url: "https://thecalcuttacafe.com",
    siteName: "The Calcutta Cafe",
    images: [
      {
        url: "/images/hero-bengali-bhoj.jpg",
        width: 1200,
        height: 675,
        alt: "The Calcutta Cafe Immersive Culinary Presentation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Calcutta Cafe — The Taste of Bengal",
    description: "An extraordinary culinary experience. Founded by Akash Santra.",
    creator: "@calcutta_cafe",
    images: ["/images/hero-bengali-bhoj.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} dark`}>
      <body className="min-h-screen bg-[#090909] text-[#F5F0E8] selection:bg-[#651F2B] selection:text-[#F5F0E8] pb-16 md:pb-0">
        <SmoothScroll>
          <Navbar />
          <main className="relative min-h-screen overflow-hidden pt-0">
            {children}
          </main>
          <Footer />
          <MobileDock />
        </SmoothScroll>
      </body>
    </html>
  );
}
