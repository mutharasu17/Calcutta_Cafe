"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function BrandStorySection() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#FFFDF8] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Imagery (Founder & Heritage Atmosphere) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full overflow-hidden bg-[#E6D8C3] border border-[#E6D8C3] shadow-lg">
              <Image
                src="/images/akash-santra-founder.jpg"
                alt="Akash Santra, Founder of The Calcutta Cafe"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center filter brightness-[0.98] contrast-[1.02]"
              />
              <div className="absolute top-4 left-4 bg-[#7A382B] text-[#FFFDF8] px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold">
                Estd. 2019 • Bangalore
              </div>
            </div>

            {/* Small Floating Stamp */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#F5EFE4] p-5 border border-[#E6D8C3] shadow-md max-w-xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A382B] font-bold block mb-1">
                Authentic Heritage Sourcing
              </span>
              <p className="text-xs text-[#29251F] font-serif">
                Cold-pressed Kachi Ghani mustard oil, heirloom Gobindobhog rice, and wild Radhuni seed.
              </p>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold mb-2">
                <Sparkles className="h-3.5 w-3.5 text-[#B68A52]" />
                <span>Our Heritage &amp; Philosophy • আমাদের গল্প</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
                Rooted in Bengal, Handcrafted in Bangalore.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed">
              Founded in 2019 by Akash Santra, The Calcutta Cafe was born from an unwavering devotion to Bengal&apos;s culinary heritage. Frustrated by generic compromises, we set out to build a culinary sanctuary where centuries-old family recipes and royal Awadhi legacies are cooked strictly to heritage standards.
            </p>

            {/* Approved Monograph Quote */}
            <div className="border-l-2 border-[#7A382B] pl-5 py-2 bg-[#F5EFE4] pr-4">
              <blockquote className="font-serif italic text-base sm:text-lg text-[#29251F] leading-snug">
                &ldquo;Bengali cooking is not an invention to be rushed. It is a slow, respectful dialogue between fire, cold-pressed mustard oil, and time.&rdquo;
              </blockquote>
              <span className="font-mono text-xs text-[#7A382B] uppercase tracking-wider block mt-2 font-semibold">
                — Akash Santra, Founder
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 bg-[#7A382B] hover:bg-[#5E2B21] text-[#FFFDF8] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
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

