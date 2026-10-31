"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "../ui/BrandLogo";
import { ArrowUpRight, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#171615]/90 backdrop-blur-xl border-b border-white/[0.07] py-4 shadow-xl shadow-black/40"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
          {/* Brand Mark */}
          <BrandLogo size="md" />

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-medium tracking-widest uppercase transition-colors duration-200 ${
                    isActive
                      ? "text-[#FAF9F6]"
                      : "text-[#D8D0C3]/70 hover:text-[#FAF9F6]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Direct Ordering Action CTA */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/order"
              className="group relative inline-flex items-center gap-2 border border-[#B79A65]/60 bg-[#641F2B] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF9F6] transition-all duration-300 hover:bg-[#7D2736] hover:border-[#B79A65]"
            >
              <span>Order Online</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#B79A65] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-[#FAF9F6] focus:outline-none"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 flex flex-col items-end gap-1.5">
              <span className={`block h-[1.5px] bg-[#FAF9F6] transition-all duration-300 ${isMobileOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
              <span className={`block h-[1.5px] bg-[#FAF9F6] transition-all duration-300 ${isMobileOpen ? "opacity-0" : "w-4"}`} />
              <span className={`block h-[1.5px] bg-[#FAF9F6] transition-all duration-300 ${isMobileOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Full-Screen Bespoke Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#171615] transition-all duration-500 md:hidden flex flex-col justify-between px-8 py-24 ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="space-y-6 pt-8">
          <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#B79A65] block mb-6">
            Navigation
          </span>
          {NAV_ITEMS.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              className="block font-serif text-3xl font-light text-[#FAF9F6] transition-colors hover:text-[#B79A65]"
            >
              <span className="font-sans text-xs text-[#B79A65] mr-3 font-mono opacity-50">0{idx + 1}</span>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="pt-8 border-t border-white/[0.08] space-y-4">
          <Link
            href="/order"
            className="flex items-center justify-between border border-[#B79A65]/50 bg-[#641F2B] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF9F6]"
          >
            <span>Order via Swiggy / Zomato</span>
            <ArrowUpRight className="h-4 w-4 text-[#B79A65]" />
          </Link>
          <p className="text-[11px] text-[#D8D0C3]/60 font-light text-center">
            The Calcutta Cafe Foods Pvt Ltd • Bangalore Hub
          </p>
        </div>
      </div>
    </>
  );
}
