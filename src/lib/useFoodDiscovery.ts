"use client";

import { useState, useEffect } from "react";

const FAVORITES_KEY = "calcutta_cafe_favorites";
const RECENT_KEY = "calcutta_cafe_recent";
const WELCOME_KEY = "calcutta_cafe_welcome_dismissed";

export function useFoodDiscovery() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [isWelcomeDismissed, setIsWelcomeDismissed] = useState(true); // default true for SSR
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem(FAVORITES_KEY);
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }

      const storedRecent = localStorage.getItem(RECENT_KEY);
      if (storedRecent) {
        setRecentlyViewed(JSON.parse(storedRecent));
      }

      const dismissed = localStorage.getItem(WELCOME_KEY) === "true";
      setIsWelcomeDismissed(dismissed);
    } catch {
      // LocalStorage unavailable
    }
    setIsInitialized(true);
  }, []);

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

