import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function SoulOfBengalSection() {
  const mealRitual = [
    {
      step: "01",
      bengali: "তেতো ও শুক্তো",
      title: "Teto • The Bitter Awakening",
      desc: "Bengali feasts never begin with sweetness or grease. They open with Shukto—a bitter, herbal herbal restorative of bitter gourd, green plantain, and radhuni to awaken the palate.",
    },
    {
      step: "02",
      bengali: "ডাল ও লুচি",
      title: "Dal & Luchi • The Golden Warmth",
      desc: "Puffed, snow-white luchis accompanied by fragrant Chholar Dal simmered with toasted coconut shavings, whole cinnamon, and aromatic hing.",
    },
    {
      step: "03",
      bengali: "মাছের ঝোল ও ঝাল",
      title: "Macher Jhol • The River Sanctuary",
      desc: "Monsoon Hilsa and tender Bhetki gently poached in freshly ground yellow and black mustard paste, slit green chillies, and raw mustard oil.",
    },
    {
      step: "04",
      bengali: "কষা মাংস",
      title: "Kosha • The Unhurried Simmer",
      desc: "Tender goat meat slow-braised for hours in cast iron with caramelized onions and whole spices until the gravy darkens to rich mahogany.",
    },
    {
      step: "05",
      bengali: "মাটির মিষ্টি দই",
      title: "Mishti • The Earthen Confection",
      desc: "Slow-reduced milk caramelized with date palm jaggery and fermented inside porous terracotta clay pots that absorb excess whey for velvety sweetness.",
    },
  ];

  return (
    <section className="relative py-24 lg:py-36 bg-[#090C12] text-[#FAF6F0] overflow-hidden border-t border-white/5">
      {/* Chapter 02 Header Watermark & Ambient Radial Lighting */}
      <div className="absolute top-10 right-8 text-[120px] lg:text-[200px] font-bengali font-bold text-white/[0.02] select-none pointer-events-none leading-none">
        রসনা
      </div>
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-[#8B1725]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Top Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#172B50]/40 px-4 py-1 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-4">
            <span className="font-bengali text-xs">বাংলার আত্মা</span>
            <span className="h-1 w-1 rounded-full bg-[#8B1725]" />
            <span className="text-white/70 font-mono text-[10px]">CHAPTER 02 • THE IDENTITY</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FAF6F0] leading-[1.08]">
            Bengal is more than a place.{" "}
            <span className="block text-gold-gradient italic font-normal">
              It is an ancient world of flavours.
            </span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
            In Bengal, food is not consumed merely for sustenance; it is a sacred multi-movement symphony. Every meal respects the rhythm of rivers, the medicinal balance of spices, and centuries of inherited domestic artistry.
          </p>
        </div>

        {/* Asymmetrical Documentary Visual Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Main Large Visual Canvas (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/images/kolkata-heritage-story.jpg"
                alt="Heritage architectural streetscape and soul of Kolkata, Bengal"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090C12]/60 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block rounded-md bg-[#8B1725] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white mb-2">
                  Heritage Monograph
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                  From the colonial riverfronts of the Hooghly to the domestic kitchens of ancestral Bengal.
                </p>
              </div>
            </div>

            {/* Editorial Narrative Callout Box Below Main Photo */}
            <div className="mt-8 rounded-2xl border border-[#D4AF37]/20 bg-[#172B50]/30 p-8 backdrop-blur-md">
              <p className="font-serif text-lg sm:text-xl text-[#F5F0E7] italic leading-relaxed">
                &ldquo;To reduce Bengali food to merely fish and roshogolla is to miss the entire architecture of its genius: the bitter notes, the pungency of stone-ground mustard, the subtle sweetness of Gobindobhog rice, and the patient braising of meats.&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
                <span className="font-mono uppercase tracking-widest text-[#D4AF37]">The Calcutta Cafe Philosophy</span>
                <Link href="/about" className="inline-flex items-center gap-1.5 text-white hover:text-[#D4AF37] transition-colors">
                  <span>Explore Our Story</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: The 5-Stage Bhoj Ritual Sequence (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="border-b border-white/10 pb-4 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                The Traditional Dining Ritual
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                How a Bengali Feast Unfolds
              </h3>
            </div>

            <div className="space-y-4">
              {mealRitual.map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#D4AF37]/30 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[11px] font-bold text-[#D4AF37] tracking-wider">
                        PHASE {item.step}
                      </span>
                      <h4 className="font-serif text-base font-bold text-white mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                    <span className="font-bengali text-xs text-[#D4AF37]/80">
                      {item.bengali}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
