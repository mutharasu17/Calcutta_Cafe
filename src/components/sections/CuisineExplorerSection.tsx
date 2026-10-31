import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";
import { MENU_CATEGORIES } from "@/data/menuData";
import { ArrowRight } from "lucide-react";

export default function CuisineExplorerSection() {
  // Only display the 6 primary requested categories in the explorer grid
  const primaryCategories = MENU_CATEGORIES.filter((c) => c.id !== "drinks");

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0E17]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore Culinary Horizons"
          bengaliEyebrow="রকমারি পদ"
          title="The Spectrum of"
          highlightedWord="Bengal's Kitchen"
          description="Every region and family in Bengal contributes a distinct palate. Explore our signature categories, each curated with authentic cooking traditions and pure ingredients."
        />

        {/* 6-Card Category Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {primaryCategories.map((category) => (
            <div
              key={category.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#121620] shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#8B1E1E]/20"
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-black/30 to-transparent" />

                {/* Bengali Subtitle Pill in top right */}
                <div className="absolute top-4 right-4 rounded-full glass-panel px-3 py-1 text-[11px] font-medium text-[#D4AF37]">
                  {category.bengaliSubtitle}
                </div>
              </div>

              {/* Content Block */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <h3
                    className="font-serif text-xl sm:text-2xl font-bold text-white transition-colors duration-200 group-hover:text-[#D4AF37]"
                    style={{ fontFamily: "var(--font-serif, serif)" }}
                  >
                    {category.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-neutral-400">
                    {category.description}
                  </p>
                </div>

                {/* Explore CTA Button */}
                <div className="mt-6 pt-5 border-t border-white/5">
                  <Link
                    href={`/menu?category=${category.id}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] transition-all duration-200 group-hover:gap-3 group-hover:text-white"
                  >
                    <span>Discover Dishes</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Menu Overview Button */}
        <div className="mt-16 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/40 bg-[#141A26] px-8 py-3.5 text-sm font-semibold tracking-wider text-[#FAF6F0] transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#8B1E1E] hover:scale-105"
          >
            <span>View Full Menu & Curated Collections</span>
            <ArrowRight className="h-4 w-4 text-[#D4AF37]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
