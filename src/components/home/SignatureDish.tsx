import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SignatureDish() {
  return (
    <section className="relative py-28 lg:py-44 bg-[#171615] px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-20">
          <div>
            <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#B79A65] block mb-3">
              The Culmination of Technique
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#FAF9F6] tracking-tight leading-[1.08]">
              Crafted through tradition.
              <span className="block italic text-[#D8D0C3] font-normal">
                Remembered through flavour.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#D8D0C3]/80 font-light leading-relaxed">
            In Bengali gastronomy, true mastery is never rushed. Hours of patient braising allow whole spices and aromatics to marry into deep, velvety gravies.
          </p>
        </div>

        {/* Heroic Product Showcase (Apple-style Full Viewport Hero) */}
        <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden border border-white/[0.08] bg-[#292725]">
          <Image
            src="/images/kosha-mangsho.jpg"
            alt="Slow-braised Bengali Kosha Mangsho in cast-iron handi"
            fill
            sizes="100vw"
            className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
          />
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171615] via-transparent to-transparent opacity-80" />

          {/* Minimal Floating Metadata Callout */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-bengali text-sm text-[#B79A65] block mb-1">
                ধীর কষানোর ঐতিহ্য
              </span>
              <p className="font-serif text-xl sm:text-3xl text-[#FAF9F6] font-normal">
                The Slow-Cooked Kosha Mangsho
              </p>
              <p className="text-xs text-[#D8D0C3]/70 font-mono mt-1">
                Simmered in cast iron with whole cardamom, clove, and mustard oil
              </p>
            </div>

            <Link
              href="/menu?category=chicken-mutton"
              className="inline-flex items-center gap-2 border border-[#B79A65]/40 bg-[#171615]/80 backdrop-blur-md px-5 py-2.5 text-xs uppercase tracking-widest text-[#FAF9F6] hover:border-[#B79A65] transition-colors"
            >
              <span>View in Menu</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#B79A65]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

