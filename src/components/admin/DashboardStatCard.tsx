import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardStatCardProps {
  label: string;
  value: number | string;
  subtext?: string;
  icon: LucideIcon;
  badge?: {
    text: string;
    variant: 'success' | 'warning' | 'info' | 'danger';
  };
}

export default function DashboardStatCard({
  label,
  value,
  subtext,
  icon: Icon,
  badge,
}: DashboardStatCardProps) {
  return (
    <div className="bg-[#24201C] border border-[#3E3832] rounded-xl p-5 hover:border-[#C49A55]/40 transition-all duration-300 group shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-[#A69B8D] font-medium">
          {label}
        </span>
        <div className="p-2.5 rounded-lg bg-[#2E2924] border border-[#443D36] text-[#D4AF37] group-hover:scale-105 group-hover:bg-[#C49A55]/10 transition-transform">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-3xl font-serif font-bold text-[#FFF8ED]">
          {value}
        </span>
        {badge && (
          <span
            className={`text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
              badge.variant === 'success'
                ? 'bg-emerald-950/70 text-emerald-400 border-emerald-800/50'
                : badge.variant === 'warning'
                ? 'bg-amber-950/70 text-amber-400 border-amber-800/50'
                : badge.variant === 'danger'
                ? 'bg-rose-950/70 text-rose-400 border-rose-800/50'
                : 'bg-blue-950/70 text-blue-400 border-blue-800/50'
            }`}
          >
            {badge.text}
          </span>
        )}
      </div>

      {subtext && (
        <p className="text-xs text-[#A69B8D] font-sans mt-1">
          {subtext}
        </p>
      )}
    </div>
  );
}

