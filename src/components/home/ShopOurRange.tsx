"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menuData";

export default function ShopOurRange() {
  const displayCategories = MENU_CATEGORIES.filter((c) => c.id !== "drinks");

  return (
    <section className="relative py-16 sm:py-24 bg-[#FFFDF8] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block mb-2">
              Category Repertoire • রসনার সম্ভার
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Shop Our Range.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed max-w-xl">
              Organized by course and culinary discipline—from royal Awadhi heritage to river fish, street savouries, and earthen confections.
            </p>
          </div>

          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A382B] hover:text-[#29251F] transition-colors border-b border-[#7A382B]/30 pb-1 self-start md:self-auto"
          >
            <span>View All Courses</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Cards (Horizontal Swipe on Mobile, 3-Col Grid on Desktop) */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {displayCategories.map((category) => {
            const itemCount = MENU_ITEMS.filter((i) => i.category === category.id).length;

            return (
              <Link
                key={category.id}
                href={`/menu?category=${category.id}`}
                className="group relative flex-shrink-0 w-[82vw] sm:w-auto bg-[#F5EFE4] border border-[#E6D8C3] overflow-hidden flex flex-col justify-between shadow-sm hover:border-[#7A382B] hover:shadow-md transition-all duration-300"
              >
                {/* Visual Category Photography */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E6D8C3]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Bengali Subtitle Badge */}
                  <div className="absolute top-3 left-3 bg-[#FFFDF8]/95 backdrop-blur-sm px-3 py-1 border border-[#E6D8C3] text-[11px] font-bengali text-[#7A382B] font-medium">
                    {category.bengaliSubtitle}
                  </div>

                  {/* Preparation Count */}
                  <div className="absolute bottom-3 right-3 bg-[#29251F]/85 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#FFFDF8]">
                    {itemCount} Delicacies
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 sm:p-6 space-y-2.5 bg-[#FFFDF8] flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[#29251F] font-normal group-hover:text-[#7A382B] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6D8C3]/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#7A382B]">
                    <span>Explore Collection</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

