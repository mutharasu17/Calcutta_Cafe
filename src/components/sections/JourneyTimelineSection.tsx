import SectionHeading from "../ui/SectionHeading";
import { CheckCircle2, Clock, Compass, MapPin } from "lucide-react";

interface TimelineMilestone {
  period: string;
  bengaliTag: string;
  title: string;
  location: string;
  status: "completed" | "active" | "planned";
  description: string;
  highlights: string[];
}

const MILESTONES: TimelineMilestone[] = [
  {
    period: "2019",
    bengaliTag: "সূচনা",
    title: "The Original Idea & Vision",
    location: "Bangalore Conception",
    status: "completed",
    description:
      "Founder Akash Santra formulated the vision for The Calcutta Cafe: a dedicated Bengali food brand built to celebrate the full spectrum of Bengal's culinary heritage, backed by professional customer experience rigor.",
    highlights: [
      "Inception of recipe standards",
      "Analysis of customer demand across non-metro and metro regions",
      "Commitment to authentic regional sourcing",
    ],
  },
  {
    period: "Bangalore Launch",
    bengaliTag: "প্রথম অধ্যায়",
    title: "Beginning the Brand's Journey",
    location: "Bangalore, Karnataka",
    status: "completed",
    description:
      "The Calcutta Cafe launched its initial operations in Bangalore, choosing a cloud-kitchen-led business model to ensure kitchen-fresh delivery with optimal temperature and flavor integrity.",
    highlights: [
      "First cloud kitchen hub established",
      "Partnership with Swiggy and Zomato delivery networks",
      "Refining authentic Bengali staples for doorstep dining",
    ],
  },
  {
    period: "Present Day",
    bengaliTag: "বর্তমান",
    title: "Consolidating the Cloud-Kitchen Foundation",
    location: "Bangalore Operations",
    status: "active",
    description:
      "Actively serving food lovers across Bangalore, perfecting kitchen operations, gathering genuine customer feedback, and establishing operational benchmarks for scalable consistency.",
    highlights: [
      "Active central kitchen fulfilling daily orders",
      "Expanding menu depth to include rarer traditional items",
      "Customer-centric service protocols",
    ],
  },
  {
    period: "Future Ambition",
    bengaliTag: "ভবিষ্যতের লক্ষ্য",
    title: "Expanding Across Delhi NCR & Beyond",
    location: "Delhi NCR, Noida, & Major Indian Metros",
    status: "planned",
    description:
      "Our long-term expansion ambition is to bring The Calcutta Cafe to Delhi NCR, followed by other major culinary hubs in India, making authentic Bengali food an everyday reality nationwide.",
    highlights: [
      "Delhi NCR / Noida expansion planning underway",
      "Establishing supply networks for fresh authentic ingredients",
      "Building a nationally recognized Bengali food brand",
    ],
  },
];

export default function JourneyTimelineSection() {
  return (
    <section id="journey" className="relative py-24 lg:py-32 bg-[#0A0E17]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Growth Story"
          bengaliEyebrow="আমাদের পথচলা"
          title="The Journey of"
          highlightedWord="The Calcutta Cafe"
          description="From an idea sparked in 2019 to our cloud-kitchen presence in Bangalore and our ambitious national roadmap. Here is where we began, where we stand, and where we are heading."
        />

        {/* Timeline Visual Container */}
        <div className="relative mt-20 max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute top-4 bottom-4 left-6 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#8B1E1E] via-[#D4AF37] to-[#1E293B]" />

          <div className="space-y-12">
            {MILESTONES.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              const isPlanned = milestone.status === "planned";
              const isActive = milestone.status === "active";

              return (
                <div
                  key={milestone.period}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  } gap-6 sm:gap-12`}
                >
                  {/* Timeline Badge Center Pin */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0A0E17] bg-[#141A26] shadow-xl z-10">
                    {milestone.status === "completed" && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    )}
                    {isActive && (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]" />
                      </span>
                    )}
                    {isPlanned && (
                      <Compass className="h-5 w-5 text-[#D4AF37] opacity-80" />
                    )}
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-14 sm:ml-0 sm:w-1/2 ${
                      isEven ? "sm:pl-10 text-left" : "sm:pr-10 text-left sm:text-right"
                    }`}
                  >
                    <div
                      className={`rounded-2xl border p-6 transition-all duration-300 ${
                        isActive
                          ? "border-[#D4AF37]/50 bg-[#141A26] shadow-xl shadow-[#D4AF37]/10"
                          : isPlanned
                          ? "border-white/10 bg-[#0E131F]/70 border-dashed"
                          : "border-white/10 bg-[#101520]"
                      }`}
                    >
                      {/* Period Badge & Status */}
                      <div
                        className={`flex flex-wrap items-center gap-2 ${
                          isEven ? "justify-start" : "justify-start sm:justify-end"
                        }`}
                      >
                        <span className="rounded-full bg-[#8B1E1E]/30 px-3 py-1 text-xs font-bold text-[#D4AF37] border border-[#8B1E1E]/50">
                          {milestone.period}
                        </span>
                        <span className="text-[11px] text-neutral-400 font-medium">
                          {milestone.bengaliTag}
                        </span>
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                            milestone.status === "completed"
                              ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/40"
                              : isActive
                              ? "bg-amber-950/80 text-amber-300 border border-amber-800/40"
                              : "bg-blue-950/80 text-blue-300 border border-blue-800/40"
                          }`}
                        >
                          {milestone.status === "completed"
                            ? "Milestone"
                            : isActive
                            ? "Current Phase"
                            : "Future Ambition"}
                        </span>
                      </div>

                      <h3
                        className="mt-3 font-serif text-xl font-bold text-white"
                        style={{ fontFamily: "var(--font-serif, serif)" }}
                      >
                        {milestone.title}
                      </h3>

                      <div
                        className={`mt-1 flex items-center gap-1.5 text-xs text-neutral-400 ${
                          isEven ? "justify-start" : "justify-start sm:justify-end"
                        }`}
                      >
                        <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                        <span>{milestone.location}</span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                        {milestone.description}
                      </p>

                      <ul
                        className={`mt-4 space-y-1.5 text-xs text-neutral-400 ${
                          isEven ? "text-left" : "text-left sm:text-right"
                        }`}
                      >
                        {milestone.highlights.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Note on Future Ambitions */}
        <div className="mt-14 max-w-xl mx-auto rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center text-xs text-neutral-400">
          <p>
            <strong className="text-white">Authenticity Notice:</strong> We clearly distinguish
            completed milestones from future expansion goals. Delhi NCR and subsequent cities are
            part of our active roadmap, and operational details will be announced upon formal launch.
          </p>
        </div>
      </div>
    </section>
  );
}
