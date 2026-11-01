import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_DATA } from "@/data/brandInfo";

export default function FounderEditorial() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#F5EFE4] px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Founder Photographic Monograph (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden bg-[#E6D8C3] shadow-xl border border-[#E6D8C3]">
              <Image
                src={BRAND_DATA.founder.image}
                alt="Akash Santra, Founder of The Calcutta Cafe"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top filter contrast-[1.05]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#F5EFE4]/95 backdrop-blur-sm p-4 border-t border-[#E6D8C3]">
                <span className="font-serif text-lg text-[#29251F] font-semibold block">
                  Akash Santra
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#7A382B] font-medium">
                  Founder • The Calcutta Cafe Foods Pvt Ltd
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Approved Quote (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block">
                Origins & Philosophy • Estd. 2019
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
                Born from a love of Bengal.
              </h2>
            </div>

            {/* Pull Quote Box */}
            <div className="bg-[#E6D8C3]/50 p-6 sm:p-8 border-l-4 border-l-[#7A382B] border border-[#E6D8C3]">
              <blockquote className="space-y-3">
                <p className="font-serif text-xl sm:text-2xl text-[#29251F] font-normal italic leading-snug">
                  &ldquo;{BRAND_DATA.founder.approvedQuote}&rdquo;
                </p>
                <cite className="font-mono text-xs uppercase tracking-widest text-[#7A382B] font-semibold block not-italic">
                  — Akash Santra, Founder
                </cite>
              </blockquote>
            </div>

            {/* Confirmed Brand Narrative */}
            <div className="space-y-4 text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed max-w-2xl">
              <p>
                Founded in 2019, The Calcutta Cafe was born from a quiet conviction: that the authentic, layered culinary world of Bengal deserves to be experienced in its true depth across India.
              </p>
              <p>
                With 8–9 years of leadership experience in customer experience, founder Akash Santra established a disciplined cloud-kitchen model in Bangalore, bringing regional recipes, verified ingredients, and dependable quality to lovers of Bengali cuisine.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7A382B] hover:text-[#29251F] transition-colors border-b border-[#7A382B]/40 pb-1"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
