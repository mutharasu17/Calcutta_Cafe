import { OUTLETS_DATA } from "@/data/outletsData";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Order Online | The Calcutta Cafe",
  description:
    "Order authentic Bengali meals from The Calcutta Cafe via our official delivery partners on Swiggy and Zomato.",
};

export default function OrderPage() {
  const activeHub = OUTLETS_DATA.find((o) => o.status === "active");
  const plannedHubs = OUTLETS_DATA.filter((o) => o.status === "planned");

  return (
    <div className="relative pb-28 bg-[#F5EFE4] text-[#29251F] min-h-screen">
      {/* Editorial Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 border-b border-[#E6D8C3]">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block mb-3">
            Official Delivery Channels • অর্ডার অনলাইন
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.04]">
            Order online.
            <span className="block italic text-[#7A382B] font-light mt-1">
              Direct to your table.
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed max-w-2xl">
            To guarantee freshness and temperature control, cloud kitchen orders are fulfilled exclusively through verified delivery partners on Swiggy and Zomato.
          </p>
        </div>
      </section>

      {/* Hubs Presentation */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Active Operational Hub */}
          {activeHub && (
            <div className="bg-[#FFFFFF] p-8 sm:p-12 border border-[#E6D8C3] shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6D8C3]">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#34483A] font-semibold">
                    <span className="h-2 w-2 rounded-full bg-[#34483A]" />
                    Operational Hub
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#29251F] font-normal mt-1">
                    {activeHub.name}
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#7A382B] uppercase tracking-widest font-semibold">
                  {activeHub.city}, {activeHub.region}
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#6B6357] font-normal max-w-2xl leading-relaxed">
                {activeHub.note}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                {activeHub.swiggyUrl && (
                  <a
                    href={activeHub.swiggyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#7A382B] text-[#F5EFE4] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#5E2B21] transition-all shadow-sm"
                  >
                    <span>Order on Swiggy</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}

                {activeHub.zomatoUrl && (
                  <a
                    href={activeHub.zomatoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#29251F] text-[#F5EFE4] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#7A382B] transition-all shadow-sm"
                  >
                    <span>Order on Zomato</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Planned Expansion Hubs */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-[#29251F] font-normal">
              Planned Expansion Horizons
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {plannedHubs.map((hub) => (
                <div key={hub.id} className="bg-[#E6D8C3]/40 p-6 border border-[#D8C7B0] space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#7A382B] font-semibold">
                    Planned Expansion
                  </span>
                  <h4 className="font-serif text-xl text-[#29251F] font-normal">
                    {hub.name}
                  </h4>
                  <p className="text-xs text-[#6B6357] leading-relaxed">
                    {hub.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
