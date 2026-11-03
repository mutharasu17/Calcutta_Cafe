/**
 * Safe client-side analytics helper for The Calcutta Cafe.
 * Integrates with Google Analytics (GA4) window.gtag and window.dataLayer without throwing errors if blocked or unset.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    } else {
      if (process.env.NODE_ENV === "development") {
        console.debug(`[Analytics Event: ${eventName}]`, params);
      }
    }
  } catch (err) {
    console.warn("[Analytics Warning]", err);
  }
}

/**
 * Specifically track food ordering outbound clicks to Swiggy or Zomato
 */
export function trackOrderClick(platform: "swiggy" | "zomato", outletName: string = "Bangalore Hub") {
  trackEvent("order_outbound_click", {
    platform,
    outlet: outletName,
    event_category: "ecommerce_lead",
    event_label: `Order on ${platform.toUpperCase()} — ${outletName}`,
  });
}

