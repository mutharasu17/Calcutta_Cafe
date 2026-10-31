export interface Outlet {
  id: string;
  name: string;
  city: string;
  region: string;
  status: "active" | "planned";
  model: string;
  swiggyUrl?: string;
  zomatoUrl?: string;
  note: string;
}

export const OUTLETS_DATA: Outlet[] = [
  {
    id: "blr-hub",
    name: "The Calcutta Cafe — Bangalore Hub",
    city: "Bangalore",
    region: "Karnataka",
    status: "active",
    model: "Cloud Kitchen & Delivery",
    swiggyUrl: "https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore",
    zomatoUrl: "https://www.zomato.com/bangalore/the-calcutta-cafe",
    note: "Operational hub serving Bengali culinary classics delivered fresh via official Swiggy and Zomato partners.",
  },
  {
    id: "delhi-ncr",
    name: "The Calcutta Cafe — Delhi NCR",
    city: "Delhi NCR / Noida",
    region: "National Capital Region",
    status: "planned",
    model: "Planned Cloud Kitchen",
    swiggyUrl: undefined,
    zomatoUrl: undefined,
    note: "Expansion destination in active planning to bring authentic Bengal flavours to northern India.",
  },
  {
    id: "pan-india",
    name: "The Calcutta Cafe — Metros",
    city: "Pan-India Expansion",
    region: "National Ambition",
    status: "planned",
    model: "Future Expansion",
    swiggyUrl: undefined,
    zomatoUrl: undefined,
    note: "Our long-term journey to introduce the comprehensive culinary heritage of Bengal across major Indian cities.",
  },
];
