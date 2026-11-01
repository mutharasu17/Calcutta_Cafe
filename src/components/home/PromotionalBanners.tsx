"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PromotionalBanners() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#F5EFE4] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block mb-2">
            Curated Collections • বিশেষ সংগ্রহ
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
            Taste of Bengal Collections.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed">
            Curated dining experiences highlighting Bengal&apos;s most celebrated heritage culinary traditions.
          </p>
        </div>

        {/* 2 Large Campaign Banners Grid (Anand Sweets Inspired) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Collection 1: River Fish Repertoire */}
          <div className="group relative overflow-hidden bg-[#FFFDF8] border border-[#E6D8C3] shadow-md flex flex-col justify-between">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3]">
              <Image
                src="/images/shorshe-ilish.jpg"
                alt="The Royal River Fish Repertoire"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="absolute top-4 left-4 bg-[#7A382B] text-[#FFFDF8] px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold">
                Signature Collection
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-[#FFFDF8]">
                <span className="font-bengali text-xs text-[#E6D8C3] block mb-1">
                  মাছ ও সামুদ্রিক স্বাদ • পদ্মার ইলিশ
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight">
                  The Royal River Fish Repertoire
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 bg-[#FFFDF8] flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#6B6357] leading-relaxed">
                Hilsa simmered in pungent stone-ground mustard paste, Kolkata Bhetki steamed in charred banana leaves, and jumbo prawns braised in fresh coconut cream.
              </p>

              <div className="pt-2">
                <Link
                  href="/menu?category=fish-seafood"
                  className="group/btn inline-flex items-center gap-2 bg-[#7A382B] text-[#FFFDF8] px-5 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-[#5E2B21] transition-all shadow-sm"
                >
                  <span>Explore River Seafood</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Collection 2: Sunday Kosha Mangsho Ritual */}
          <div className="group relative overflow-hidden bg-[#FFFDF8] border border-[#E6D8C3] shadow-md flex flex-col justify-between">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3]">
              <Image
                src="/images/kosha-mangsho.jpg"
                alt="Sunday Kosha Mangsho Ritual"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="absolute top-4 left-4 bg-[#7A382B] text-[#FFFDF8] px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold">
                Heritage Feast
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-[#FFFDF8]">
                <span className="font-bengali text-xs text-[#E6D8C3] block mb-1">
                  রবিবারের কষা মাংস • পারিবারিক ঐতিহ্য
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight">
                  The Sunday Kosha Mangsho Ritual
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 bg-[#FFFDF8] flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#6B6357] leading-relaxed">
                Slow-braised goat mutton cooked in heavy iron handis until the rich brown gravy clings velvety to the meat, accompanied by fragrant Basanti Pulao.
              </p>

              <div className="pt-2">
                <Link
                  href="/menu?category=chicken-mutton"
                  className="group/btn inline-flex items-center gap-2 bg-[#7A382B] text-[#FFFDF8] px-5 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-[#5E2B21] transition-all shadow-sm"
                >
                  <span>Explore Meat Delicacies</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

