import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
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
  title: "The Calcutta Cafe — Signature Edition | Bengali Culinary Heritage",
  description:
    "The soul of Bengal. Served differently. A refined, editorial presentation of authentic Bengali cuisine across India. Founded by Akash Santra.",
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
    title: "The Calcutta Cafe — Signature Edition",
    description: "The soul of Bengal. Served differently.",
    url: "https://thecalcuttacafe.com",
    siteName: "The Calcutta Cafe",
    images: [
      {
        url: "/images/hero-bengali-bhoj.jpg",
        width: 1200,
        height: 675,
        alt: "The Calcutta Cafe Signature Culinary Presentation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Calcutta Cafe — Signature Edition",
    description: "The soul of Bengal. Served differently. Founded by Akash Santra.",
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
      <body className="min-h-screen bg-[#171615] text-[#FAF9F6] selection:bg-[#641F2B] selection:text-[#FAF9F6]">
        <SmoothScroll>
          <Navbar />
          <main className="relative min-h-screen overflow-hidden pt-0">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
