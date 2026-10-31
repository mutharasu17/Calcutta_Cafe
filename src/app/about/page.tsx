import Image from "next/image";
import Link from "next/link";
import { BRAND_DATA } from "@/data/brandInfo";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Story — Signature Edition | The Calcutta Cafe",
  description:
    "The journey of The Calcutta Cafe, founded by Akash Santra. Elevating Bengal's culinary heritage through quiet luxury and disciplined craft.",
};

export default function AboutPage() {
  return (
    <div className="relative pt-32 pb-28 bg-[#171615] text-[#FAF9F6]">
      {/* Editorial Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#B79A65] block mb-4">
            A Culinary Monograph
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[1.04]">
            The soul of Bengal,
            <span className="block italic text-[#D8D0C3] font-normal">
              crafted with purpose.
            </span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-[#D8D0C3]/90 font-light leading-relaxed max-w-3xl">
            Founded by Akash Santra, The Calcutta Cafe was born to represent the full depth of Bengal&apos;s culinary heritage—bringing authentic flavors and dependable food experiences to tables across India.
          </p>
        </div>
      </section>

      {/* Narrative Section 01: Genesis */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-32 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B79A65] block">
              The Genesis • 2019
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF9F6]">
              Beyond the familiar.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#D8D0C3]/80 font-light leading-relaxed">
              <p>
                In 2019, when the foundational vision of The Calcutta Cafe took shape, Bengali cuisine across metropolitan India was largely constrained to a few festive pop-ups or a predictable handful of sweet confections.
              </p>
              <p>
                Akash Santra recognized that people craving the comfort of authentic Bengali dining—the subtle herbal harmony of Shukto, the golden warmth of Chholar Dal, or the unhurried richness of Sunday Kosha Mangsho—deserved a brand grounded in authenticity and service excellence.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/[0.1] bg-[#292725]">
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
      <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-32 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/[0.1] bg-[#292725]">
              <Image
                src={BRAND_DATA.founder.image}
                alt="Akash Santra, Founder"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top filter grayscale"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B79A65] block">
              Founder Profile
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF9F6]">
              Akash Santra
            </h2>
            <p className="text-xs font-mono uppercase tracking-widest text-[#B79A65]">
              8–9 Years Customer Experience Leadership
            </p>

            <blockquote className="border-l border-[#B79A65] pl-6 py-1 my-6">
              <p className="font-serif text-xl sm:text-2xl text-[#FAF9F6] font-light italic leading-snug">
                &ldquo;{BRAND_DATA.founder.approvedQuote}&rdquo;
              </p>
            </blockquote>

            <p className="text-sm sm:text-base text-[#D8D0C3]/80 font-light leading-relaxed">
              Applying a background of customer experience rigor, Akash built The Calcutta Cafe with an insistence on operational dependability: consistent preparations, robust packaging for delivery transit, and a long-term roadmap that reaches from Bangalore to Delhi NCR and major metros.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section 03: Mission & Vision */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-32">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/[0.08] pt-16">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B79A65]">
              Our Mission
            </span>
            <p className="text-sm sm:text-base text-[#FAF9F6] font-light leading-relaxed">
              {BRAND_DATA.mission}
            </p>
          </div>

          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B79A65]">
              Our Vision
            </span>
            <p className="text-sm sm:text-base text-[#FAF9F6] font-light leading-relaxed">
              {BRAND_DATA.vision}
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 border border-[#B79A65] bg-[#B79A65] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#171615] hover:bg-transparent hover:text-[#FAF9F6] transition-all duration-300"
          >
            <span>Explore The Bengal Menu</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
