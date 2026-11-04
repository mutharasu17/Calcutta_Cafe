import type { Metadata } from "next";
import { OUTLETS_DATA } from "@/data/outletsData";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import OrderLinks from "./OrderLinks";

export const metadata: Metadata = {
  title: "Order Online — Delivery via Swiggy & Zomato | The Calcutta Cafe",
  description:
    "Order authentic Bengali meals from The Calcutta Cafe via our official delivery partners on Swiggy and Zomato. Doorstep delivery across Bangalore cloud kitchens.",
  alternates: {
    canonical: "/order",
  },
  openGraph: {
    title: "Order Online — The Calcutta Cafe",
    description:
      "Order authentic Bengali meals fulfilled exclusively through official delivery partners on Swiggy and Zomato.",
    url: "https://thecalcuttacafe.com/order",
    images: [
      {
        url: "/images/hero-bengali-bhoj.jpg",
        width: 1200,
        height: 675,
        alt: "Order The Calcutta Cafe on Swiggy and Zomato",
      },
    ],
  },
};

export default function OrderPage() {
  const activeHub = OUTLETS_DATA.find((o) => o.status === "active");
  const plannedHubs = OUTLETS_DATA.filter((o) => o.status === "planned");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://thecalcuttacafe.com" },
          { name: "Order Online", url: "https://thecalcuttacafe.com/order" },
        ]}
      />
      <div className="relative pb-28 bg-[#F5EFE4] text-[#29251F] min-h-screen">
        {/* Editorial Header */}
        <section className="px-4 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-8 sm:pb-20 border-b border-[#E6D8C3]">
          <div className="mx-auto max-w-5xl">
            <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#5B1B8A] font-semibold block mb-3">
              Official Delivery Channels • অর্ডার অনলাইন
            </span>
            <h1 className="font-serif text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.08] sm:leading-[1.04]">
              Order online.
              <span className="block italic text-[#5B1B8A] font-light mt-1">
                Direct to your table.
              </span>
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed max-w-2xl">
              To guarantee freshness and temperature control, cloud kitchen orders are fulfilled exclusively through verified delivery partners on Swiggy and Zomato.
            </p>
          </div>
        </section>

        {/* Hubs Presentation */}
        <section className="px-4 sm:px-10 lg:px-16 py-10 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-5xl space-y-8 sm:space-y-12">
            {/* Active Operational Hub */}
            {activeHub && (
              <div className="bg-[#FFFFFF] p-6 sm:p-12 border border-[#E6D8C3] shadow-md space-y-6">
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
                  <span className="text-xs font-mono text-[#5B1B8A] uppercase tracking-widest font-semibold">
                    {activeHub.city}, {activeHub.region}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#6B6357] font-normal max-w-2xl leading-relaxed">
                  {activeHub.note}
                </p>

                <OrderLinks
                  swiggyUrl={activeHub.swiggyUrl}
                  zomatoUrl={activeHub.zomatoUrl}
                  hubName={activeHub.name}
                />
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
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B1B8A] font-semibold">
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
    </>
  );
}
