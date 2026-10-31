export interface BrandData {
  name: string;
  tagline: string;
  alternativeHeadline: string;
  founder: {
    name: string;
    role: string;
    experience: string;
    bio: string;
    message: string;
    image: string;
  };
  history: {
    foundedYear: number;
    originCity: string;
    model: string;
    expansionTarget: string;
  };
  mission: string;
  vision: string;
  philosophy: string;
  colors: {
    primaryRed: string;
    accentYellow: string;
    secondaryBlue: string;
    warmCream: string;
    charcoal: string;
  };
  socialLinks: {
    instagram: string;
    x: string;
  };
  unconfirmedGaps: string[];
}

export const BRAND_DATA: BrandData = {
  name: "The Calcutta Cafe",
  tagline: "Bringing the Taste of Bengal Closer to Everyone.",
  alternativeHeadline: "The Taste of Bengal, Beyond Boundaries.",
  founder: {
    name: "Akash Santra",
    role: "Founder, The Calcutta Cafe",
    experience: "8–9 years of customer experience industry background",
    bio: "With nearly a decade in the customer experience industry, Akash Santra founded The Calcutta Cafe around a profound passion for culinary authenticity and service excellence. Recognizing that Bengali food across India was often reduced to just a couple of sweet dishes or generic fish curries, he set out to build an ambitious, national culinary brand that celebrates Bengal's comprehensive gastronomic legacy.",
    message: "Bengali food is not merely about culinary techniques; it represents family nostalgia, Sunday family lunches, centuries-old mustard and panch phoron aromatics, and the comfort of homecoming. At The Calcutta Cafe, we are dedicated to presenting the full breadth of Bengal's kitchen—from the subtlest Shukto to the slow-simmered Kosha Mangsho—prepared with uncompromising purity and dependability. Our dream is that no matter which city you find yourself in across India, authentic Bengal is always just an order away.",
    image: "/images/akash-santra-founder.jpg",
  },
  history: {
    foundedYear: 2019,
    originCity: "Bangalore",
    model: "Cloud-kitchen-led business model",
    expansionTarget: "Delhi NCR and major metropolitan hubs across India",
  },
  mission: "To make the diverse world of Bengali cuisine accessible to people across India by bringing together traditional recipes, authentic flavours, quality ingredients and a dependable food experience.",
  vision: "To build a nationally recognised Bengali food brand that represents the diversity of Bengal's culinary heritage and makes its food culture available in cities across India.",
  philosophy: "Bengali cuisine deserves to be represented in its full diversity, not limited to a handful of well-known dishes. Food is not only about taste—it represents familiarity, culture, memories, traditions and meaningful experiences.",
  colors: {
    primaryRed: "#8B1E1E", // Deep Bengali Crimson
    accentYellow: "#D4AF37", // Warm Mustard Gold
    secondaryBlue: "#0E1B2E", // Kolkata Heritage Midnight
    warmCream: "#FAF6F0",
    charcoal: "#1A1615",
  },
  socialLinks: {
    instagram: "https://www.instagram.com/thecalcutta_cafe",
    x: "https://x.com/calcutta_cafe",
  },
  unconfirmedGaps: [
    "Final approved outlet-specific Swiggy & Zomato URLs",
    "Final approved menu item pricing & delivery packaging specs",
    "Exact operating addresses & customer service telephone",
    "Delhi NCR target launch dates (distinguished from active Bangalore hubs)",
    "Vector SVG file of client's original logo asset",
  ],
};
