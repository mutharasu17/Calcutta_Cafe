"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, UtensilsCrossed, ShoppingBag } from "lucide-react";

export default function MobileDock() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Discover", href: "/about", icon: Compass },
    { label: "Menu", href: "/menu", icon: UtensilsCrossed },
    { label: "Order", href: "/order", icon: ShoppingBag, isAccent: true },
  ];

  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-0 right-0 z-30 flex justify-center px-4 md:hidden pointer-events-none">
      <nav
        aria-label="Mobile Bottom Quick Navigation"
        className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full glass-dock border border-white/[0.14] bg-[#121010]/85 backdrop-blur-2xl shadow-2xl shadow-black/90"
      >
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          const IconComponent = item.icon;

          if (item.isAccent) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#651F2B] text-[#F5F0E8] border border-[#C7AC83]/50 text-xs font-medium tracking-wider uppercase transition-transform active:scale-95"
              >
                <IconComponent className="h-3.5 w-3.5 text-[#C7AC83]" />
                <span className="text-[11px] font-semibold">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center px-3.5 py-1.5 rounded-full transition-all duration-300 active:scale-95 ${
                isActive
                  ? "text-[#F5F0E8] bg-white/[0.08]"
                  : "text-[#A9A19A] hover:text-[#F5F0E8]"
              }`}
            >
              <IconComponent className={`h-4 w-4 ${isActive ? "text-[#C7AC83]" : ""}`} />
              <span className="text-[9px] font-medium tracking-wider mt-0.5">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-0.5 h-[2px] w-3 rounded-full bg-[#C7AC83]" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

