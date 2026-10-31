"use client";

import { useState } from "react";
import { BRAND_DATA } from "@/data/brandInfo";
import { InstagramIcon, XIcon } from "@/components/ui/SocialIcons";
import { Check } from "lucide-react";

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
    <div className="relative pt-32 pb-28 bg-[#171615] text-[#FAF9F6]">
      {/* Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#B79A65] block mb-4">
            Direct Communications
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[1.04]">
            Connect with
            <span className="block italic text-[#D8D0C3] font-normal">
              The Calcutta Cafe.
            </span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-[#D8D0C3]/90 font-light leading-relaxed max-w-2xl">
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
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B79A65]">
                Entity & Operations
              </span>
              <h2 className="font-serif text-2xl font-light text-[#FAF9F6]">
                {BRAND_DATA.legalName}
              </h2>
              <p className="text-xs text-[#D8D0C3]/70 font-light leading-relaxed">
                Founded by Akash Santra. Operating through dedicated delivery cloud kitchen hubs.
              </p>
            </div>

            <div className="border border-white/[0.08] p-6 space-y-2 bg-white/[0.01]">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">
                Primary Operational Hub
              </span>
              <p className="font-serif text-lg text-[#FAF9F6]">Bangalore, Karnataka</p>
              <p className="text-xs text-[#D8D0C3]/70 font-light leading-relaxed">
                Central cloud kitchen serving city delivery corridors via verified Swiggy & Zomato partners.
              </p>
            </div>

            <div className="border border-white/[0.06] p-6 space-y-2 bg-white/[0.01]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B79A65] block">
                Expansion In Planning
              </span>
              <p className="font-serif text-lg text-[#FAF9F6]">Delhi NCR & Metros</p>
              <p className="text-xs text-[#D8D0C3]/70 font-light leading-relaxed">
                Operational preparations underway to expand authentic Bengali culinary delivery northward.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B79A65] block">
                Verified Social Channels
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={BRAND_DATA.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/10 px-4 py-2.5 text-xs text-[#D8D0C3] hover:text-[#FAF9F6] hover:border-[#B79A65] transition-colors"
                >
                  <InstagramIcon className="h-3.5 w-3.5 text-[#B79A65]" />
                  <span>@thecalcutta_cafe</span>
                </a>
                <a
                  href={BRAND_DATA.socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/10 px-4 py-2.5 text-xs text-[#D8D0C3] hover:text-[#FAF9F6] hover:border-[#B79A65] transition-colors"
                >
                  <XIcon className="h-3.5 w-3.5 text-[#B79A65]" />
                  <span>@calcutta_cafe</span>
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="border border-[#B79A65] p-10 bg-white/[0.02] text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#B79A65] text-[#B79A65]">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl font-light text-[#FAF9F6]">
                  Message Received
                </h3>
                <p className="text-xs text-[#D8D0C3]/80 font-light max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to The Calcutta Cafe. Our team will review your inquiry with priority.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-white/[0.08] p-8 sm:p-10 space-y-6 bg-white/[0.01]">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B79A65] block mb-2">
                  Direct Inquiries
                </span>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#D8D0C3]/70 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-xs text-[#FAF9F6] focus:outline-none focus:border-[#B79A65] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#D8D0C3]/70 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-xs text-[#FAF9F6] focus:outline-none focus:border-[#B79A65] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#D8D0C3]/70 block">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#171615] border border-white/10 px-4 py-3 text-xs text-[#FAF9F6] focus:outline-none focus:border-[#B79A65] transition-colors"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Catering & Events">Catering & Event Dining</option>
                    <option value="Expansion Feedback">City Expansion Feedback</option>
                    <option value="Corporate Partnership">Corporate Partnership</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#D8D0C3]/70 block">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-xs text-[#FAF9F6] focus:outline-none focus:border-[#B79A65] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border border-[#B79A65] bg-[#B79A65] py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#171615] hover:bg-transparent hover:text-[#FAF9F6] transition-all duration-300"
                >
                  Transmit Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
