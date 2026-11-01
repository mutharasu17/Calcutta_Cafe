import Image from "next/image";
import Link from "next/link";
import { BRAND_DATA } from "@/data/brandInfo";
import { ArrowRight } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";

export const metadata = {
  title: "Our Story — Immersive Edition | The Calcutta Cafe",
  description:
    "The journey of The Calcutta Cafe, founded by Akash Santra. Bringing the authentic culinary heritage of Bengal closer to everyone across India.",
};

export default function AboutPage() {
  return (
    <div className="relative pt-32 pb-28 bg-[#090909] text-[#F5F0E8] min-h-screen">
      {/* Editorial Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="mx-auto max-w-5xl">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#C7AC83] block mb-4">
            A Culinary Monograph
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[1.04]">
            The soul of Bengal,
            <span className="block italic text-[#C7AC83] font-light mt-1">
              crafted with purpose.
            </span>
          </h1>
          <p className="mt-8 text-base sm:text-lg text-[#A9A19A] font-light leading-relaxed max-w-3xl">
            Founded by Akash Santra, The Calcutta Cafe was born to represent the full depth of Bengal&apos;s culinary heritage—bringing authentic flavors and dependable food experiences to tables across India.
          </p>
        </div>
      </section>

      {/* Narrative Section 01: Genesis */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-32 border-b border-white/[0.08]">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C7AC83] block">
              The Genesis • 2019
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F0E8]">
              Beyond the familiar.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#A9A19A] font-light leading-relaxed">
              <p>
                In 2019, when the foundational vision of The Calcutta Cafe took shape, Bengali cuisine outside Bengal was often constrained to a handful of popular dishes or sweet confections.
              </p>
              <p>
                Akash Santra recognized that people craving the comfort of authentic Bengali dining—the subtle herbal harmony of Shukto, the golden warmth of Chholar Dal, or the unhurried richness of Sunday Kosha Mangsho—deserved a brand grounded in authenticity and service excellence.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/[0.12] bg-[#151313]">
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
      <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-32 border-b border-white/[0.08]">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/[0.12] bg-[#151313]">
              <Image
                src={BRAND_DATA.founder.image}
                alt="Akash Santra, Founder"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top filter grayscale contrast-110"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C7AC83] block">
              Founder Profile
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F0E8]">
              Akash Santra
            </h2>
            <p className="text-xs font-mono uppercase tracking-widest text-[#C7AC83]">
              8–9 Years Customer Experience Leadership
            </p>

            <GlassPanel variant="subtle" className="p-6 border-l-2 border-l-[#C7AC83] my-6">
              <p className="font-serif text-xl sm:text-2xl text-[#F5F0E8] font-light italic leading-snug">
                &ldquo;{BRAND_DATA.founder.approvedQuote}&rdquo;
              </p>
            </GlassPanel>

            <p className="text-sm sm:text-base text-[#A9A19A] font-light leading-relaxed">
              Applying a background of customer experience rigor, Akash built The Calcutta Cafe with an insistence on operational dependability: consistent preparations, robust packaging for delivery transit, and a long-term roadmap that reaches from Bangalore to Delhi NCR and major metros.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section 03: Mission & Vision */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-32">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/[0.08] pt-16">
          <GlassPanel variant="subtle" className="p-8 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C7AC83] block">
              Our Mission
            </span>
            <p className="text-sm sm:text-base text-[#F5F0E8] font-light leading-relaxed">
              {BRAND_DATA.mission}
            </p>
          </GlassPanel>

          <GlassPanel variant="subtle" className="p-8 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C7AC83] block">
              Our Vision
            </span>
            <p className="text-sm sm:text-base text-[#F5F0E8] font-light leading-relaxed">
              {BRAND_DATA.vision}
            </p>
          </GlassPanel>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 border border-[#C7AC83] bg-[#C7AC83] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#090909] hover:bg-transparent hover:text-[#F5F0E8] transition-all duration-300"
          >
            <span>Explore The Bengal Menu</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
