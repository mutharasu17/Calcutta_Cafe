import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { OUTLETS_DATA } from "@/data/outletsData";
import {
  ShoppingBag,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Order Online | The Calcutta Cafe — Swiggy & Zomato",
  description:
    "Order authentic Bengali meals online from The Calcutta Cafe via our official delivery partners on Swiggy and Zomato.",
};

export default function OrderPage() {
  return (
    <div className="relative pt-28 pb-24 bg-[#0A0E17]">
      {/* Editorial Header */}
      <section className="relative py-16 border-b border-white/10 bg-[#080C14]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#161D2B]/90 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-5">
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Official Delivery Channels</span>
          </div>

          <h1
            className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FAF6F0]"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            Order Online via{" "}
            <span className="text-gold-gradient italic font-normal">
              Swiggy & Zomato
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base text-neutral-300">
            To guarantee freshness and rapid delivery, our cloud kitchen orders are fulfilled
            exclusively through our verified food delivery partners. Select your nearest outlet
            below to order.
          </p>

          {/* Delivery Policy Note */}
          <div className="mt-6 max-w-xl mx-auto rounded-2xl border border-[#D4AF37]/30 bg-[#151D2A] p-4 text-xs text-neutral-300 flex items-start gap-3 text-left">
            <ShieldCheck className="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Direct Partner Ordering:</strong> The Calcutta Cafe
              operates cloud kitchen hubs and does not accept direct website payments. All orders,
              live menus, and transactions are processed safely through Swiggy and Zomato.
            </div>
          </div>
        </div>
      </section>

      {/* Outlets List Container */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10">
          {OUTLETS_DATA.map((outlet) => {
            const isActive = outlet.status === "active";

            return (
              <div
                key={outlet.id}
                className={`relative overflow-hidden rounded-3xl border transition-all duration-300 p-8 sm:p-10 ${
                  isActive
                    ? "border-[#D4AF37]/40 bg-[#121622] shadow-2xl shadow-black/80"
                    : "border-white/10 bg-[#0E121B]/70 opacity-80"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          isActive
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-blue-950 text-blue-300 border border-blue-800"
                        }`}
                      >
                        {isActive ? (
                          <>
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Operational & Accepting Orders</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3 w-3" />
                            <span>Expansion Upcoming</span>
                          </>
                        )}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">
                        {outlet.region}
                      </span>
                    </div>

                    <h2
                      className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-white"
                      style={{ fontFamily: "var(--font-serif, serif)" }}
                    >
                      {outlet.name}
                    </h2>

                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-300">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                        <span>{outlet.model}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                        <span>{outlet.timing}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ordering Action Buttons */}
                  {isActive ? (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {/* Swiggy Button */}
                      <a
                        href={outlet.swiggyUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FC8019] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#FC8019]/25 transition-all hover:scale-105 hover:shadow-xl"
                      >
                        <span>Order on Swiggy</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>

                      {/* Zomato Button */}
                      <a
                        href={outlet.zomatoUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#CB202D] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#CB202D]/25 transition-all hover:scale-105 hover:shadow-xl"
                      >
                        <span>Order on Zomato</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-xs text-neutral-400 text-center lg:text-right">
                      <p className="font-semibold text-[#D4AF37]">Launch Pipeline</p>
                      <p className="mt-0.5 text-[11px]">Links active upon hub commissioning</p>
                    </div>
                  )}
                </div>

                {/* Outlet Details & Coverage Areas */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-300">
                  <div>
                    <h4 className="font-semibold text-white uppercase tracking-wider">
                      Delivery Coverage Neighborhoods
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {outlet.coverageAreas.map((area) => (
                        <span
                          key={area}
                          className="rounded-lg border border-white/5 bg-white/[0.04] px-2.5 py-1 text-neutral-300"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white uppercase tracking-wider">
                      Hub Information
                    </h4>
                    <p className="mt-2 text-neutral-400 leading-relaxed">
                      {outlet.note}
                    </p>
                  </div>
                </div>

                {/* Configuration Placeholder Flag for Client */}
                {isActive && (
                  <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-neutral-500 flex items-center justify-between">
                    <span>
                      Outlet Identifier: <code className="text-neutral-400">{outlet.id}</code>
                    </span>
                    <span className="italic">
                      Client Note: Ready to bind to live branch deep links upon final URL approval
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Corporate / Bulk Inquiries Banner */}
        <div className="mt-16 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#141B26] via-[#101520] to-[#181116] p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              Catering, Corporate & Bulk Feasts
            </h3>
            <p className="mt-1.5 text-xs text-neutral-300">
              Planning a family celebration, Durga Puja gathering, or corporate lunch?
              Connect directly with our team.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-[#8B1E1E] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:scale-105 transition-transform"
          >
            <span>Inquire for Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
