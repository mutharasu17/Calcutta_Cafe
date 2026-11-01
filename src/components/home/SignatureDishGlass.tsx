import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";

export default function SignatureDishGlass() {
  return (
    <section className="relative py-28 lg:py-40 bg-[#090909] px-6 sm:px-10 lg:px-16 border-t border-white/[0.08] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header: Quiet Editorial Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#C7AC83] block mb-3">
              The Heritage Recipe
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#F5F0E8] tracking-tight leading-[1.08]">
              Traditional Kosha Mangsho.
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#A9A19A] font-light leading-relaxed">
            In Bengali gastronomy, true depth comes from patient cooking. The traditional koshano technique allows whole spices and aromatics to meld naturally into rich gravies.
          </p>
        </div>

        {/* Heroic Full-Viewport Cinematic Stage with Layered Glass Panel */}
        <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden border border-white/[0.12] bg-[#151313]">
          <Image
            src="/images/kosha-mangsho.jpg"
            alt="Traditional Slow-Braised Bengali Kosha Mangsho"
            fill
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.88] contrast-105 transition-transform duration-1000 ease-out hover:scale-105"
          />
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80" />

          {/* Floating Glass Description Panel (Nemi-Inspired Specular Glass) */}
          <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-8 sm:bottom-8 sm:max-w-md">
            <GlassPanel variant="prominent" className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bengali text-xs text-[#C7AC83]">
                  ধীর কষানোর ঐতিহ্য
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#A9A19A]/80">
                  Signature Dish
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F0E8] font-light">
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
    </section>
  );
}

