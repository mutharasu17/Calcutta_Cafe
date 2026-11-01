"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import BrandLogo from "../ui/BrandLogo";
import { useFoodDiscovery } from "@/lib/useFoodDiscovery";

export default function MobileWelcome() {
  const { isWelcomeDismissed, dismissWelcome, isInitialized } = useFoodDiscovery();

  if (!isInitialized || isWelcomeDismissed) {
    return null;
  }

  return (
    <div className="md:hidden bg-[#FFFDF8] border-b border-[#E6D8C3] p-6 relative overflow-hidden transition-all duration-300">
      {/* Skip Button */}
      <button
        onClick={dismissWelcome}
        className="absolute top-4 right-4 z-20 flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-[#6B6357] hover:text-[#7A382B] p-1.5"
        aria-label="Skip introduction"
      >
        <span>Skip</span>
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="space-y-4 pt-1">
        <BrandLogo size="sm" />

        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#7A382B] font-semibold block">
            Welcome to The Calcutta Cafe
          </span>
          <h2 className="font-serif text-2xl text-[#29251F] font-normal leading-tight">
            Discover the Flavours of Bengal.
          </h2>
          <p className="text-xs text-[#6B6357] leading-relaxed">
            From slow-cooked mutton to river Hilsa and earthen sweets—authentic Bengali culinary heritage delivered fresh in Bangalore.
          </p>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#E6D8C3] border border-[#E6D8C3] shadow-sm">
          <Image
            src="/images/hero-bengali-bhoj.jpg"
            alt="The Calcutta Cafe Culinary Repertoire"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Link
            href="/menu"
            onClick={dismissWelcome}
            className="flex-1 flex items-center justify-center gap-2 bg-[#7A382B] text-[#FFFDF8] py-3 px-4 text-xs font-semibold uppercase tracking-wider shadow-sm"
          >
            <span>Explore Menu</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={dismissWelcome}
            className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#29251F] border border-[#E6D8C3] hover:border-[#7A382B]"
          >
            Browse
          </button>
        </div>
      </div>
    </div>
  );
}

