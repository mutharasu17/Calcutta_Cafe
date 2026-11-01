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
    image: "/images/akash-santra-founder.jpg",
  },
  history: {
    ideaYear: 2019,
    originCity: "Bangalore",
    model: "Cloud-kitchen-led business model",
    expansionTarget: "Delhi NCR and major Indian cities",
  },
  mission: "To make the diverse world of Bengali cuisine accessible to people across India by bringing together traditional recipes, authentic flavours, quality ingredients and a dependable food experience.",
  vision: "To build a nationally recognised Bengali food brand that represents the diversity of Bengal's culinary heritage and makes its food culture available in cities across India.",
  philosophy: "Bengali cuisine deserves to be represented in its full diversity, not limited to a handful of well-known dishes. Food is not only about taste—it represents familiarity, culture, memories, traditions and meaningful experiences.",
  colors: {
    ivory: "#F5EFE4",
    sandstone: "#E6D8C3",
    charcoal: "#29251F",
    mutedCharcoal: "#6B6357",
    terracotta: "#7A382B",
    deepLeaf: "#34483A",
    mutedBrass: "#B68A52",
    white: "#FFFFFF",
  },
  socialLinks: {
    instagram: "https://www.instagram.com/thecalcutta_cafe",
    x: "https://x.com/calcutta_cafe",
  },
};
