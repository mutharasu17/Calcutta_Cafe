import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SignatureDishGlass() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#E6D8C3] px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-[#D8C7B0]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Large Food Visual (7 Cols) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#F5EFE4] shadow-xl border border-[#D8C7B0]">
              <Image
                src="/images/kosha-mangsho.jpg"
                alt="Traditional Bengali Kosha Mangsho — Slow Cooked Mutton Curry"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#F5EFE4]/90 backdrop-blur-sm px-3.5 py-1.5 border border-[#D8C7B0] text-[11px] font-mono uppercase tracking-widest text-[#7A382B] font-medium">
                Signature Repertoire
              </div>
            </div>
          </div>

          {/* Right: Concise Editorial Monograph (5 Cols) */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block">
                The Heritage Recipe • ধীর কষানোর ঐতিহ্য
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
                Traditional Kosha Mangsho.
              </h2>
              <p className="font-mono text-xs uppercase tracking-wider text-[#6B6357]">
                Category: Chicken & Mutton
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#29251F]/80 font-normal leading-relaxed">
              In Bengali gastronomy, true depth comes from patient cooking. The traditional <em>koshano</em> technique allows whole spices, mustard oil, garlic, and aromatics to reduce gently into rich, velvety gravies with tender potatoes.
            </p>

            <div className="pt-2 border-t border-[#D8C7B0] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#7A382B] font-semibold block">
                  Bangalore Hub
                </span>
                <span className="text-[11px] text-[#6B6357]">
                  Fresh Daily Preparation
                </span>
              </div>

              <Link
                href="/menu?category=chicken-mutton"
                className="group inline-flex items-center gap-2 bg-[#7A382B] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F5EFE4] hover:bg-[#5E2B21] transition-all shadow-sm"
              >
                <span>Explore Menu</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
