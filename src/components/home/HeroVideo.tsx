"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface HeroVideoProps {
  poster: string;
  videoSrc: string;
}

export default function HeroVideo({ poster, videoSrc }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for user preference for reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setPrefersReducedMotion(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay with muted audio (supported on iOS Safari and modern browsers)
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay policy prevented playback, fallback gracefully
          setIsPlaying(false);
        });
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

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#090909]">
      {/* ──────────────────────────────────────────────────────────
          1. POSTER / HIGH-RESOLUTION STATIC FALLBACK
          Always rendered underneath; visible during loading, error, or reduced-motion
      ────────────────────────────────────────────────────────── */}
      <Image
        src={poster}
        alt="The Calcutta Cafe — Bengali Culinary Heritage"
        fill
        priority
        sizes="100vw"
        className={`object-cover object-right sm:object-center filter brightness-[0.75] contrast-105 transition-opacity duration-1000 ${
          isLoaded && !prefersReducedMotion && !hasError ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* ──────────────────────────────────────────────────────────
          2. CINEMATIC HTML5 VIDEO ELEMENT
      ────────────────────────────────────────────────────────── */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover object-right sm:object-center filter brightness-[0.78] contrast-105 transition-opacity duration-1000 ${
            isLoaded && !hasError ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* ──────────────────────────────────────────────────────────
          3. CINEMATIC ATMOSPHERIC GRADIENTS & OBSIDIAN VIGNETTE
      ────────────────────────────────────────────────────────── */}
      {/* Bottom fade for content readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/75 to-[#090909]/30" />
      {/* Left-to-right gradient for headline negative space on desktop */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/80 to-transparent sm:via-[#090909]/60" />
      {/* Champagne atmospheric specular sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,172,131,0.08),transparent_60%)]" />
      {/* Micro-grain texture */}
      <div className="absolute inset-0 editorial-grain opacity-30 pointer-events-none" />

      {/* ──────────────────────────────────────────────────────────
          4. SUBTLE DESKTOP VIDEO CONTROLLER BADGE
      ────────────────────────────────────────────────────────── */}
      {isLoaded && !hasError && !prefersReducedMotion && (
        <div className="absolute top-28 right-6 sm:right-10 lg:right-16 z-20 hidden sm:flex items-center gap-2 border border-white/10 bg-[#090909]/60 backdrop-blur-md px-3 py-1.5 rounded-full">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause background food film" : "Play background food film"}
            className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-[#C7AC83] hover:text-[#F5F0E8] transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3 w-3 text-[#C7AC83]" />
                <span>Cinematic Film</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 text-[#C7AC83]" />
                <span>Play Film</span>
              </>
            )}
          </button>
          <span className="h-2 w-[1px] bg-white/20" />
          <span className="flex items-center text-[10px] font-mono text-[#A9A19A]/70 uppercase">
            <VolumeX className="h-3 w-3" />
          </span>
        </div>
      )}
    </div>
  );
}

