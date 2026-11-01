import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menuData";

export default function AnandCategoryShowcase() {
  const displayCategories = MENU_CATEGORIES.filter((c) => c.id !== "drinks");

  return (
    <section className="relative py-20 sm:py-28 bg-[#FFFDF8] px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block mb-2">
              Visual Merchandising • রসনার সম্ভার
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Explore Our Repertoire.
            </h2>
          </div>

          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A382B] hover:text-[#29251F] transition-colors border-b border-[#7A382B]/30 pb-1 self-start md:self-auto"
          >
            <span>View Complete Menu</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Anand-Inspired Category Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCategories.map((category) => {
            const count = MENU_ITEMS.filter((i) => i.category === category.id).length;

            return (
              <Link
                key={category.id}
                href={`/menu?category=${category.id}`}
                className="group relative bg-[#F5EFE4] border border-[#E6D8C3] overflow-hidden flex flex-col justify-between shadow-sm hover:border-[#7A382B] transition-all duration-300"
              >
                {/* Category Photography */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E6D8C3]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Bengali Badge */}
                  <div className="absolute top-3 left-3 bg-[#FFFDF8]/95 backdrop-blur-sm px-3 py-1 border border-[#E6D8C3] text-[11px] font-bengali text-[#7A382B] font-medium">
                    {category.bengaliSubtitle}
                  </div>

                  {/* Item Count Chip */}
                  <div className="absolute bottom-3 right-3 bg-[#29251F]/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#FFFDF8]">
                    {count} Selections
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 space-y-3 bg-[#FFFDF8] flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[#29251F] font-normal group-hover:text-[#7A382B] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed mt-1.5 line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6D8C3]/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#7A382B]">
                    <span>Browse Collection</span>
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

