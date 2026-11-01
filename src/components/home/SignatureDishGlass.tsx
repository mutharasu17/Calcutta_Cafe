import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";

export default function SignatureDishGlass() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-40 bg-[#090909] px-6 sm:px-10 lg:px-16 border-t border-white/[0.08] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* ──────────────────────────────────────────────────────────
            MOBILE SPECIFIC VISUAL SEQUENCE (< md)
            1. Small editorial eyebrow
            2. Large dish title
            3. Full-width cinematic food photograph (100% VISIBLE, NO OVERLAYING PANEL)
            4. Compact dish description (2-3 lines)
            5. Small, clear Explore Menu action
        ────────────────────────────────────────────────────────── */}
        <div className="block md:hidden space-y-6">
          {/* 1. Small editorial eyebrow */}
          <div className="flex items-center gap-2.5">
            <span className="h-[1px] w-6 bg-[#C7AC83]" />
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#C7AC83]">
              The Heritage Recipe • ধীর কষানোর ঐতিহ্য
            </span>
          </div>

          {/* 2. Large dish title */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F0E8] tracking-tight leading-[1.1]">
              Traditional Kosha Mangsho.
            </h2>
            <p className="font-mono text-xs text-[#C7AC83] mt-1 tracking-wider">
              Slow-Cooked Mutton Curry
            </p>
          </div>

          {/* 3. Full-width cinematic food photography container (DOMINANT VISUAL ELEMENT) */}
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/[0.12] bg-[#151313] shadow-2xl">
            <Image
              src="/images/kosha-mangsho.jpg"
              alt="Traditional Bengali Kosha Mangsho — Full Dish Presentation"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center filter brightness-[0.92] contrast-105"
            />
            {/* Minimal unobtrusive corner chip */}
            <div className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-widest text-[#C7AC83] bg-[#090909]/85 backdrop-blur-md px-2.5 py-1 border border-white/10">
              Signature Dish
            </div>
          </div>

          {/* 4. Compact dish description (below the image, never covering it) */}
          <p className="text-xs sm:text-sm text-[#A9A19A] font-light leading-relaxed">
            Slow-cooked mutton curry prepared with aromatic roasted spices, garlic, mustard oil, and traditional brown gravy with tender potatoes.
          </p>

          {/* 5. Clear, small CTA action */}
          <div className="pt-1 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[#C7AC83] tracking-wider">
              Bangalore Hub Delivery
            </span>

            <Link
              href="/menu?category=chicken-mutton"
              className="group inline-flex items-center gap-2 border border-[#C7AC83] bg-[#C7AC83] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#090909] active:bg-transparent active:text-[#F5F0E8] transition-all min-h-[44px]"
            >
              <span>Explore Menu</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            DESKTOP COMPOSITION (>= md)
            Expansive cinematic stage with non-intrusive floating glass panel
        ────────────────────────────────────────────────────────── */}
        <div className="hidden md:block">
          {/* Editorial Section Header */}
          <div className="flex items-end justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <span className="text-xs font-mono tracking-[0.26em] uppercase text-[#C7AC83] block mb-3">
                The Heritage Recipe
              </span>
              <h2 className="font-serif text-5xl lg:text-6xl font-light text-[#F5F0E8] tracking-tight leading-[1.08]">
                Traditional Kosha Mangsho.
              </h2>
            </div>

            <p className="max-w-md text-sm text-[#A9A19A] font-light leading-relaxed">
              In Bengali gastronomy, true depth comes from patient cooking. The traditional koshano technique allows whole spices and aromatics to meld naturally into rich gravies.
            </p>
          </div>

          {/* Cinematic Wide Stage */}
          <div className="relative aspect-[21/10] w-full overflow-hidden border border-white/[0.12] bg-[#151313]">
            <Image
              src="/images/kosha-mangsho.jpg"
              alt="Traditional Slow-Braised Bengali Kosha Mangsho"
              fill
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.88] contrast-105 transition-transform duration-1000 ease-out hover:scale-105"
            />
            {/* Ambient Vignette protecting corner glass panel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#090909]/70 via-transparent to-transparent opacity-70" />

            {/* Non-intrusive Specular Glass Panel placed at bottom-right corner */}
            <div className="absolute right-8 bottom-8 max-w-sm">
              <GlassPanel variant="prominent" className="p-6 lg:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bengali text-xs text-[#C7AC83]">
                    ধীর কষানোর ঐতিহ্য
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#A9A19A]/80">
                    Signature Dish
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#F5F0E8] font-light">
                    Slow-Cooked Mutton Curry
                  </h3>
                  <p className="text-xs text-[#A9A19A] font-light leading-relaxed mt-1.5">
                    Prepared with aromatic roasted spices, garlic, mustard oil, and traditional brown gravy with tender potatoes.
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.1] flex items-center justify-between">
                  <span className="font-mono text-xs text-[#C7AC83]">
                    Bangalore Hub Delivery
                  </span>

                  <Link
                    href="/menu?category=chicken-mutton"
                    className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5F0E8] hover:text-[#C7AC83] transition-colors"
                  >
                    <span>Explore Menu</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#C7AC83] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </GlassPanel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
