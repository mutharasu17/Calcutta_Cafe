import React from "react";

interface OrganizationJsonLdProps {
  url?: string;
}

export function OrganizationJsonLd({ url = "https://thecalcuttacafe.com" }: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Calcutta Cafe",
    legalName: "The Calcutta Cafe Foods Pvt Ltd",
    url,
    logo: `${url}/images/brand/logo.jpeg`,
    foundingDate: "2019",
    founder: {
      "@type": "Person",
      name: "Akash Santra",
      jobTitle: "Founder & Culinary Steward",
    },
    sameAs: [
      "https://www.instagram.com/thecalcuttacafe.in",
      "https://x.com/thecalcuttacafe",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+91 96251 77650",
      email: "social@thecalcuttacafe.com",
      areaServed: "IN",
      availableLanguage: ["English", "Bengali", "Hindi"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function RestaurantJsonLd({ url = "https://thecalcuttacafe.com" }: { url?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "FoodEstablishment"],
    "@id": `${url}/#restaurant`,
    name: "The Calcutta Cafe",
    image: [
      `${url}/images/hero-bengali-bhoj.jpg`,
      `${url}/images/kosha-mangsho.jpg`,
      `${url}/images/shorshe-ilish.jpg`,
    ],
    description:
      "Authentic regional Bengali gastronomy presented with warm editorial sophistication. Cloud kitchen hubs operating in Bangalore serving Shorshe Ilish, Kosha Mangsho, and artisanal Mishti Doi.",
    url,
    telephone: "+91 96251 77650",
    email: "social@thecalcuttacafe.com",
    servesCuisine: ["Bengali", "Regional Indian", "Kolkata"],
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Credit Card, Debit Card, UPI, Net Banking",
    hasMenu: `${url}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "80 Feet Road, 4th Block, Koramangala",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      postalCode: "560034",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9352,
      longitude: 77.6245,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:30",
        closes: "23:00",
      },
    ],
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/order`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd({ url = "https://thecalcuttacafe.com" }: { url?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: "The Calcutta Cafe",
    description: "The Taste of Bengal, Beyond Boundaries.",
    publisher: {
      "@id": `${url}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  author: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image,
    url,
    datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "The Calcutta Cafe",
      logo: {
        "@type": "ImageObject",
        url: "https://thecalcuttacafe.com/images/brand/logo.jpeg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function MenuJsonLd({
  url = "https://thecalcuttacafe.com/menu",
  categories,
  items,
}: {
  url?: string;
  categories: { id: string; name: string }[];
  items: {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    image?: string;
  }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": url,
    name: "The Calcutta Cafe Repertoire Menu",
    description: "Regional Bengali culinary classics prepared fresh in Bangalore.",
    inLanguage: "en-IN",
    hasMenuSection: categories.map((cat) => ({
      "@type": "MenuSection",
      name: cat.name,
      hasMenuItem: items
        .filter((item) => item.category === cat.id)
        .map((dish) => ({
          "@type": "MenuItem",
          name: dish.name,
          description: dish.description,
          offers: {
            "@type": "Offer",
            price: dish.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
          ...(dish.image
            ? {
                image: `https://thecalcuttacafe.com${dish.image}`,
              }
            : {}),
        })),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

