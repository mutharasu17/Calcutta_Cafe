export interface MenuItem {
  id: string;
  name: string;
  bengaliName?: string;
  category: MenuCategory;
  description: string;
  image?: string;
  dietary: "veg" | "non-veg";
  spiceLevel: "mild" | "medium" | "high";
  isChefSpecial?: boolean;
  tags?: string[];
  price: number;
}

export type MenuCategory =
  | "fish-seafood"
  | "chicken-mutton"
  | "vegetarian"
  | "snacks-street"
  | "rice-meals"
  | "sweets-desserts"
  | "drinks";

export interface CategoryInfo {
  id: MenuCategory;
  name: string;
  bengaliSubtitle: string;
  description: string;
  image: string;
}

export const MENU_CATEGORIES: CategoryInfo[] = [
  {
    id: "fish-seafood",
    name: "Fish & Seafood",
    bengaliSubtitle: "মাছ ও সামুদ্রিক স্বাদ",
    description: "The soul of Bengal's waterways—fresh Hilsa, Bhetki, and Rui cooked in pungent mustard, five-spice broths, and banana leaf parcels.",
    image: "/images/shorshe-ilish.jpg",
  },
  {
    id: "chicken-mutton",
    name: "Chicken & Mutton",
    bengaliSubtitle: "মাংসের ঘরোয়া তৃপ্তি",
    description: "Legendary slow-cooked Sunday delights, velvety Kosha gravies, and Mughlai-inspired Calcutta Awadhi chaap.",
    image: "/images/kosha-mangsho.jpg",
  },
  {
    id: "vegetarian",
    name: "Vegetarian Delicacies",
    bengaliSubtitle: "নিরামিষের বৈচিত্র্য",
    description: "The overlooked genius of Bengal's vegetarian repertoire—from bitter-sweet Shukto to spiced banana blossom and fragrant Chholar Dal.",
    image: "/images/luchi-chholar-dal.jpg",
  },
  {
    id: "snacks-street",
    name: "Snacks & Street Food",
    bengaliSubtitle: "কলকাতার স্ট্রিট ফুড",
    description: "Crispy Nizam-style Kathi Rolls, crumb-fried chops, Kolkata puchkas, and steaming hot evening telebhaja.",
    image: "/images/kathi-roll.jpg",
  },
  {
    id: "rice-meals",
    name: "Rice & Complete Meals",
    bengaliSubtitle: "ভাত ও পঞ্চব্যঞ্জন",
    description: "Fragrant saffron Basanti Pulao, royal Kolkata Biryani with succulent potato, and wholesome comfort Bhoj thalis.",
    image: "/images/hero-bengali-bhoj.jpg",
  },
  {
    id: "sweets-desserts",
    name: "Sweets & Desserts",
    bengaliSubtitle: "বাংলার সেরা মিষ্টি",
    description: "Centuries of confectionary art—handcrafted Mishti Doi in clay pots, spongy syrupy Rosogolla, and artisanal Sandesh.",
    image: "/images/mishti-doi.jpg",
  },
  {
    id: "drinks",
    name: "Beverages & Refreshers",
    bengaliSubtitle: "পানীয় ও শরবত",
    description: "Fragrant Gondhoraj lime refreshers, spiced street-style Lebu Cha, and traditional summer buttermilk coolers.",
    image: "/images/hero-bengali-bhoj.jpg",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Fish & Seafood
  {
    id: "shorshe-ilish",
    name: "Shorshe Ilish",
    bengaliName: "সর্ষে ইলিশ",
    category: "fish-seafood",
    description: "The classic Bengali delicacy—Hilsa simmered in traditional mustard paste, seasoned with mustard oil and slit green chillies.",
    image: "/images/shorshe-ilish.jpg",
    dietary: "non-veg",
    spiceLevel: "high",
    isChefSpecial: true,
    tags: ["Signature", "Royal Classic", "Mustard Oil"],
    price: 495,
  },
  {
    id: "bhetki-paturi",
    name: "Bhetki Macher Paturi",
    bengaliName: "ভেটকি মাছের পাতুরি",
    category: "fish-seafood",
    description: "Boneless prime Kolkata Bhetki fillets marinated in coconut, poppy seeds (posto), and pungent mustard, wrapped in fresh banana leaves and gently pan-steamed.",
    image: "/images/shorshe-ilish.jpg",
    dietary: "non-veg",
    spiceLevel: "medium",
    isChefSpecial: true,
    tags: ["Banana Leaf Steamed", "Must-Try"],
    price: 425,
  },
  {
    id: "katla-kalia",
    name: "Rajarshir Katla Kalia",
    bengaliName: "কাতলা কালিয়া",
    category: "fish-seafood",
    description: "Rich, celebratory wedding-style fish curry prepared with prime Katla steaks in a luscious onion-ginger-raisin gravy with whole garam masala.",
    dietary: "non-veg",
    spiceLevel: "medium",
    tags: ["Festive Feast", "Traditional"],
    price: 365,
  },
  {
    id: "chingri-malai-curry",
    name: "Daab Chingri Malai Curry",
    bengaliName: "চিংড়ি মালাই কারি",
    category: "fish-seafood",
    description: "Jumbo fresh freshwater prawns cooked slowly inside silky tender coconut milk gravy delicately spiced with green cardamom and bay leaf.",
    dietary: "non-veg",
    spiceLevel: "mild",
    isChefSpecial: true,
    tags: ["Decadent", "Coconut Cream"],
    price: 465,
  },

  // Chicken & Mutton
  {
    id: "kosha-mangsho",
    name: "Traditional Kosha Mangsho",
    bengaliName: "কষা মাংস",
    category: "chicken-mutton",
    description: "Slow-cooked tender mutton curry prepared with aromatic roasted spices, garlic, and traditional brown gravy with potatoes.",
    image: "/images/kosha-mangsho.jpg",
    dietary: "non-veg",
    spiceLevel: "high",
    isChefSpecial: true,
    tags: ["Iconic", "Slow-Cooked", "Sunday Tradition"],
    price: 445,
  },
  {
    id: "kolkata-chicken-chaap",
    name: "Royal Kolkata Chicken Chaap",
    bengaliName: "চিকেন চাপ",
    category: "chicken-mutton",
    description: "Mughlai Calcutta culinary heirloom: whole chicken leg braised slowly in a rich paste of cashew, poppy seeds, mace, kewra, and roasted saffron ghee.",
    dietary: "non-veg",
    spiceLevel: "mild",
    isChefSpecial: true,
    tags: ["Awadhi Heritage", "Slow-Braised"],
    price: 345,
  },
  {
    id: "murgir-jhol",
    name: "Robibarer Murgir Jhol",
    bengaliName: "রবিবারের মুরগির পাতলা ঝোল",
    category: "chicken-mutton",
    description: "Homestyle comfort Sunday chicken curry with tender farm poultry and golden halved potatoes in a fragrant, ginger-cumin broth that pairs effortlessly with steaming rice.",
    dietary: "non-veg",
    spiceLevel: "medium",
    tags: ["Comfort Classic", "Home Recipe"],
    price: 325,
  },

  // Vegetarian
  {
    id: "traditional-shukto",
    name: "Anusthan-Barir Shukto",
    bengaliName: "অনুষ্ঠান বাড়ির শুক্তো",
    category: "vegetarian",
    description: "Traditional palate-cleanser opening course: bitter gourd, raw banana, drumstick, sweet potato, and crunchy lentil dumplings (bori) simmered in a milk and wild celery (radhuni) broth.",
    image: "/images/luchi-chholar-dal.jpg",
    dietary: "veg",
    spiceLevel: "mild",
    isChefSpecial: true,
    tags: ["Ayurvedic Roots", "Traditional Opener"],
    price: 245,
  },
  {
    id: "chholar-dal-luchi",
    name: "Narkel Diye Chholar Dal with Luchi",
    bengaliName: "লুচি ও নারকেল দিয়ে ছোলার ডাল",
    category: "vegetarian",
    description: "Four hot, puffed refined-flour Luchis served with slow-cooked Bengal gram tempered with cumin, cinnamon, green chillies, and fried coconut slices.",
    image: "/images/luchi-chholar-dal.jpg",
    dietary: "veg",
    spiceLevel: "mild",
    isChefSpecial: true,
    tags: ["Breakfast & Festive", "All-Time Favorite"],
    price: 225,
  },
  {
    id: "dhokar-dalna",
    name: "Niramish Dhokar Dalna",
    bengaliName: "ধোঁকার ডালনা",
    category: "vegetarian",
    description: "Spiced chana dal cakes steamed, fried golden, and then simmered in a satvik no-onion, no-garlic tomato-ginger gravy spiced with hing and garam masala.",
    dietary: "veg",
    spiceLevel: "medium",
    tags: ["No Onion No Garlic", "Pure Vegetarian"],
    price: 245,
  },
  {
    id: "mochar-ghonto",
    name: "Narkel Bori Diye Mochar Ghonto",
    bengaliName: "মোচার ঘণ্ট",
    category: "vegetarian",
    description: "Finely minced tender banana blossoms tempered with five spices, fried lentil crisps, and freshly grated coconut.",
    dietary: "veg",
    spiceLevel: "medium",
    tags: ["Heritage Recipe", "Artisanal Prep"],
    price: 265,
  },

  // Snacks & Street Food
  {
    id: "egg-chicken-kathi-roll",
    name: "Original Kolkata Egg Chicken Kathi Roll",
    bengaliName: "কলকাতা কাঠি রোল",
    category: "snacks-street",
    description: "Flaky pan-griddled layered paratha lined with whipped farm egg, stuffed with tandoori charcoal-smoked chicken boti, pickled shallots, sliced green chillies, and fresh lime juice.",
    image: "/images/kathi-roll.jpg",
    dietary: "non-veg",
    spiceLevel: "medium",
    isChefSpecial: true,
    tags: ["New Market Classic", "Street Pioneer"],
    price: 195,
  },
  {
    id: "kolkata-fish-fry",
    name: "Diamond Fish Fry with Kasundi",
    bengaliName: "ডায়মন্ড ফিশ ফ্রাই ও কাসুন্দি",
    category: "snacks-street",
    description: "Fresh Bhetki fillet marinated in green herbs, crumb-coated with Kolkata bakery biscuit crumbs and fried to golden crispness. Served with sharp mustard Kasundi.",
    dietary: "non-veg",
    spiceLevel: "medium",
    isChefSpecial: true,
    tags: ["Cabin Heritage", "Crispy Delicacy"],
    price: 285,
  },
  {
    id: "dimer-devil",
    name: "Colonial Dimer Devil",
    bengaliName: "ডিমের ডেভিল",
    category: "snacks-street",
    description: "Hard-boiled eggs encased in spiced minced mutton and potato mash, double crumb-coated and crisped to golden bronze.",
    dietary: "non-veg",
    spiceLevel: "medium",
    tags: ["British-Raj Kolkata", "Evening Snack"],
    price: 175,
  },

  // Rice & Complete Meals
  {
    id: "basanti-pulao",
    name: "Gobindobhog Basanti Pulao",
    bengaliName: "বাসন্তী পোলাও",
    category: "rice-meals",
    description: "Aromatic short-grain Gobindobhog rice cooked with saffron strands, whole spices, fried cashews, and golden raisins in pure ghee. Naturally fragrant and gently sweet.",
    image: "/images/hero-bengali-bhoj.jpg",
    dietary: "veg",
    spiceLevel: "mild",
    isChefSpecial: true,
    tags: ["Gobindobhog Rice", "Celebration Classic"],
    price: 245,
  },
  {
    id: "kolkata-mutton-biryani",
    name: "Calcutta Dum Biryani (Mutton & Aloo)",
    bengaliName: "কলকাতা মটন বিরিয়ানি",
    category: "rice-meals",
    description: "Long-grain aged basmati layered with fall-apart tender mutton, melt-in-mouth slow-braised golden potato, and soft boiled egg in subtle saffron and meetha ittar perfumed broth.",
    dietary: "non-veg",
    spiceLevel: "medium",
    isChefSpecial: true,
    tags: ["With Iconic Potato", "Dum Pukht Style"],
    price: 395,
  },
  {
    id: "complete-bhoj-thali",
    name: "The Calcutta Cafe Mahabhoj",
    bengaliName: "মহভোজ থালি",
    category: "rice-meals",
    description: "A complete grand ceremonial meal: Basanti Pulao, Steamed Rice, Shukto, Chholar Dal with Luchi, Choice of Shorshe Ilish or Kosha Mangsho, Chutney, Papad, and Earthen Mishti Doi.",
    image: "/images/hero-bengali-bhoj.jpg",
    dietary: "non-veg",
    spiceLevel: "medium",
    isChefSpecial: true,
    tags: ["Grand Banquet", "Complete Experience"],
    price: 595,
  },

  // Sweets & Desserts
  {
    id: "traditional-mishti-doi",
    name: "Haringhata-Style Claypot Mishti Doi",
    bengaliName: "মাটির ভাঁড়ের মিষ্টি দই",
    category: "sweets-desserts",
    description: "Thick, silky yogurt sweetened with dark caramelized sugarcane and date-palm jaggery, set in porous terracotta pots that impart an earthy aroma.",
    image: "/images/mishti-doi.jpg",
    dietary: "veg",
    spiceLevel: "mild",
    isChefSpecial: true,
    tags: ["Set in Earthen Pots", "Legendary"],
    price: 145,
  },
  {
    id: "baked-rosogolla",
    name: "Kolkata Baked Rosogolla",
    bengaliName: "বেকড রসগোল্লা",
    category: "sweets-desserts",
    description: "Fresh chenna dumplings drenched in thickened reduced saffron milk (rabri) and baked until the crust turns golden-brown with a gentle caramel finish.",
    image: "/images/mishti-doi.jpg",
    dietary: "veg",
    spiceLevel: "mild",
    tags: ["Warm Dessert", "Chef Pick"],
    price: 165,
  },
  {
    id: "nolen-gurer-sandesh",
    name: "Artisanal Nolen Gurer Sandesh",
    bengaliName: "নলেন গুড়ের সন্দেশ",
    category: "sweets-desserts",
    description: "Molded cottage cheese delicacies made using winter date-palm jaggery (Nolen Gur) harvested before sunrise in Bengal's countryside.",
    dietary: "veg",
    spiceLevel: "mild",
    tags: ["Seasonal Luxury", "Artisanal"],
    price: 185,
  },

  // Drinks
  {
    id: "gondhoraj-ghol",
    name: "Chilled Gondhoraj Ghol",
    bengaliName: "গন্ধরাজ লেবুর ঘোল",
    category: "drinks",
    description: "Traditional spiced churned buttermilk infused with the unmatched citrus perfume of fresh Kolkata Gondhoraj king-lime, mint, and black rock salt.",
    dietary: "veg",
    spiceLevel: "mild",
    isChefSpecial: true,
    tags: ["Gondhoraj Lime", "Summer Elixir"],
    price: 125,
  },
  {
    id: "kolkata-lebu-cha",
    name: "Kolkata Street-Style Lebu Cha",
    bengaliName: "লেবু চা",
    category: "drinks",
    description: "Steaming spiced black tea with roasted cumin-coriander spice blend (bit-noon) and freshly squeezed lime.",
    dietary: "veg",
    spiceLevel: "mild",
    tags: ["College Street Vibe", "Digestive"],
    price: 75,
  },
];
