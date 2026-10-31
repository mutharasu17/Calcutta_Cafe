import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_DATA } from "@/data/brandInfo";

export default function BrandStory() {
  return (
    <section className="relative py-28 lg:py-44 bg-[#171615] px-6 sm:px-10 lg:px-16 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Founder Photographic Monograph (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden border border-white/[0.1] bg-[#292725]">
              <Image
                src={BRAND_DATA.founder.image}
                alt="Akash Santra, Founder of The Calcutta Cafe"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top filter grayscale contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171615] via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-6 left-6 right-6 border-t border-white/20 pt-4">
                <span className="font-serif text-lg text-[#FAF9F6] block">Akash Santra</span>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#B79A65]">
                  Founder • The Calcutta Cafe Foods Pvt Ltd
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#B79A65] block mb-3">
                The Origins & Ambition
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#FAF9F6] tracking-tight leading-[1.08]">
                Born from a love
                <span className="block italic text-[#D8D0C3] font-normal">
                  of Bengal.
                </span>
              </h2>
            </div>

            {/* Approved Verbatim Founder Statement */}
            <blockquote className="border-l border-[#B79A65] pl-6 py-1">
              <p className="font-serif text-xl sm:text-2xl text-[#FAF9F6] font-light italic leading-snug">
                &ldquo;{BRAND_DATA.founder.approvedQuote}&rdquo;
              </p>
            </blockquote>

            {/* Confirmed Brand Narrative */}
            <div className="space-y-4 text-sm sm:text-base text-[#D8D0C3]/80 font-light leading-relaxed max-w-2xl">
              <p>
                The idea for The Calcutta Cafe began in 2019. Founder Akash Santra recognized that outside Bengal, the region&apos;s rich culinary world was often reduced to a few familiar clichés.
              </p>
              <p>
                With 8–9 years of leadership experience in the customer experience industry, Akash applied a relentless focus on service quality and kitchen consistency. Starting in Bangalore with a cloud-kitchen-led model, the mission is simple: to make the full, authentic diversity of Bengali cuisine accessible to people across India.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B79A65] hover:text-[#FAF9F6] transition-colors border-b border-[#B79A65]/40 pb-1"
              >
                <span>Read the Complete Story</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
