"use client";

import { useState } from "react";
import Link from "next/link";
import BrandLogo from "../ui/BrandLogo";
import { ArrowRight, ExternalLink, MapPin, Clock, Mail, Check } from "lucide-react";
import { MENU_CATEGORIES } from "@/data/menuData";

export default function RetailFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#E6D8C3] text-[#29251F] border-t border-[#D8C7B0] transition-colors">
      {/* ──────────────────────────────────────────────────────────
          TOP NEWSLETTER & BRAND PHILOSOPHY STRIP (ANAND SWEETS STYLE)
      ────────────────────────────────────────────────────────── */}
      <div className="border-b border-[#D8C7B0]/80 py-12 px-4 sm:px-8 lg:px-12 bg-[#F5EFE4]">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-1.5 text-center lg:text-left">
            <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#7A382B] font-semibold block">
              The Calcutta Cafe Dispatch • খবর ও সমাচার
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#29251F]">
              Seasonal delicacies &amp; culinary essays.
            </h3>
            <p className="text-xs text-[#6B6357] max-w-md">
              Receive updates on seasonal Hilsa arrivals, winter Joynagarer Moa, and monographs from our kitchen.
            </p>
          </div>

          {/* Subscription Input Form */}
          <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A382B]" />
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#FFFDF8] border border-[#D8C7B0] pl-10 pr-4 py-3 text-xs text-[#29251F] placeholder-[#6B6357]/60 focus:outline-none focus:border-[#7A382B] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-[#7A382B] hover:bg-[#5E2B21] text-[#FFFDF8] px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 flex-shrink-0"
            >
              <span>{subscribed ? "Subscribed" : "Subscribe"}</span>
              {subscribed ? <Check className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
            </button>
          </form>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          MAIN 4-COLUMN RETAIL DIRECTORY
      ────────────────────────────────────────────────────────── */}
      <div className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Col 1: Brand Info & Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="md" />

            <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed pt-2">
              The Calcutta Cafe brings Bengal&apos;s culinary heritage to life in Bangalore—from slow-cooked Sunday Kosha Mangsho to river Hilsa, golden luchis, and claypot Mishti Doi.
            </p>

            <div className="space-y-1.5 pt-2 text-xs text-[#6B6357]">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#7A382B]" />
                <span>Operating Hours: 12:00 PM – 11:00 PM Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#7A382B]" />
                <span>Bangalore Hubs: Indiranagar • Koramangala • Whitefield</span>
              </div>
            </div>
          </div>

          {/* Col 2: Our Repertoire (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#7A382B] font-semibold block">
              Our Repertoire
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#29251F]">
              {MENU_CATEGORIES.filter((c) => c.id !== "drinks").map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/menu?category=${cat.id}`}
                    className="hover:text-[#7A382B] transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="font-bengali text-xs text-[#6B6357]">
                      {cat.bengaliSubtitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Heritage & About (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#7A382B] font-semibold block">
              Heritage
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#29251F]">
              <li>
                <Link href="/about" className="hover:text-[#7A382B] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#7A382B] transition-colors">
                  Akash Santra (2019)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#7A382B] transition-colors">
                  The Bengal Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#7A382B] transition-colors">
                  Kitchen Hubs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#7A382B] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Order Online & Social Channels (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#7A382B] font-semibold block">
              Order Online Direct
            </span>

            <p className="text-xs text-[#6B6357]">
              Delivered fresh across Bangalore exclusively through our verified cloud kitchen partners.
            </p>

            <div className="space-y-2.5 pt-1">
              <a
                href="https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#FFFDF8] border border-[#D8C7B0] hover:border-[#7A382B] transition-all text-xs font-semibold uppercase tracking-wider text-[#29251F]"
              >
                <span>Order on Swiggy</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#7A382B]" />
              </a>

              <a
                href="https://www.zomato.com/bangalore/the-calcutta-cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#FFFDF8] border border-[#D8C7B0] hover:border-[#7A382B] transition-all text-xs font-semibold uppercase tracking-wider text-[#29251F]"
              >
                <span>Order on Zomato</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#7A382B]" />
              </a>
            </div>

            <div className="pt-2 text-xs text-[#6B6357]">
              <span className="font-mono text-[11px] block uppercase tracking-wider text-[#7A382B] font-semibold mb-1">
                Follow Our Journey
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7A382B] transition-colors"
                >
                  Instagram
                </a>
                <span>•</span>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7A382B] transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          BOTTOM LEGAL & COPYRIGHT BAR
      ────────────────────────────────────────────────────────── */}
      <div className="border-t border-[#D8C7B0] py-6 px-4 sm:px-8 lg:px-12 text-[11px] font-mono text-[#6B6357] bg-[#E0D0BA]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © 2026 The Calcutta Cafe Foods Pvt Ltd. All rights reserved.
          </div>
          <div>
            Bengal Reimagined • Bangalore, Karnataka, India
          </div>
        </div>
      </div>
    </footer>
  );
}

