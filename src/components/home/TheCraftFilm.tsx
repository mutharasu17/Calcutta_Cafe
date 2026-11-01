"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, VolumeX } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";

export default function TheCraftFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setPrefersReducedMotion(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const moments = [
    {
      index: "I",
      phase: "Preparation",
      bengali: "উপকরণ",
      title: "The Raw Elements",
      description: "Whole panch phoron seeds, green chillies, and mustard paste prepared fresh.",
    },
    {
      index: "II",
      phase: "Tempering",
      bengali: "ফোড়ন",
      title: "Fire & Aromatics",
      description: "Mustard oil heated until aromatic, awakening whole spices to release their volatile oils.",
    },
    {
      index: "III",
      phase: "Braising",
      bengali: "কষানো",
      title: "Patience & Depth",
      description: "Unhurried reduction over steady heat, allowing flavors to meld into deep, velvety gravies.",
    },
    {
      index: "IV",
      phase: "Presentation",
      bengali: "পরিবেশন",
      title: "The Table Ritual",
      description: "Served on traditional tableware, respecting the authentic course sequence of a Bengali meal.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 lg:py-40 bg-[#090909] px-6 sm:px-10 lg:px-16 border-t border-white/[0.08] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#C7AC83] block mb-2 sm:mb-3">
              The Culinary Discipline
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F5F0E8] tracking-tight leading-[1.08]">
              The craft in motion.
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#A9A19A] font-light leading-relaxed">
            Authentic Bengali cooking is unhurried. Slow braising, precise spice tempering, and fragrant aromatic reduction create its unmistakable character.
          </p>
        </div>

        {/* ──────────────────────────────────────────────────────────
            CINEMATIC CRAFT VIDEO STAGE
        ────────────────────────────────────────────────────────── */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden border border-white/[0.12] bg-[#151313] mb-12 sm:mb-16 shadow-2xl">
          {/* High-res static fallback */}
          <Image
            src="/images/kosha-mangsho.jpg"
            alt="The Craft of Bengal Kitchen — The Calcutta Cafe"
            fill
            sizes="100vw"
            className={`object-cover object-center filter brightness-[0.75] contrast-105 transition-opacity duration-700 ${
              isLoaded && !prefersReducedMotion ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />

          {!prefersReducedMotion && (
            <video
              ref={videoRef}
              src="/videos/craft-stew-service.mp4"
              poster="/images/kosha-mangsho.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setIsLoaded(true)}
              className={`h-full w-full object-cover object-center filter brightness-[0.85] contrast-105 transition-opacity duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Vignette overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]/40" />

          {/* Video Control & Status Overlay */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-3">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause craft film" : "Play craft film"}
              className="flex items-center gap-2 border border-white/20 bg-[#090909]/80 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase text-[#C7AC83] hover:text-[#F5F0E8] transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3 w-3 text-[#C7AC83]" />
                  <span>The Craft Film</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 text-[#C7AC83]" />
                  <span>Resume Film</span>
                </>
              )}
            </button>
            <span className="hidden sm:inline-flex items-center text-[10px] font-mono text-[#A9A19A]/80 uppercase bg-[#090909]/60 px-2 py-1">
              <VolumeX className="h-3 w-3 mr-1" />
              Direct Kitchen Reel
            </span>
          </div>
        </div>

        {/* 4 Glass Discipline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {moments.map((m) => (
            <GlassPanel
              key={m.index}
              variant="subtle"
              hoverEffect
              className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6 sm:space-y-8"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#C7AC83]">
                  <span>{m.index} • {m.phase}</span>
                  <span className="font-bengali text-[#A9A19A]/60">{m.bengali}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-light text-[#F5F0E8] mt-5 mb-2.5">
                  {m.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A9A19A] font-light leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="h-[1px] w-8 bg-[#C7AC83]/40" />
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
