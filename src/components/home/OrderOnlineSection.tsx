import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function OrderOnlineSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#E6D8C3] px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-[#D8C7B0]">
      <div className="mx-auto max-w-5xl text-center space-y-8">
        <div>
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block mb-2">
            Bangalore Central Hub Delivery
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
            Order to Your Doorstep.
          </h2>
        </div>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed">
          Our dishes are prepared fresh daily in our Bangalore central cloud kitchen and delivered through verified ordering partners.
        </p>

        {/* Dual Ordering Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 max-w-2xl mx-auto text-left">
          {/* Swiggy Card */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#D8C7B0] shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif text-2xl font-normal text-[#29251F]">Swiggy</span>
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#34483A] bg-[#34483A]/10">
                  Live in Bangalore
                </span>
              </div>
              <p className="text-xs text-[#6B6357] leading-relaxed">
                Fast doorstep fulfillment across Bangalore delivery zones via verified Swiggy delivery network.
              </p>
            </div>

            <a
              href="https://www.swiggy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between bg-[#7A382B] text-[#F5EFE4] px-5 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-[#5E2B21] transition-colors"
            >
              <span>Order on Swiggy</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Zomato Card */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#D8C7B0] shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif text-2xl font-normal text-[#29251F]">Zomato</span>
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#34483A] bg-[#34483A]/10">
                  Live in Bangalore
                </span>
              </div>
              <p className="text-xs text-[#6B6357] leading-relaxed">
                Explore full menu, real-time tracking, and exclusive combos on the official Zomato dining platform.
              </p>
            </div>

            <a
              href="https://www.zomato.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between bg-[#29251F] text-[#F5EFE4] px-5 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-[#7A382B] transition-colors"
            >
              <span>Order on Zomato</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <p className="text-[11px] font-mono text-[#6B6357] uppercase tracking-wider pt-2">
          Note: You will be directed to external partner apps for ordering and delivery
        </p>
      </div>
    </section>
  );
}

