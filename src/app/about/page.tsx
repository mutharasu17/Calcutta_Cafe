import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BRAND_DATA } from "@/data/brandInfo";
import { MENU_ITEMS } from "@/data/menuData";
import { ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Our Story — Bengali Heritage Reimagined | The Calcutta Cafe",
  description:
    "The story and foundational vision of The Calcutta Cafe, founded in 2019 by Akash Santra. Bringing authentic regional Bengali cuisine to tables across India.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Our Story — The Calcutta Cafe",
    description:
      "A culinary monograph celebrating Bengal's heritage recipes, founded by Akash Santra in 2019.",
    url: "https://thecalcuttacafe.com/about",
    images: [
      {
        url: "/images/brand/founder-akash-santra.jpeg",
        width: 1402,
        height: 1122,
        alt: "Akash Santra, Founder of The Calcutta Cafe holding official branded mug",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://thecalcuttacafe.com" },
          { name: "Our Story", url: "https://thecalcuttacafe.com/about" },
        ]}
      />
      <div className="relative pb-28 bg-[#FFF8ED] text-[#2D231E] min-h-screen">
        {/* Editorial Header */}
        <section className="px-4 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-10 sm:pb-20 border-b border-[#E6D8C3] bg-[#FAF6F0]">
          <div className="mx-auto max-w-5xl">
            <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#5B1B8A] font-bold block mb-3">
              A Culinary Monograph • আমাদের কথা
            </span>
            <h1 className="font-serif text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.08] sm:leading-[1.04]">
              The soul of Bengal,
              <span className="block italic text-[#5B1B8A] font-normal mt-1">
                crafted with purpose.
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-[#5C524B] font-normal leading-relaxed max-w-3xl">
              Founded by Akash Santra, The Calcutta Cafe was born to represent the full depth of Bengal&apos;s culinary heritage—bringing authentic flavors and dependable food experiences to tables across India.
            </p>
          </div>
        </section>

        {/* Narrative Section 01: Genesis */}
        <section className="px-4 sm:px-10 lg:px-16 py-10 sm:py-16 lg:py-24 border-b border-[#E6D8C3]">
          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#5B1B8A] font-bold block">
                The Genesis • Estd. 2019
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#2D231E]">
                Beyond the familiar.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#5C524B] font-normal leading-relaxed">
                <p>
                  In 2019, when the foundational vision of The Calcutta Cafe took shape, Bengali cuisine outside Bengal was often constrained to a handful of popular dishes or sweet confections.
                </p>
                <p>
                  Akash Santra recognized that people craving the comfort of authentic Bengali dining—the golden warmth of Chholar Dal, the river delicacy of Katla Kalia, or the unhurried richness of Sunday Kosha Mangsho—deserved a brand grounded in authenticity and service excellence.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6F0] shadow-md border-2 border-[#D2B48C] rounded-sm">
                <Image
                  src="/images/brand/durga-puja-dining-hall.jpeg"
                  alt="Durga Puja Bengali Heritage Dining Hall"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Narrative Section 02: Founder Leadership */}
        <section className="px-4 sm:px-10 lg:px-16 py-10 sm:py-16 lg:py-24 border-b border-[#E6D8C3] bg-[#FAF6F0]">
          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF6F0] shadow-md border-2 border-[#D2B48C] rounded-sm">
                <Image
                  src="/images/brand/founder-akash-santra.jpeg"
                  alt="Akash Santra, Founder of The Calcutta Cafe holding official branded mug"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 sm:space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#5B1B8A] font-bold block mb-1">
                  Founder Profile
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#2D231E]">
                  Akash Santra
                </h2>
                <p className="text-xs font-mono uppercase tracking-wider text-[#5C524B] mt-1">
                  8–9 Years Customer Experience Leadership
                </p>
              </div>

              <div className="bg-[#FFF8ED] p-5 sm:p-6 border-l-4 border-l-[#5B1B8A] border border-[#E6D8C3] my-4 shadow-2xs rounded-sm">
                <p className="font-serif text-lg sm:text-2xl text-[#2D231E] font-normal italic leading-snug">
                  &ldquo;{BRAND_DATA.founder.approvedQuote}&rdquo;
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#5C524B] font-normal leading-relaxed">
                Applying a background of customer experience rigor, Akash built The Calcutta Cafe with an insistence on operational dependability: consistent preparations, robust packaging for delivery transit, and a long-term roadmap that reaches from Bangalore to Delhi NCR and major metros.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative Section 03: Mission & Vision */}
        <section className="px-4 sm:px-10 lg:px-16 py-10 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2 sm:pt-4">
            <div className="bg-[#FAF6F0] p-6 sm:p-8 border border-[#E6D8C3] shadow-2xs space-y-3 rounded-sm">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#5B1B8A] font-bold block">
                Our Mission
              </span>
              <p className="text-sm sm:text-base text-[#5C524B] font-normal leading-relaxed">
                {BRAND_DATA.mission}
              </p>
            </div>

            <div className="bg-[#FAF6F0] p-6 sm:p-8 border border-[#E6D8C3] shadow-2xs space-y-3 rounded-sm">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#5B1B8A] font-bold block">
                Our Vision
              </span>
              <p className="text-sm sm:text-base text-[#5C524B] font-normal leading-relaxed">
                {BRAND_DATA.vision}
              </p>
            </div>
          </div>

          <div className="mt-10 sm:mt-14 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 bg-[#5B1B8A] px-6 sm:px-8 py-3.5 sm:py-4 min-h-[44px] text-xs font-semibold uppercase tracking-[0.18em] text-[#FFF8ED] hover:bg-[#4B1473] transition-all shadow-md rounded-sm border border-[#FFB834]/50"
            >
              <span>Explore The Bengal Menu ({MENU_ITEMS.length} Dishes)</span>
              <ArrowRight className="h-4 w-4 text-[#FFB834]" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
