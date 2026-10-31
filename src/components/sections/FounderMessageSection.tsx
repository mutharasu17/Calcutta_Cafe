import Image from "next/image";
import { BRAND_DATA } from "@/data/brandInfo";
import { Quote } from "lucide-react";

export default function FounderMessageSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0E17] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#121824] to-[#0A0E17] p-8 sm:p-14 lg:p-16 shadow-2xl">
          {/* Subtle Watermark Quote Icon */}
          <div className="absolute top-8 right-8 text-[#D4AF37]/10 pointer-events-none">
            <Quote className="h-28 w-28 sm:h-36 sm:w-36 rotate-180" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Founder Avatar with Gold Ring Accent */}
            <div className="relative h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0 rounded-full border-2 border-[#D4AF37] p-1.5 shadow-2xl shadow-black/80">
              <div className="relative h-full w-full rounded-full overflow-hidden">
                <Image
                  src={BRAND_DATA.founder.image}
                  alt="Akash Santra, Founder, The Calcutta Cafe"
                  fill
                  sizes="160px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Quote Narrative */}
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                A Message from Our Founder
              </span>

              <blockquote className="mt-4 font-serif text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed text-[#FAF6F0] italic">
                &ldquo;{BRAND_DATA.founder.message}&rdquo;
              </blockquote>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2">
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    {BRAND_DATA.founder.name}
                  </h4>
                  <p className="text-xs text-[#D4AF37]">
                    {BRAND_DATA.founder.role}
                  </p>
                </div>
                <div className="text-[11px] text-neutral-400">
                  Customer Experience Leadership • Estd. 2019
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
