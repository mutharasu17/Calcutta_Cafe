import { Sparkles, Flame, Droplets, Layers, Clock, ShieldCheck } from "lucide-react";

interface CookingStage {
  number: string;
  bengali: string;
  name: string;
  element: string;
  caption: string;
  significance: string;
}

const COOKING_STAGES: CookingStage[] = [
  {
    number: "01",
    bengali: "সরষের তেলের ঝাঁঝ",
    name: "The Tempering of Mustard Oil",
    element: "Cold-Pressed Kachi Ghani",
    caption: "Heated precisely until the smoking point, transforming its aggressive pungency into a fragrant, nutty, golden warmth that defines authentic Bengal.",
    significance: "Forms the foundational fat for fish, meats, and pickles.",
  },
  {
    number: "02",
    bengali: "পাঁচফোড়নের রসায়ন",
    name: "The Panch Phoron Alchemy",
    element: "The Sacred Five-Spice Blend",
    caption: "Equal proportions of fenugreek, nigella, cumin, black mustard, and fennel seeds crackling in oil, releasing a balanced bouquet of bitter, sweet, and earthy aromas.",
    significance: "Essential for lentils, vegetarian curries, and chutneys.",
  },
  {
    number: "03",
    bengali: "শিল-নোড়ার ঐতিহ্য",
    name: "The Stone Grinding Ritual",
    element: "Shil-Nora Cold Friction",
    caption: "Whole spices, fresh turmeric, and pungent mustard seeds crushed slowly on textured black granite with chilled water, preserving essential aromatics destroyed by modern blender heat.",
    significance: "Yields silky pastes without heat friction bitterness.",
  },
  {
    number: "04",
    bengali: "ধীর কষানোর ধৈর্য",
    name: "The Koshano Discipline",
    element: "Slow Cast-Iron Braising",
    caption: "An unhurried, rhythmic slow roast where marinated meats and spices are braised for hours over low fire until the moisture evaporates and oil glistens on the dark surface.",
    significance: "The sole secret to the deep mahogany color of Kosha Mangsho.",
  },
  {
    number: "05",
    bengali: "মাটির পাত্রের পরশ",
    name: "The Breath of Terracotta",
    element: "Unglazed Earthen Handi & Bharr",
    caption: "Porous clay vessels absorb excess whey during milk fermentation, allowing microorganisms to craft dense, spoonable Mishti Doi with delicate caramelized sweetness.",
    significance: "Infuses gentle earthy minerality into traditional sweets.",
  },
];

export default function CookingArtSection() {
  return (
    <section className="relative py-24 lg:py-36 bg-[#090C12] text-[#FAF6F0] overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#8B1725]/10 blur-[180px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Top Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#172B50]/50 px-4 py-1 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-4">
            <span className="font-bengali text-xs">রন্ধন শৈলী</span>
            <span className="h-1 w-1 rounded-full bg-[#8B1725]" />
            <span className="text-white/70 font-mono text-[10px]">CHAPTER 04 • THE PREPARATION</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FAF6F0] leading-[1.08]">
            Every Flavour{" "}
            <span className="text-gold-gradient italic font-normal">
              Has a Story.
            </span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
            Behind the memorable dishes of The Calcutta Cafe lies an unyielding commitment to traditional culinary principles. There are no shortcuts in authentic Bengali cookery.
          </p>
        </div>

        {/* 5-Step Visual Documentary Film-Strip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {COOKING_STAGES.map((stage) => (
            <div
              key={stage.number}
              className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0F141F]/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-[#161D2B]/80 hover:-translate-y-1 group"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="font-mono text-sm font-bold text-[#D4AF37]">
                    SCENE {stage.number}
                  </span>
                  <span className="font-bengali text-xs text-neutral-400 group-hover:text-white transition-colors">
                    {stage.bengali}
                  </span>
                </div>

                <div className="mt-5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37]/80 block">
                    {stage.element}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mt-1 leading-snug">
                    {stage.name}
                  </h3>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-neutral-300">
                  {stage.caption}
                </p>
              </div>

              {/* Card Footer Note */}
              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-neutral-400 font-mono">
                <span className="text-[#8B1725] font-bold">Role: </span>
                <span>{stage.significance}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Purity Guarantee Callout */}
        <div className="mt-12 rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-r from-[#172B50]/40 via-[#8B1725]/20 to-[#172B50]/40 p-6 sm:p-8 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white">
                Our Non-Negotiable Kitchen Standards
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">
                Zero artificial coloring agents, zero synthetic tenderizers, pure mustard oil, and daily fresh sourcing.
              </p>
            </div>
          </div>
          <span className="shrink-0 text-xs font-mono uppercase tracking-wider text-[#D4AF37] px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-black/40">
            Certified Kitchen Quality
          </span>
        </div>
      </div>
    </section>
  );
}
