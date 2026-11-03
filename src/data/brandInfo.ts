export interface BrandData {
  name: string;
  legalName: string;
  tagline: string;
  campaignHeadline: string;
  closingStatement: string;
  founder: {
    name: string;
    role: string;
    experience: string;
    bio: string;
    approvedQuote: string;
    image: string;
  };
  history: {
    ideaYear: number;
    originCity: string;
    model: string;
    expansionTarget: string;
  };
  mission: string;
  vision: string;
  philosophy: string;
  colors: {
    bengaliPurple: string;
    goldenYellow: string;
    warmIvory: string;
    kraftPaper: string;
    darkBrown: string;
    ivory: string;
    sandstone: string;
    charcoal: string;
    mutedCharcoal: string;
    terracotta: string;
    deepLeaf: string;
    mutedBrass: string;
    white: string;
  };
  socialLinks: {
    instagram: string;
    x: string;
  };
}

export const BRAND_DATA: BrandData = {
  name: "The Calcutta Cafe",
  legalName: "The Calcutta Cafe Foods Pvt Ltd",
  tagline: "Bringing the Taste of Bengal Closer to Everyone.",
  campaignHeadline: "The Taste of Bengal, Beyond Boundaries.",
  closingStatement: "The Calcutta Cafe – A Taste of Bengal, Wherever You Are.",
  founder: {
    name: "Akash Santra",
    role: "Founder, The Calcutta Cafe",
    experience: "8–9 years of customer experience leadership",
    bio: "With nearly a decade in the customer experience industry, Akash Santra founded The Calcutta Cafe in 2019 around a quiet conviction: that the authentic, layered culinary world of Bengal deserves to be experienced in its true depth across India.",
    approvedQuote: "For us, The Calcutta Cafe is not just a business. It is a vision to take the taste of Bengal beyond borders.",
    image: "/images/brand/founder-akash-santra.jpeg",
  },
  history: {
    ideaYear: 2019,
    originCity: "Bangalore",
    model: "Cloud-kitchen-led business model",
    expansionTarget: "Delhi NCR and major Indian cities",
  },
  mission: "To make the diverse world of Bengali cuisine accessible to people across India by bringing together traditional recipes, authentic flavours, quality ingredients and a dependable food experience.",
  vision: "To become India's most loved, respected and expansive regional cuisine brand, known for authenticity, consistency and quality.",
  philosophy: "We believe Bengali cuisine is not a trend; it is a living civilizational heritage of freshwater rivers, seasonal harvests, and slow-braised homestyle rituals.",
  colors: {
    bengaliPurple: "#5B1B8A",
    goldenYellow: "#FFB834",
    warmIvory: "#FFF8ED",
    kraftPaper: "#D2B48C",
    darkBrown: "#2D231E",
    ivory: "#FFF8ED",
    sandstone: "#E6D8C3",
    charcoal: "#2D231E",
    mutedCharcoal: "#5C524B",
    terracotta: "#5B1B8A",
    deepLeaf: "#34483A",
    mutedBrass: "#FFB834",
    white: "#FFFFFF",
  },
  socialLinks: {
    instagram: "https://www.instagram.com/thecalcuttacafe.in",
    x: "https://x.com/thecalcuttacafe",
  },
};
