"use client";

import { useState } from "react";
import Link from "next/link";
import BrandLogo from "../ui/BrandLogo";
import { ArrowRight, ExternalLink, MapPin, Clock, Mail, Check, Loader2 } from "lucide-react";
import { MENU_CATEGORIES } from "@/data/menuData";
import { BRAND_DATA } from "@/data/brandInfo";
import { trackOrderClick } from "@/lib/analytics";

export default function RetailFooter() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribing(true);
    setSubscribeError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Subscription failed.");
      }

      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      setSubscribeError(
        err instanceof Error ? err.message : "Failed to subscribe. Please try again."
      );
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#FAF6F0] text-[#2D231E] border-t border-[#E6D8C3] transition-colors">
      {/* ──────────────────────────────────────────────────────────
          TOP NEWSLETTER & BRAND PHILOSOPHY STRIP
      ────────────────────────────────────────────────────────── */}
      <div className="border-b border-[#E6D8C3] py-12 px-4 sm:px-8 lg:px-12 bg-[#FFF8ED]">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-1.5 text-center lg:text-left">
            <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#5B1B8A] font-bold block">
              The Calcutta Cafe Dispatch • খবর ও সমাচার
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-normal text-[#2D231E]">
              Seasonal delicacies &amp; culinary essays.
            </p>
            <p className="text-xs sm:text-sm text-[#5C524B] max-w-md">
              Receive updates on seasonal Hilsa arrivals, winter Joynagarer Moa, and monographs from our kitchen.
            </p>
          </div>

          {/* Subscription Input Form */}
          <div className="w-full max-w-md">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5B1B8A]" />
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#FFFFFF] border border-[#E6D8C3] pl-10 pr-4 py-3 text-xs text-[#2D231E] placeholder-[#5C524B]/60 focus:outline-none focus:border-[#5B1B8A] transition-colors shadow-2xs rounded-sm"
                />
              </div>
              <button
                type="submit"
                disabled={subscribing}
                className="bg-[#5B1B8A] hover:bg-[#4B1473] text-[#FFF8ED] px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer disabled:opacity-70 rounded-sm border border-[#FFB834]/40"
              >
                {subscribing ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : subscribed ? (
                  <Check className="h-3.5 w-3.5 text-[#FFB834]" />
                ) : (
                  <ArrowRight className="h-3.5 w-3.5 text-[#FFB834]" />
                )}
                <span>{subscribing ? "Sending..." : subscribed ? "Subscribed" : "Subscribe"}</span>
              </button>
            </form>
            {subscribeError && (
              <p className="text-[11px] text-rose-700 mt-1.5 font-mono">{subscribeError}</p>
            )}
          </div>
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

            <p className="text-xs sm:text-sm text-[#5C524B] font-normal leading-relaxed pt-2">
              The Calcutta Cafe brings Bengal&apos;s culinary heritage to life in Bangalore—from slow-cooked Sunday Kosha Mangsho to river Katla kalia, golden luchis, and earthen terracotta thalis.
            </p>

            <div className="space-y-1.5 pt-2 text-xs text-[#5C524B]">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#5B1B8A]" />
                <span>Operating Hours: 11:30 AM – 11:00 PM Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#5B1B8A]" />
                <span>Bangalore Hubs: Koramangala • Indiranagar • Whitefield • HSR</span>
              </div>
            </div>
          </div>

          {/* Col 2: Our Repertoire (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#5B1B8A] font-bold block">
              Our Repertoire
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#2D231E]">
              {MENU_CATEGORIES.filter((c) => c.id !== "drinks").map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/menu?category=${cat.id}`}
                    className="hover:text-[#5B1B8A] transition-colors flex items-center justify-between group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{cat.name}</span>
                    <span className="font-bengali text-xs text-[#5B1B8A]/80 group-hover:text-[#5B1B8A]">
                      {cat.bengaliSubtitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Heritage & About (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#5B1B8A] font-bold block">
              Heritage
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#2D231E]">
              <li>
                <Link href="/about" className="hover:text-[#5B1B8A] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#5B1B8A] transition-colors">
                  Akash Santra (2019)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#5B1B8A] transition-colors">
                  The Bengal Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#5B1B8A] transition-colors">
                  Kitchen Hubs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#5B1B8A] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Order Online & Social Channels (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#5B1B8A] font-bold block">
              Order Online Direct
            </span>

            <p className="text-xs text-[#5C524B]">
              Delivered fresh across Bangalore exclusively through our verified cloud kitchen partners.
            </p>

            <div className="space-y-2.5 pt-1">
              <a
                href="https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOrderClick("swiggy", "Footer Order Link")}
                className="flex items-center justify-between p-3 bg-[#FFFFFF] border border-[#E6D8C3] hover:border-[#5B1B8A] transition-all text-xs font-semibold uppercase tracking-wider text-[#2D231E] shadow-2xs rounded-sm group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FC8019]"></span>
                  <span>Order on Swiggy</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-[#5B1B8A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://www.zomato.com/bangalore/the-calcutta-cafe"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOrderClick("zomato", "Footer Order Link")}
                className="flex items-center justify-between p-3 bg-[#FFFFFF] border border-[#E6D8C3] hover:border-[#5B1B8A] transition-all text-xs font-semibold uppercase tracking-wider text-[#2D231E] shadow-2xs rounded-sm group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#CB202D]"></span>
                  <span>Order on Zomato</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-[#5B1B8A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="pt-2 text-xs text-[#5C524B]">
              <span className="font-mono text-[11px] block uppercase tracking-wider text-[#5B1B8A] font-bold mb-1">
                Follow Our Journey
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={BRAND_DATA.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#5B1B8A] transition-colors"
                >
                  Instagram
                </a>
                <span>•</span>
                <a
                  href={BRAND_DATA.socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#5B1B8A] transition-colors"
                >
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          BOTTOM LEGAL & COPYRIGHT BAR
      ────────────────────────────────────────────────────────── */}
      <div className="border-t border-[#E6D8C3] py-6 px-4 sm:px-8 lg:px-12 text-[11px] font-mono text-[#5C524B] bg-[#EFE4D2]/60">
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
