import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_DATA } from "@/data/brandInfo";
import GlassPanel from "../ui/GlassPanel";

export default function FounderEditorial() {
  return (
    <section className="relative py-28 lg:py-40 bg-[#090909] px-6 sm:px-10 lg:px-16 border-t border-white/[0.08] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Founder Photographic Monograph (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden border border-white/[0.12] bg-[#151313]">
              <Image
                src={BRAND_DATA.founder.image}
                alt="Akash Santra, Founder of The Calcutta Cafe"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top filter grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-70" />

              <div className="absolute bottom-6 left-6 right-6 border-t border-white/20 pt-4">
                <span className="font-serif text-lg text-[#F5F0E8] block">Akash Santra</span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C7AC83]">
                  Founder • The Calcutta Cafe Foods Pvt Ltd
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Floating Glass Quote (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#C7AC83] block mb-3">
                Origins & Philosophy
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#F5F0E8] tracking-tight leading-[1.08]">
                Born from a love of Bengal.
              </h2>
            </div>

            {/* Floating Glass Quotation Panel */}
            <GlassPanel variant="subtle" className="p-6 sm:p-8 border-l-2 border-l-[#C7AC83]">
              <blockquote className="space-y-2">
                <p className="font-serif text-xl sm:text-2xl text-[#F5F0E8] font-light italic leading-snug">
                  &ldquo;{BRAND_DATA.founder.approvedQuote}&rdquo;
                </p>
                <cite className="font-mono text-[10px] uppercase tracking-widest text-[#C7AC83] block not-italic">
                  — Akash Santra, Founder
                </cite>
              </blockquote>
            </GlassPanel>

            {/* Confirmed Brand Narrative */}
            <div className="space-y-4 text-sm sm:text-base text-[#A9A19A] font-light leading-relaxed max-w-2xl">
              <p>
                Founded in 2019, The Calcutta Cafe was born from a quiet conviction: that the authentic, layered culinary world of Bengal deserves to be experienced in its true depth across India.
              </p>
              <p>
                With 8–9 years of leadership experience in customer experience, founder Akash Santra established a disciplined cloud-kitchen model in Bangalore, bringing regional recipes, verified ingredients, and reliable quality to lovers of Bengali cuisine.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C7AC83] hover:text-[#F5F0E8] transition-colors border-b border-[#C7AC83]/40 pb-1"
              >
                <span>Read the Founder&apos;s Story</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

