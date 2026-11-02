"use client";

import { useState } from "react";

const FAVORITES_KEY = "calcutta_cafe_favorites";
const RECENT_KEY = "calcutta_cafe_recent";
const WELCOME_KEY = "calcutta_cafe_welcome_dismissed";

export function useFoodDiscovery() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isWelcomeDismissed, setIsWelcomeDismissed] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      return localStorage.getItem(WELCOME_KEY) === "true";
    } catch {
      return true;
    }
  });

  const isInitialized = true;

  const toggleFavorite = (dishId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(dishId)
        ? prev.filter((id) => id !== dishId)
        : [...prev, dishId];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isFavorite = (dishId: string) => favorites.includes(dishId);

  const addRecentlyViewed = (dishId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== dishId);
      const next = [dishId, ...filtered].slice(0, 10);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const dismissWelcome = () => {
    setIsWelcomeDismissed(true);
    try {
      localStorage.setItem(WELCOME_KEY, "true");
    } catch {}
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    recentlyViewed,
    addRecentlyViewed,
    isWelcomeDismissed,
    dismissWelcome,
    isInitialized,
  };
}

