"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { BRAND_DATA } from "@/data/brandInfo";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { InstagramIcon, XIcon } from "@/components/ui/SocialIcons";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "catering",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate clean submission
    setFormSubmitted(true);
  };

  return (
    <div className="relative pt-28 pb-24 bg-[#0A0E17]">
      {/* Header Banner */}
      <section className="relative py-16 border-b border-white/10 bg-[#080C14]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#161D2B]/90 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>যোগাযোগ • Connect with Us</span>
          </div>

          <h1
            className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FAF6F0]"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            Get in Touch with{" "}
            <span className="text-gold-gradient italic font-normal">
              The Calcutta Cafe
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base text-neutral-300">
            For catering inquiries, corporate collaborations, cloud kitchen expansion feedback,
            or to share your love for Bengal&apos;s culinary heritage.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Official Business Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2
                className="font-serif text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-serif, serif)" }}
              >
                Official Brand Information
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                The Calcutta Cafe Foods Pvt Ltd • Founded by Akash Santra. Operating through dedicated delivery cloud kitchen hubs.
              </p>
            </div>

            {/* Operational Location Card */}
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#121622] p-6 shadow-lg">
              <div className="flex items-center gap-3 text-emerald-400 font-semibold text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Primary Operational Hub</span>
              </div>
              <h3 className="mt-2 font-serif text-lg font-bold text-white">Bangalore, Karnataka</h3>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                Central cloud kitchen serving delivery coverage across Indiranagar, Koramangala,
                HSR, and surrounding neighborhoods via Swiggy & Zomato.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-neutral-300">
                <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Hours: 11:30 AM – 11:00 PM (Daily)</span>
              </div>
            </div>

            {/* Expansion Roadmap Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0E121B] p-6">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Expansion In Progress</span>
              </div>
              <h3 className="mt-2 font-serif text-lg font-bold text-white">Delhi NCR & Noida</h3>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                Currently in operational planning. Commercial address and launch details will be
                officially published upon commissioning.
              </p>
            </div>

            {/* Verified Social Media Channels */}
            <div className="rounded-2xl border border-white/10 bg-[#121622] p-6">
              <h3 className="font-serif text-base font-bold text-white">Official Social Media</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Follow our daily culinary journey and announcements:
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={BRAND_DATA.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-neutral-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <InstagramIcon className="h-4 w-4 text-[#D4AF37]" />
                    <span>Instagram: @thecalcutta_cafe</span>
                  </span>
                  <span className="text-[10px] text-neutral-500">Visit Profile →</span>
                </a>

                <a
                  href={BRAND_DATA.socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-neutral-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <XIcon className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>X: @calcutta_cafe</span>
                  </span>
                  <span className="text-[10px] text-neutral-500">Visit Profile →</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiries Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#121622] p-8 sm:p-10 shadow-2xl">
              <h2
                className="font-serif text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-serif, serif)" }}
              >
                Send Us an Inquiry
              </h2>
              <p className="mt-1 text-xs text-neutral-400">
                Please leave your details below and our team will get in touch with you promptly.
              </p>

              {formSubmitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                  <h3 className="mt-4 font-serif text-xl font-bold text-white">
                    Thank You for Reaching Out
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-300">
                    Your inquiry has been received. Our team will review your message and contact
                    you shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 rounded-full border border-emerald-500/40 px-6 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/10"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Anirban Mukherjee"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. anirban@example.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Contact Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Inquiry Category *
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData({ ...formData, inquiryType: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-[#161D2A] px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        <option value="catering">Bulk & Event Catering (Bhoj)</option>
                        <option value="corporate">Corporate Office Meal Partnerships</option>
                        <option value="expansion">Location Expansion Inquiry</option>
                        <option value="general">General Culinary Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                      Message & Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your event, number of guests, date, or specific culinary inquiry..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder-neutral-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3CF5F] to-[#D4AF37] py-4 text-xs font-bold uppercase tracking-wider text-[#14100C] shadow-lg shadow-[#D4AF37]/25 transition-all hover:scale-[1.02]"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="h-4 w-4 text-[#14100C]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
