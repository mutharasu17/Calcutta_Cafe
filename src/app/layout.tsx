import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thecalcuttacafe.com"),
  title: "The Calcutta Cafe | The Taste of Bengal, Beyond Boundaries",
  description:
    "Bringing the rich culinary diversity of Bengali cuisine closer to everyone across India. Discover slow-cooked Kosha Mangsho, Shorshe Ilish, vegetarian heritage dishes, and artisanal sweets. Founded by Akash Santra.",
  keywords: [
    "The Calcutta Cafe",
    "Bengali cuisine",
    "Bengali food Bangalore",
    "Kosha Mangsho",
    "Shorshe Ilish",
    "Akash Santra",
    "Authentic Bengali food",
    "Mishti Doi",
    "Bengali Cloud Kitchen",
  ],
  authors: [{ name: "Akash Santra" }],
  creator: "The Calcutta Cafe",
  openGraph: {
    title: "The Calcutta Cafe — Bringing the Taste of Bengal Closer to Everyone",
    description:
      "A culinary movement to make the complete diversity of Bengal's rich food heritage accessible across India.",
    url: "https://thecalcuttacafe.com",
    siteName: "The Calcutta Cafe",
    images: [
      {
        url: "/images/hero-bengali-bhoj.jpg",
        width: 1200,
        height: 675,
        alt: "The Calcutta Cafe Authentic Royal Bengali Feast",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Calcutta Cafe | Authentic Bengali Food",
    description:
      "The Taste of Bengal, Beyond Boundaries. Founded by Akash Santra.",
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
      <body className="min-h-screen bg-[#0A0E17] text-[#FAF6F0] selection:bg-[#8B1E1E] selection:text-white">
        <Navbar />
        <main className="relative min-h-screen overflow-hidden pt-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
