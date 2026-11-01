"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, MapPin } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="bg-[#7A382B] text-[#FFFDF8] text-[11px] sm:text-xs font-mono tracking-wider py-2 px-4 sm:px-8 border-b border-[#5E2B21]">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Left Indicator */}
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-[#B68A52]" />
          <span className="font-medium">
            Authentic Bengali Culinary Heritage • Small-Batch Daily Cooking
          </span>
        </div>

        {/* Right Location & Hub Quick Link */}
        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-1 text-[#E6D8C3]">
            <MapPin className="h-3 w-3 text-[#B68A52]" />
            <span>Bangalore Hubs: Indiranagar • Koramangala • Whitefield</span>
          </span>

          <Link
            href="/order"
            className="inline-flex items-center gap-1 font-semibold text-[#FFFDF8] hover:text-[#E6D8C3] underline underline-offset-2 transition-colors uppercase"
          >
            <span>Order Direct</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

