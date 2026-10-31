export interface Outlet {
  id: string;
  name: string;
  city: string;
  region: string;
  status: "active" | "coming-soon";
  model: string;
  swiggyUrl?: string;
  zomatoUrl?: string;
  coverageAreas: string[];
  timing: string;
  note?: string;
}

export const OUTLETS_DATA: Outlet[] = [
  {
    id: "blr-kitchen-01",
    name: "The Calcutta Cafe — Bangalore Central Hub",
    city: "Bangalore",
    region: "Karnataka",
    status: "active",
    model: "Cloud Kitchen & Delivery Hub",
    swiggyUrl: "https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore", // Client placeholder for verified outlet deep link
    zomatoUrl: "https://www.zomato.com/bangalore/the-calcutta-cafe", // Client placeholder for verified outlet deep link
    coverageAreas: [
      "Indiranagar",
      "Koramangala",
      "HSR Layout",
      "Domlur",
      "Old Airport Road",
      "Halasuru",
    ],
    timing: "11:30 AM – 11:00 PM (Every day)",
    note: "Serving hot, fresh Bengali bhoj delivered directly to your doorstep via Swiggy & Zomato.",
  },
  {
    id: "delhi-ncr-expansion",
    name: "The Calcutta Cafe — Delhi NCR Expansion",
    city: "Delhi NCR / Noida",
    region: "National Capital Region",
    status: "coming-soon",
    model: "Planned Cloud Kitchen Network",
    swiggyUrl: undefined,
    zomatoUrl: undefined,
    coverageAreas: [
      "Noida Sector 62 / Central",
      "South Delhi",
      "Gurugram Cyber Hub Corridor",
    ],
    timing: "Launch Phase in Progress",
    note: "Our next planned destination in our mission to bring the taste of Bengal closer to everyone across northern India.",
  },
  {
    id: "mumbai-pune-expansion",
    name: "The Calcutta Cafe — Western Region",
    city: "Mumbai & Pune",
    region: "Maharashtra",
    status: "coming-soon",
    model: "Future Expansion Phase",
    swiggyUrl: undefined,
    zomatoUrl: undefined,
    coverageAreas: ["Western Metro Hubs"],
    timing: "Future Horizon",
    note: "Part of our national vision to make Bengal's authentic culinary heritage accessible nationwide.",
  },
];
