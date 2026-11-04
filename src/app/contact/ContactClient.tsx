"use client";

import { useState } from "react";
import { BRAND_DATA } from "@/data/brandInfo";
import { InstagramIcon, XIcon } from "@/components/ui/SocialIcons";
import { Check, AlertCircle, Loader2, Phone, Mail } from "lucide-react";

export default function ContactClient() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative pb-28 bg-[#F5EFE4] text-[#29251F] min-h-screen">
      {/* Editorial Header */}
      <section className="px-4 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-8 sm:pb-20 border-b border-[#E6D8C3]">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#5B1B8A] font-semibold block mb-3">
            Direct Communications • যোগাযোগ
          </span>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.08] sm:leading-[1.04]">
            Connect with
            <span className="block italic text-[#5B1B8A] font-light mt-1">
              The Calcutta Cafe.
            </span>
          </h1>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed max-w-2xl">
            For catering inquiries, cloud kitchen expansion feedback, or corporate collaborations across India.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-4 sm:px-10 lg:px-16 py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Brand & Corporate Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#5B1B8A] font-semibold">
                Entity &amp; Operations
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#29251F]">
                {BRAND_DATA.legalName}
              </h2>
              <p className="text-xs text-[#6B6357] font-normal leading-relaxed">
                Founded by Akash Santra in 2019. Operating through dedicated delivery cloud kitchen hubs.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-6 border border-[#E6D8C3] shadow-sm space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#5B1B8A] font-semibold block">
                Direct Contact
              </span>
              <div className="space-y-3 text-xs text-[#29251F]">
                <a
                  href={BRAND_DATA.contact.phoneHref}
                  className="flex items-center gap-3 p-2 -mx-2 rounded hover:bg-[#FAF6F0] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#FAF6F0] group-hover:bg-[#5B1B8A] group-hover:text-white flex items-center justify-center transition-colors text-[#5B1B8A] flex-shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B6357] block">Phone / Inquiries</span>
                    <span className="font-medium text-sm text-[#29251F] group-hover:text-[#5B1B8A] transition-colors">{BRAND_DATA.contact.phoneDisplay}</span>
                  </div>
                </a>
                <a
                  href={BRAND_DATA.contact.emailHref}
                  className="flex items-center gap-3 p-2 -mx-2 rounded hover:bg-[#FAF6F0] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#FAF6F0] group-hover:bg-[#5B1B8A] group-hover:text-white flex items-center justify-center transition-colors text-[#5B1B8A] flex-shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B6357] block">Email Support</span>
                    <span className="font-medium text-sm text-[#29251F] group-hover:text-[#5B1B8A] transition-colors">{BRAND_DATA.contact.email}</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-6 border border-[#E6D8C3] shadow-sm space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#5B1B8A] font-semibold">
                Operational Presence
              </span>
              <p className="text-sm font-medium text-[#29251F]">
                Bangalore Central Kitchen Active
              </p>
              <p className="text-xs text-[#6B6357]">
                Delhi NCR &amp; Metros Planned
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#5B1B8A] font-semibold block">
                Official Channels
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={BRAND_DATA.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[#E6D8C3] bg-[#FFFFFF] px-4 py-2.5 text-xs text-[#29251F] hover:border-[#5B1B8A] transition-colors shadow-sm"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-4 w-4 text-[#5B1B8A]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={BRAND_DATA.socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[#E6D8C3] bg-[#FFFFFF] px-4 py-2.5 text-xs text-[#29251F] hover:border-[#5B1B8A] transition-colors shadow-sm"
                  aria-label="X (formerly Twitter)"
                >
                  <XIcon className="h-3.5 w-3.5 text-[#5B1B8A]" />
                  <span>X / Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] p-8 sm:p-10 border border-[#E6D8C3] shadow-md">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#34483A]/10 text-[#34483A]">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#29251F] font-normal">
                    Message Received
                  </h3>
                  <p className="text-sm text-[#6B6357] max-w-sm mx-auto">
                    Thank you for reaching out to The Calcutta Cafe. Your inquiry has been logged and our operations team will respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 rounded-xs">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-[#6B6357] mb-2">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      minLength={2}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-[#F5EFE4]/50 border border-[#E6D8C3] px-4 py-3 text-sm text-[#29251F] placeholder-[#6B6357]/50 focus:outline-none focus:border-[#5B1B8A] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-[#6B6357] mb-2">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full bg-[#F5EFE4]/50 border border-[#E6D8C3] px-4 py-3 text-sm text-[#29251F] placeholder-[#6B6357]/50 focus:outline-none focus:border-[#5B1B8A] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider text-[#6B6357] mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#F5EFE4]/50 border border-[#E6D8C3] px-4 py-3 text-sm text-[#29251F] focus:outline-none focus:border-[#5B1B8A] transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Bulk / Corporate Orders">Bulk / Corporate Orders</option>
                      <option value="Feedback on Delivery">Feedback on Delivery</option>
                      <option value="Partnership / Expansion">Partnership / Expansion</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-[#6B6357] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      minLength={10}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we assist you with our Bengali culinary offerings?"
                      className="w-full bg-[#F5EFE4]/50 border border-[#E6D8C3] px-4 py-3 text-sm text-[#29251F] placeholder-[#6B6357]/50 focus:outline-none focus:border-[#5B1B8A] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#5B1B8A] text-[#F5EFE4] py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#4B1473] transition-all shadow-md min-h-[48px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    <span>{submitting ? "Sending..." : "Send Direct Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

