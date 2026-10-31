import { BRAND_DATA } from "@/data/brandInfo";
import { Compass, Target, Sparkles } from "lucide-react";

export default function MissionVisionSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#080C14] overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#8B1E1E]/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Mission Editorial Card */}
          <div className="relative rounded-3xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#141B26] via-[#101620] to-[#181116] p-8 sm:p-12 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#161D2B] px-3.5 py-1 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-6">
                <Target className="h-4 w-4 text-[#D4AF37]" />
                <span>Our Mission</span>
                <span className="text-[10px] text-neutral-400 font-normal">আমাদের ব্রত</span>
              </div>

              <h3
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-serif, serif)" }}
              >
                Making Authentic Bengali Cuisine{" "}
                <span className="text-gold-gradient italic font-normal">
                  Accessible Across India.
                </span>
              </h3>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-neutral-300">
                {BRAND_DATA.mission}
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-4 text-xs text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-[#8B1E1E]" />
              <span>Traditional recipes & uncompromised pure ingredients</span>
            </div>
          </div>

          {/* Vision Editorial Card */}
          <div className="relative rounded-3xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#181116] via-[#101620] to-[#141B26] p-8 sm:p-12 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8B1E1E]/40 bg-[#1A1115] px-3.5 py-1 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-6">
                <Compass className="h-4 w-4 text-[#D4AF37]" />
                <span>Our Vision</span>
                <span className="text-[10px] text-neutral-400 font-normal">ভবিষ্যতের রূপরেখা</span>
              </div>

              <h3
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-serif, serif)" }}
              >
                Building a Nationally Recognized{" "}
                <span className="text-red-gradient italic font-normal">
                  Culinary Heritage Brand.
                </span>
              </h3>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-neutral-300">
                {BRAND_DATA.vision}
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-4 text-xs text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
              <span>Multi-city cloud kitchens bringing Bengal to every neighborhood</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
