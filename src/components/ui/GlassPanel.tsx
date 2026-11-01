import React from "react";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "subtle" | "prominent";
  hoverEffect?: boolean;
}

export default function GlassPanel({
  children,
  className = "",
  variant = "default",
  hoverEffect = false,
}: GlassPanelProps) {
  const variantStyles = {
    default: "bg-white/[0.065] backdrop-blur-xl border border-white/[0.14]",
    subtle: "bg-white/[0.035] backdrop-blur-md border border-white/[0.08]",
    prominent: "bg-[#151313]/85 backdrop-blur-2xl border border-white/[0.18] shadow-2xl shadow-black/80",
  }[variant];

  const hoverStyles = hoverEffect
    ? "transition-all duration-400 hover:border-[#C7AC83]/40 hover:bg-white/[0.085]"
    : "";

  return (
    <div
      className={`relative rounded-none ${variantStyles} ${hoverStyles} ${className}`}
    >
      {/* Subtle Specular Top Hairline Reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

