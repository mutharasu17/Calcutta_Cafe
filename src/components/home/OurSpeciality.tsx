"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

export default function OurSpeciality() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#FFFDF8] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[#B68A52]" />
              <span>Culinary Craft • রান্নার কারুকার্য</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Our Signature Specialities.
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed">
            The culinary cornerstones of Bengal&apos;s heritage—crafted with obsessive devotion to historical techniques.
          </p>
        </div>

        {/* Feature 1: The Art of Koshano (Large Editorial Feature) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#F5EFE4] border border-[#E6D8C3] p-6 sm:p-10 mb-10 shadow-sm">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#E6D8C3] border border-[#E6D8C3] shadow-inner">
              <Image
                src="/images/kosha-mangsho.jpg"
                alt="The Art of Koshano — Traditional Kosha Mangsho"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center filter brightness-[0.98] contrast-[1.03]"
              />
              <div className="absolute top-3 left-3 bg-[#FFFDF8]/95 backdrop-blur-sm px-3 py-1 border border-[#E6D8C3] text-[11px] font-mono uppercase tracking-wider text-[#7A382B] font-semibold">
                Speciality 01 • কষা মাংস
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#7A382B] font-semibold block">
              Slow-Cooking Heritage
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#29251F] font-normal leading-tight">
              The Sacred Art of Koshano.
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6357] leading-relaxed">
              &lsquo;Koshano&rsquo; is the defining technique of Bengal&apos;s meat cookery—hours of continuous sautéing over controlled gentle heat until onion pastes, ginger, and roasted spices meld into a deep velvety mahogany glaze that clings to tender mutton cuts.
            </p>

            <div className="pt-2 border-t border-[#E6D8C3] flex items-center justify-between">
              <span className="font-mono text-xs text-[#7A382B] font-semibold">
                Slow Braised • Fresh Daily in Bangalore
              </span>
              <Link
                href="/menu?category=chicken-mutton"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#29251F] hover:text-[#7A382B] transition-colors"
              >
                <span>View Details</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature 2 & 3: Two-Column Secondary Specialities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Earthen Claypot Mishti Doi */}
          <div className="bg-[#F5EFE4] border border-[#E6D8C3] p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3] border border-[#E6D8C3] mb-4">
                <Image
                  src="/images/mishti-doi.jpg"
                  alt="Earthen Claypot Mishti Doi"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-[#FFFDF8]/95 backdrop-blur-sm px-2.5 py-1 border border-[#E6D8C3] text-[10px] font-mono uppercase tracking-wider text-[#7A382B] font-semibold">
                  Speciality 02 • মিষ্টি দই
                </div>
              </div>

              <h3 className="font-serif text-2xl text-[#29251F] font-normal">
                Earthen Claypot Mishti Doi
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6357] leading-relaxed mt-2">
                Simmered milk slowly reduced until thickened and caramelized, then poured into unglazed porous earthenware handis where natural moisture absorption creates unmatched dense creaminess.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E6D8C3] flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-[#7A382B]">100% Earthen Pot Setting</span>
              <Link
                href="/menu?category=sweets-desserts"
                className="font-semibold uppercase tracking-wider text-[#7A382B] hover:text-[#29251F] flex items-center gap-1"
              >
                <span>Explore Sweets</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Golden Basanti Pulao & Gobindobhog */}
          <div className="bg-[#F5EFE4] border border-[#E6D8C3] p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3] border border-[#E6D8C3] mb-4">
                <Image
                  src="/images/hero-bengali-bhoj.jpg"
                  alt="Fragrant Gobindobhog Basanti Pulao"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-[#FFFDF8]/95 backdrop-blur-sm px-2.5 py-1 border border-[#E6D8C3] text-[10px] font-mono uppercase tracking-wider text-[#7A382B] font-semibold">
                  Speciality 03 • বাসন্তী পোলাও
                </div>
              </div>

              <h3 className="font-serif text-2xl text-[#29251F] font-normal">
                Gobindobhog Basanti Pulao
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6357] leading-relaxed mt-2">
                The royal pride of celebratory Bengali feasts—heirloom short-grain Gobindobhog rice scented with saffron strands, whole cinnamon, green cardamom, fried cashews, and golden raisins.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E6D8C3] flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-[#7A382B]">Short-Grain Gobindobhog</span>
              <Link
                href="/menu?category=rice-meals"
                className="font-semibold uppercase tracking-wider text-[#7A382B] hover:text-[#29251F] flex items-center gap-1"
              >
                <span>Explore Rice & Feasts</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

