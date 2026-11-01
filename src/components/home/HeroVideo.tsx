"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause, VolumeX } from "lucide-react";

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

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#E6D8C3] shadow-xl border border-[#E6D8C3]">
      {/* High-res static poster image */}
      <Image
        src={poster}
        alt="The Taste of Bengal — Bengali Bhoj Feast"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 60vw"
        className={`object-cover object-center filter brightness-[0.95] contrast-[1.02] transition-opacity duration-700 ${
          isLoaded && !prefersReducedMotion && !hasError ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* HTML5 video element */}
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
          className={`h-full w-full object-cover object-center filter brightness-[0.95] contrast-[1.02] transition-opacity duration-700 ${
            isLoaded && !hasError ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Subtle warm corner film badge */}
      {isLoaded && !hasError && !prefersReducedMotion && (
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-[#F5EFE4]/90 backdrop-blur-sm px-3 py-1.5 border border-[#E6D8C3] text-[10px] font-mono tracking-widest text-[#29251F]">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause cinematic culinary film" : "Play cinematic culinary film"}
            className="flex items-center gap-1.5 text-[#7A382B] hover:text-[#29251F] transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3 w-3" />
                <span>Cinematic Reel</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                <span>Play Reel</span>
              </>
            )}
          </button>
          <span className="text-[#6B6357]/40">|</span>
          <span className="flex items-center text-[#6B6357]">
            <VolumeX className="h-3 w-3 mr-0.5" />
            <span>Muted</span>
          </span>
        </div>
      )}
    </div>
  );
}
