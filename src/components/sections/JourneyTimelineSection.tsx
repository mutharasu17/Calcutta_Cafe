import Link from "next/link";
import { MapPin, Navigation, ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";

interface JourneyStage {
  id: string;
  year: string;
  bengali: string;
  stageName: string;
  city: string;
  role: string;
  status: "active" | "completed" | "expansion";
  description: string;
  keyDetails: string[];
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "origin",
    year: "CULTURAL ROOTS",
    bengali: "উৎস",
    stageName: "The Heritage of Bengal",
    city: "Kolkata & The Delta",
    role: "Culinary Inspiration & Recipe Heritage",
    status: "completed",
    description: "Centuries of domestic cooking, ancestral spice traditions, and the cultural memory of Bengal's waterways, where the idea of taking these flavours beyond state boundaries first took shape.",
    keyDetails: [
      "Inherited spice-balancing principles",
      "Ayurvedic rhythm of bitter-to-sweet dining",
      "Authentic mustard and radhuni recipes",
    ],
  },
  {
    id: "inception",
    year: "2019",
    bengali: "সূচনা",
    stageName: "The Brand Idea",
    city: "Bangalore",
    role: "Conception by Akash Santra",
    status: "completed",
    description: "Drawing upon 8–9 years of customer experience leadership, Akash Santra conceived The Calcutta Cafe to solve a widespread problem: the absence of an authentic, nationally scalable Bengali food brand.",
    keyDetails: [
      "Formulation of strict kitchen standards",
      "Cloud-kitchen business architecture",
      "Purity of ingredients without shortcuts",
    ],
  },
  {
    id: "bangalore-launch",
    year: "ACTIVE HUB",
    bengali: "সক্রিয় রান্নাঘর",
    stageName: "Bangalore Operations",
    city: "Bangalore Central Hub",
    role: "Confirmed Active Cloud Kitchen",
    status: "active",
    description: "Delivering daily across central Bangalore through verified Swiggy and Zomato networks. Perfecting packaging integrity, consistent cooking times, and customer happiness.",
    keyDetails: [
      "Confirmed active kitchen operations",
      "Serving Koramangala, Indiranagar, HSR, Domlur",
      "Order direct via Swiggy and Zomato",
    ],
  },
  {
    id: "delhi-ncr",
    year: "UPCOMING",
    bengali: "ভবিষ্যতের লক্ষ্য",
    stageName: "Delhi NCR Expansion",
    city: "Delhi NCR & Noida",
    role: "Planned Expansion Hub",
    status: "expansion",
    description: "Our next planned frontier in bringing the authentic taste of Bengal to northern India. Subject to operational planning and ingredient supply chain readiness.",
    keyDetails: [
      "Targeted for high-density food corridors",
      "Ingredient logistics and consistency standards",
      "Notification waitlist currently open",
    ],
  },
];

export default function JourneyTimelineSection() {
  return (
    <section id="journey" className="relative py-24 lg:py-36 bg-[#090C12] text-[#FAF6F0] overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#172B50]/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#8B1725]/15 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Top Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#172B50]/50 px-4 py-1 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-4">
            <span className="font-bengali text-xs">আমাদের যাত্রা</span>
            <span className="h-1 w-1 rounded-full bg-[#8B1725]" />
            <span className="text-white/70 font-mono text-[10px]">CHAPTER 05 • THE GEOGRAPHY</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FAF6F0] leading-[1.08]">
            The Journey from Bengal{" "}
            <span className="block text-gold-gradient italic font-normal">
              to Bangalore and Beyond.
            </span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
            The story of The Calcutta Cafe connects centuries-old culinary roots in Bengal with a modern cloud-kitchen model, beginning in Bangalore with the ambition of reaching cities across India.
          </p>
        </div>

        {/* Illustrated Route Map Banner */}
        <div className="mb-14 rounded-3xl border border-white/10 bg-[#0F141F]/70 p-6 sm:p-10 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block">
                Geographical Migration Corridor
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Kolkata ➔ Bangalore ➔ Delhi NCR
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs text-emerald-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Bangalore Hub: Operational
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs text-amber-400 font-mono">
                Delhi NCR: Planned
              </span>
            </div>
          </div>

          {/* Graphical Route Visual */}
          <div className="relative pt-10 pb-6 hidden md:block">
            <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-[#D4AF37] via-[#8B1725] to-[#D4AF37]/40 -translate-y-1/2" />
            <div className="grid grid-cols-4 gap-4 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="h-6 w-6 rounded-full bg-[#D4AF37] border-4 border-[#090C12] shadow-lg mb-3" />
                <span className="font-mono text-xs text-[#D4AF37] font-bold">Kolkata</span>
                <span className="text-[11px] text-neutral-400">Culinary Roots</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-6 w-6 rounded-full bg-[#D4AF37] border-4 border-[#090C12] shadow-lg mb-3" />
                <span className="font-mono text-xs text-[#D4AF37] font-bold">2019 Inception</span>
                <span className="text-[11px] text-neutral-400">Founder&apos;s Vision</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-7 w-7 rounded-full bg-emerald-500 border-4 border-[#090C12] shadow-lg shadow-emerald-500/40 mb-3 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </div>
                <span className="font-mono text-xs text-emerald-400 font-bold">Bangalore Hub</span>
                <span className="text-[11px] text-emerald-300">Live on Swiggy & Zomato</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-6 w-6 rounded-full bg-amber-500/40 border-4 border-[#090C12] shadow-lg mb-3" />
                <span className="font-mono text-xs text-amber-400 font-bold">Delhi NCR</span>
                <span className="text-[11px] text-neutral-400">Next Planned Region</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Journey Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOURNEY_STAGES.map((stage) => {
            const isActive = stage.status === "active";
            const isExpansion = stage.status === "expansion";

            return (
              <div
                key={stage.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 ${
                  isActive
                    ? "border-emerald-500/40 bg-[#162520]/60 shadow-xl shadow-emerald-950/20"
                    : isExpansion
                    ? "border-amber-500/30 bg-[#251f16]/40"
                    : "border-white/10 bg-[#0F141F]/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span
                      className={`font-mono text-xs font-bold tracking-wider ${
                        isActive
                          ? "text-emerald-400"
                          : isExpansion
                          ? "text-amber-400"
                          : "text-[#D4AF37]"
                      }`}
                    >
                      {stage.year}
                    </span>
                    <span className="font-bengali text-xs text-neutral-400">
                      {stage.bengali}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block">
                      {stage.city}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                      {stage.stageName}
                    </h3>
                  </div>

                  <p className="mt-3 text-xs text-neutral-300 leading-relaxed">
                    {stage.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-white/5 pt-3">
                    {stage.keyDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-neutral-400">
                        <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  {isActive ? (
                    <Link
                      href="/order"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                    >
                      <span>Order in Bangalore</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : isExpansion ? (
                    <Link
                      href="/order"
                      className="inline-flex items-center gap-1.5 text-xs text-amber-400/80 hover:text-amber-300"
                    >
                      <span>Join NCR Waitlist</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : (
                    <span className="text-[11px] text-neutral-400 font-mono">
                      Completed Heritage Phase
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
