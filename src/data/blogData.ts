export interface BlogPost {
  slug: string;
  title: string;
  bengaliTitle?: string;
  subtitle: string;
  category: string;
  date: string;
  isoDate: string;
  readTime: string;
  author: string;
  image: string;
  excerpt: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      body: string[];
      quote?: string;
    }[];
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "beyond-sweets-bengali-vegetarian-genius",
    title: "Beyond Sweets: The Sophistication of Bengal's Vegetarian Heritage",
    bengaliTitle: "নিরামিষের অপার বৈচিত্র্য",
    subtitle: "Why the true test of a Bengali cook lies not in meat or fish, but in the subtle balance of a bitter Shukto or fragrant Mochar Ghonto.",
    category: "Culinary Heritage",
    date: "October 2026",
    isoDate: "2026-10-15",
    readTime: "5 min read",
    author: "The Calcutta Cafe Culinary Team",
    image: "/images/luchi-chholar-dal.jpg",
    excerpt: "While Bengal is celebrated for its river fish and slow-cooked mutton, the civilization's greatest culinary complexity arguably resides in its vegetable preparations.",
    content: {
      lead: "Travel to any home in Bengal, and the first question asked before lunch is not what meat was bought, but how fresh the vegetables from the morning bazaar were. The genius of Bengali vegetarian cooking lies in its reverent zero-waste philosophy and intricate progression of tastes.",
      sections: [
        {
          heading: "The Ritual of Shukto: Beginning with the Bitter",
          body: [
            "In Ayurvedic tradition and classical Bengali dining, a grand meal must always begin with a bitter note. Shukto is not just a dish—it is an art of delicate temperature and balancing contrasting botanicals.",
            "Raw plantain, tender drumsticks, sweet potato, and ridge gourd come together with crunchy lentil bori. The tempering uses radhuni (wild celery seed) and ginger juice, simmered with a touch of milk. It prepares the palate, stimulates digestion, and sets the stage for the feast to follow.",
          ],
          quote: "A feast that does not commence with Shukto lacks the foundational dignity of a true Bengali bhoj.",
        },
        {
          heading: "From Blossom to Stem: The Zero-Waste Philosophy",
          body: [
            "Long before farm-to-table and nose-to-tail became modern culinary buzzwords, Bengali home kitchens were utilizing every part of the plant. Banana blossoms become Mochar Ghonto, tender stems become Thor Chhenchki, and bottle gourd peels are crisped into fried delicacies.",
            "Spiced with panch phoron (the sacred five-spice blend of cumin, brown mustard, fenugreek, nigella, and fennel), each vegetable retains its distinct personality while elevating the whole.",
          ],
        },
      ],
    },
  },
  {
    slug: "the-sunday-kosha-mangsho-ritual",
    title: "The Sunday Kosha Mangsho Ritual: Iron Pots, Mustard Oil & Nostalgia",
    bengaliTitle: "রবিবারের মাংসের গন্ধ",
    subtitle: "How slow-cooking goat meat on Sunday afternoons became Bengal’s most enduring domestic ritual.",
    category: "Traditions & Memories",
    date: "September 2026",
    isoDate: "2026-09-15",
    readTime: "6 min read",
    author: "Akash Santra",
    image: "/images/kosha-mangsho.jpg",
    excerpt: "Few sounds in Bengal are as evocative as the whistling pressure cooker or the rhythmic scrape of a heavy ladle against a cast-iron kadai on a lazy Sunday morning.",
    content: {
      lead: "Sunday afternoon in a Bengali household carries a distinct rhythm. The morning starts with a trip to the local butcher, followed by patient slow-roasting of onions and whole spices until the kitchen fills with the deep aroma of caramelized sweetness and pungent mustard oil.",
      sections: [
        {
          heading: "The Alchemy of 'Koshano'",
          body: [
            "The word 'Kosha' denotes a cooking technique rather than a recipe. It means continuous, meditative braising over medium-low heat. Mutton is marinated in mustard oil, beaten yogurt, garlic paste, and crushed whole spices.",
            "In heavy iron cookware, the meat is coaxed over hours until the water content evaporates, leaving tender pieces draped in a rich, dark lacquer of concentrated flavor. No shortcuts, no artificial thickeners—only patience.",
          ],
          quote: "The large halved potato in the mutton curry is not an afterthought; in Bengal, it is the most coveted prize at the dining table.",
        },
        {
          heading: "Bridging Distance with Every Pot",
          body: [
            "For millions of Bengalis living in Bangalore, Delhi, Mumbai, and beyond, that specific aroma is the quickest bridge back to childhood memories. Bringing that authentic slow-cooked depth to cloud kitchens across India is the beating heart of The Calcutta Cafe.",
          ],
        },
      ],
    },
  },
  {
    slug: "shorshe-ilish-and-the-monsoon-hilsa-legend",
    title: "Shorshe Ilish: The Sacred Chemistry of Hilsa and Pungent Mustard",
    bengaliTitle: "ইলিশ ও সর্ষের যুগলবন্দী",
    subtitle: "Understanding why Hilsa is revered with quasi-religious devotion across Bengal.",
    category: "Culinary Heritage",
    date: "August 2026",
    isoDate: "2026-08-15",
    readTime: "4 min read",
    author: "The Calcutta Cafe Culinary Team",
    image: "/images/shorshe-ilish.jpg",
    excerpt: "The silver harvest of the monsoon rivers meets stone-ground mustard paste in Bengal's definitive culinary masterpiece.",
    content: {
      lead: "To understand Bengal, one must understand Ilish (Tenualosa ilisha). Migrating from the Bay of Bengal into the freshwater estuaries of the Padma, Meghna, and Hooghly rivers during the monsoon, the fish develops an incomparable layer of rich, sweet natural fat.",
      sections: [
        {
          heading: "The Stone-Ground Mustard Tradition",
          body: [
            "In authentic preparations, yellow and black mustard seeds are soaked and ground on a traditional flat grinding stone (shil-nora) with green chillies and a pinch of salt to prevent bitterness.",
            "When introduced to pure cold-pressed kachi ghani mustard oil, the resulting emulsion produces a sharp, sinuses-tingling warmth that perfectly cuts through the rich fattiness of the Hilsa.",
          ],
        },
      ],
    },
  },
];
