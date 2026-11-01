import Image from "next/image";
import Link from "next/link";
import { BRAND_DATA } from "@/data/brandInfo";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Story | The Calcutta Cafe",
  description:
    "The journey of The Calcutta Cafe, founded by Akash Santra. Bringing the authentic culinary heritage of Bengal closer to everyone across India.",
};

export default function AboutPage() {
  return (
    <div className="relative pb-28 bg-[#F5EFE4] text-[#29251F] min-h-screen">
      {/* Editorial Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 border-b border-[#E6D8C3]">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block mb-3">
            A Culinary Monograph • আমাদের কথা
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.04]">
            The soul of Bengal,
            <span className="block italic text-[#7A382B] font-light mt-1">
              crafted with purpose.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#6B6357] font-normal leading-relaxed max-w-3xl">
            Founded by Akash Santra, The Calcutta Cafe was born to represent the full depth of Bengal&apos;s culinary heritage—bringing authentic flavors and dependable food experiences to tables across India.
          </p>
        </div>
      </section>

      {/* Narrative Section 01: Genesis */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24 border-b border-[#E6D8C3]">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#7A382B] font-semibold block">
              The Genesis • Estd. 2019
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#29251F]">
              Beyond the familiar.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed">
              <p>
                In 2019, when the foundational vision of The Calcutta Cafe took shape, Bengali cuisine outside Bengal was often constrained to a handful of popular dishes or sweet confections.
              </p>
              <p>
                Akash Santra recognized that people craving the comfort of authentic Bengali dining—the subtle herbal harmony of Shukto, the golden warmth of Chholar Dal, or the unhurried richness of Sunday Kosha Mangsho—deserved a brand grounded in authenticity and service excellence.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E6D8C3] shadow-lg border border-[#E6D8C3]">
              <Image
                src="/images/hero-bengali-bhoj.jpg"
                alt="Traditional Royal Bhoj Feast"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 02: Founder Leadership */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24 border-b border-[#E6D8C3] bg-[#E6D8C3]/40">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FFFFFF] shadow-lg border border-[#D8C7B0]">
              <Image
                src={BRAND_DATA.founder.image}
                alt="Akash Santra, Founder"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#7A382B] font-semibold block mb-1">
                Founder Profile
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#29251F]">
                Akash Santra
              </h2>
              <p className="text-xs font-mono uppercase tracking-wider text-[#6B6357] mt-1">
                8–9 Years Customer Experience Leadership
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-6 border-l-4 border-l-[#7A382B] border border-[#D8C7B0] my-4 shadow-sm">
              <p className="font-serif text-xl sm:text-2xl text-[#29251F] font-normal italic leading-snug">
                &ldquo;{BRAND_DATA.founder.approvedQuote}&rdquo;
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed">
              Applying a background of customer experience rigor, Akash built The Calcutta Cafe with an insistence on operational dependability: consistent preparations, robust packaging for delivery transit, and a long-term roadmap that reaches from Bangalore to Delhi NCR and major metros.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section 03: Mission & Vision */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="bg-[#FFFFFF] p-8 border border-[#E6D8C3] shadow-sm space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#7A382B] font-semibold block">
              Our Mission
            </span>
            <p className="text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed">
              {BRAND_DATA.mission}
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-8 border border-[#E6D8C3] shadow-sm space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#7A382B] font-semibold block">
              Our Vision
            </span>
            <p className="text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed">
              {BRAND_DATA.vision}
            </p>
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 bg-[#7A382B] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#F5EFE4] hover:bg-[#5E2B21] transition-all shadow-md"
          >
            <span>Explore The Bengal Menu</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
