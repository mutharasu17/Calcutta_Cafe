"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, VolumeX } from "lucide-react";

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

  const courses = [
    {
      roman: "I",
      title: "The Gentle Opening",
      bengali: "তিক্ত ও শাক",
      desc: "Traditional Bengali dining opens with gentle bitters like Shukto to awaken the palate before richer courses arrive.",
    },
    {
      roman: "II",
      title: "Aromatic Comfort",
      bengali: "ডাল ও ভাজা",
      desc: "Warm Basmati or Gobindobhog rice paired with spiced Chholar Dal, crisp fritters, and fragrant whole-spice tempering.",
    },
    {
      roman: "III",
      title: "Heritage Centrepieces",
      bengali: "মাছ ও মাংস",
      desc: "The crescendo: delicate river Hilsa in pungent mustard sauce, alongside slow-cooked Sunday Kosha Mangsho curries.",
    },
    {
      roman: "IV",
      title: "Earthen Sweetness",
      bengali: "মিষ্টি মুখ",
      desc: "Concluding with caramelised Mishti Doi in clay pots and warm, spongy Rosogolla crafted according to centuries of confectionery tradition.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-[#E6D8C3] px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-[#D8C7B0]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block mb-2">
              The Dining Tradition • পঞ্চব্যঞ্জন
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              The Bengali Food Experience.
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed">
            In Bengal, a meal is a harmonious ritual served in distinct sequential courses, each celebrating balanced flavor and regional heritage.
          </p>
        </div>

        {/* ──────────────────────────────────────────────────────────
            INTEGRATED CULINARY VIDEO STAGE
        ────────────────────────────────────────────────────────── */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#F5EFE4] shadow-xl border border-[#D8C7B0] mb-12 sm:mb-16">
          <Image
            src="/images/kolkata-heritage-story.jpg"
            alt="The Heritage of Bengal Dining"
            fill
            sizes="100vw"
            className={`object-cover object-center filter brightness-[0.95] contrast-[1.02] transition-opacity duration-700 ${
              isLoaded && !prefersReducedMotion ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />

          {!prefersReducedMotion && (
            <video
              ref={videoRef}
              src="/videos/craft-stew-service.mp4"
              poster="/images/kolkata-heritage-story.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setIsLoaded(true)}
              className={`h-full w-full object-cover object-center filter brightness-[0.95] contrast-[1.02] transition-opacity duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Video Control Bar */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-3 bg-[#F5EFE4]/90 backdrop-blur-sm px-3.5 py-1.5 border border-[#D8C7B0] text-[10px] font-mono tracking-widest text-[#29251F]">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause culinary video" : "Play culinary video"}
              className="flex items-center gap-1.5 text-[#7A382B] hover:text-[#29251F] transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3 w-3" />
                  <span>The Craft Film</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" />
                  <span>Resume Film</span>
                </>
              )}
            </button>
            <span className="text-[#6B6357]/40">|</span>
            <span className="flex items-center text-[#6B6357]">
              <VolumeX className="h-3 w-3 mr-0.5" />
              <span>Muted</span>
            </span>
          </div>
        </div>

        {/* 4 Sequential Dining Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((c) => (
            <div
              key={c.roman}
              className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#D8C7B0] shadow-sm flex flex-col justify-between h-full space-y-6"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#7A382B] font-semibold">
                  <span>Course {c.roman}</span>
                  <span className="font-bengali text-[#6B6357]">{c.bengali}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#29251F] mt-4 mb-2">
                  {c.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="h-[2px] w-8 bg-[#7A382B]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
