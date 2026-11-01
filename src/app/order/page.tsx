import { OUTLETS_DATA } from "@/data/outletsData";
import { ExternalLink } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";

export const metadata = {
  title: "Order Online — Immersive Edition | The Calcutta Cafe",
  description:
    "Order authentic Bengali meals from The Calcutta Cafe via our official delivery partners on Swiggy and Zomato.",
};

export default function OrderPage() {
  const activeHub = OUTLETS_DATA.find((o) => o.status === "active");
  const plannedHubs = OUTLETS_DATA.filter((o) => o.status === "planned");

  return (
    <div className="relative pt-32 pb-28 bg-[#090909] text-[#F5F0E8] min-h-screen">
      {/* Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="mx-auto max-w-5xl">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#C7AC83] block mb-4">
            Official Delivery Channels
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[1.04]">
            Order online.
            <span className="block italic text-[#C7AC83] font-light mt-1">
              Direct to your table.
            </span>
          </h1>
          <p className="mt-8 text-base sm:text-lg text-[#A9A19A] font-light leading-relaxed max-w-2xl">
            To guarantee freshness and temperature control, cloud kitchen orders are fulfilled exclusively through verified delivery partners on Swiggy and Zomato.
          </p>
        </div>
      </section>

      {/* Hubs Presentation */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-32">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* Active Operational Hub */}
          {activeHub && (
            <GlassPanel variant="prominent" className="p-8 sm:p-12 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Operational Hub
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F0E8] font-light mt-1">
                    {activeHub.name}
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#C7AC83] uppercase tracking-widest">
                  {activeHub.city}, {activeHub.region}
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#A9A19A] font-light max-w-2xl leading-relaxed">
                {activeHub.note}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                {activeHub.swiggyUrl && (
                  <a
                    href={activeHub.swiggyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#FC8019] bg-[#FC8019] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-transparent hover:text-[#FC8019] transition-all duration-300"
                  >
                    <span>Order on Swiggy</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {activeHub.zomatoUrl && (
                  <a
                    href={activeHub.zomatoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#E23744] bg-[#E23744] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-transparent hover:text-[#E23744] transition-all duration-300"
                  >
                    <span>Order on Zomato</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </GlassPanel>
          )}

          {/* Planned Expansion Hubs */}
          <div className="space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C7AC83] block">
              Expansion Roadmap
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plannedHubs.map((hub) => (
                <GlassPanel
                  key={hub.id}
                  variant="subtle"
                  className="p-8 space-y-4"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C7AC83] block">
                    {hub.region} • Planned
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#F5F0E8]">
                    {hub.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A9A19A] font-light leading-relaxed">
                    {hub.note}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
