import { ShieldCheck, Flame, MapPin, Award } from "lucide-react";

const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "100% Heritage Recipes",
    description: "Centuries-old regional techniques preserved without commercial shortcuts or artificial additives.",
  },
  {
    icon: Flame,
    title: "Small-Batch Daily Cooking",
    description: "Prepared fresh every morning with cold-pressed mustard oil, radhuni, and whole roasted spices.",
  },
  {
    icon: MapPin,
    title: "Bangalore Delivery Hubs",
    description: "Express doorstep delivery across Bangalore via verified Swiggy and Zomato kitchens.",
  },
  {
    icon: Award,
    title: "Founded in 2019",
    description: "Created by Akash Santra to bring authentic Bengali culinary excellence beyond geographical boundaries.",
  },
];

export default function BrandTrustStrip() {
  return (
    <section className="bg-[#F5EFE4] py-8 sm:py-12 border-b border-[#E6D8C3] px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 bg-[#FFFDF8] border border-[#E6D8C3] shadow-sm"
              >
                <div className="h-10 w-10 rounded-none bg-[#7A382B]/10 border border-[#7A382B]/20 flex items-center justify-center flex-shrink-0 text-[#7A382B]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#29251F] font-semibold">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#6B6357] font-normal leading-relaxed mt-1">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

