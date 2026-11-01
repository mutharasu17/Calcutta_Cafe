"use client";

import { useState } from "react";
import { BRAND_DATA } from "@/data/brandInfo";
import { InstagramIcon, XIcon } from "@/components/ui/SocialIcons";
import { Check } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative pt-32 pb-28 bg-[#090909] text-[#F5F0E8] min-h-screen">
      {/* Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="mx-auto max-w-5xl">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#C7AC83] block mb-4">
            Direct Communications
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[1.04]">
            Connect with
            <span className="block italic text-[#C7AC83] font-light mt-1">
              The Calcutta Cafe.
            </span>
          </h1>
          <p className="mt-8 text-base sm:text-lg text-[#A9A19A] font-light leading-relaxed max-w-2xl">
            For catering inquiries, cloud kitchen expansion feedback, or corporate collaborations across India.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-32">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Brand & Corporate Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C7AC83]">
                Entity & Operations
              </span>
              <h2 className="font-serif text-2xl font-light text-[#F5F0E8]">
                {BRAND_DATA.legalName}
              </h2>
              <p className="text-xs text-[#A9A19A] font-light leading-relaxed">
                Founded by Akash Santra. Operating through dedicated delivery cloud kitchen hubs.
              </p>
            </div>

            <GlassPanel variant="subtle" className="p-6 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">
                Primary Kitchen Hub
              </span>
              <p className="font-serif text-lg text-[#F5F0E8]">Bangalore Central Hub</p>
              <p className="text-xs text-[#A9A19A] font-light">
                Delivering across central Bangalore via Swiggy & Zomato
              </p>
            </GlassPanel>

            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C7AC83] block">
                Official Channels
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={BRAND_DATA.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/10 bg-white/[0.02] hover:border-[#C7AC83] px-4 py-2.5 text-xs text-[#F5F0E8] transition-colors"
                >
                  <InstagramIcon className="h-4 w-4 text-[#C7AC83]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={BRAND_DATA.socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/10 bg-white/[0.02] hover:border-[#C7AC83] px-4 py-2.5 text-xs text-[#F5F0E8] transition-colors"
                >
                  <XIcon className="h-3.5 w-3.5 text-[#C7AC83]" />
                  <span>X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <GlassPanel variant="prominent" className="p-8 sm:p-10">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="mx-auto h-12 w-12 rounded-full border border-emerald-400 flex items-center justify-center text-emerald-400">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#F5F0E8]">Inquiry Received</h3>
                  <p className="text-xs sm:text-sm text-[#A9A19A] max-w-sm mx-auto">
                    Thank you for reaching out to The Calcutta Cafe. Our communications team will respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#C7AC83] block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anirban Mukherjee"
                      className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-xs text-[#F5F0E8] placeholder-[#A9A19A]/40 focus:outline-none focus:border-[#C7AC83] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#C7AC83] block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-xs text-[#F5F0E8] placeholder-[#A9A19A]/40 focus:outline-none focus:border-[#C7AC83] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#C7AC83] block">
                      Inquiry Nature
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#151313] border border-white/10 px-4 py-3 text-xs text-[#F5F0E8] focus:outline-none focus:border-[#C7AC83] transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Catering & Events">Catering & Corporate Gatherings</option>
                      <option value="Expansion & Partnerships">City Expansion / Commercial Inquiry</option>
                      <option value="Customer Feedback">Food Quality / Delivery Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#C7AC83] block">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding your request or inquiry..."
                      className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-xs text-[#F5F0E8] placeholder-[#A9A19A]/40 focus:outline-none focus:border-[#C7AC83] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full border border-[#C7AC83] bg-[#C7AC83] py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#090909] hover:bg-transparent hover:text-[#F5F0E8] transition-all duration-300"
                  >
                    Transmit Message
                  </button>
                </form>
              )}
            </GlassPanel>
          </div>
        </div>
      </section>
    </div>
  );
}
