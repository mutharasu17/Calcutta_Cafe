"use client";

import { ExternalLink } from "lucide-react";
import { trackOrderClick } from "@/lib/analytics";

interface OrderLinksProps {
  swiggyUrl?: string;
  zomatoUrl?: string;
  hubName: string;
}

export default function OrderLinks({ swiggyUrl, zomatoUrl, hubName }: OrderLinksProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 pt-4">
      {swiggyUrl && (
        <a
          href={swiggyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackOrderClick("swiggy", hubName)}
          className="inline-flex items-center gap-2.5 bg-[#7A382B] text-[#F5EFE4] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#5E2B21] transition-all shadow-sm"
        >
          <span>Order on Swiggy</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      )}

      {zomatoUrl && (
        <a
          href={zomatoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackOrderClick("zomato", hubName)}
          className="inline-flex items-center gap-2.5 bg-[#29251F] text-[#F5EFE4] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#7A382B] transition-all shadow-sm"
        >
          <span>Order on Zomato</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

