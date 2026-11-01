import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Serif_Bengali } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const notoBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thecalcuttacafe.com"),
  title: "The Calcutta Cafe — Bengal, Reimagined | Premium Bengali Culinary Editorial",
  description:
    "The taste of Bengal, beyond boundaries. Authentic regional Bengali cuisine presented with warm editorial sophistication. Founded by Akash Santra.",
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
    title: "The Calcutta Cafe — The Taste of Bengal, Beyond Boundaries",
    description: "Authentic regional Bengali gastronomy presented with warm editorial sophistication. Bringing Bengal closer to everyone.",
    url: "https://thecalcuttacafe.com",
    siteName: "The Calcutta Cafe",
    images: [
      {
        url: "/images/hero-bengali-bhoj.jpg",
        width: 1200,
        height: 675,
        alt: "The Calcutta Cafe Culinary Editorial",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Calcutta Cafe — The Taste of Bengal",
    description: "Bringing the taste of Bengal closer to everyone. Founded by Akash Santra.",
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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${notoBengali.variable}`}>
      <body className="min-h-screen bg-[#F5EFE4] text-[#29251F] selection:bg-[#7A382B] selection:text-[#F5EFE4]">
        <SmoothScroll>
          <Navbar />
          <main className="relative min-h-screen pt-20 lg:pt-24">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
