import GlassPanel from "../ui/GlassPanel";

export default function TheCraftFilm() {
  const moments = [
    {
      index: "I",
      phase: "Preparation",
      bengali: "উপকরণ",
      title: "The Raw Elements",
      description: "Whole panch phoron seeds, green chillies, and mustard paste prepared fresh.",
    },
    {
      index: "II",
      phase: "Tempering",
      bengali: "ফোড়ন",
      title: "Fire & Aromatics",
      description: "Mustard oil heated until aromatic, awakening whole spices to release their volatile oils.",
    },
    {
      index: "III",
      phase: "Braising",
      bengali: "কষানো",
      title: "Patience & Depth",
      description: "Unhurried reduction over steady heat, allowing flavors to meld into deep, velvety gravies.",
    },
    {
      index: "IV",
      phase: "Presentation",
      bengali: "পরিবেশন",
      title: "The Table Ritual",
      description: "Served on traditional tableware, respecting the authentic course sequence of a Bengali meal.",
    },
  ];

  return (
    <section className="relative py-28 lg:py-40 bg-[#090909] px-6 sm:px-10 lg:px-16 border-t border-white/[0.08] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#C7AC83] block mb-3">
            The Culinary Discipline
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#F5F0E8] tracking-tight leading-[1.08]">
            The rhythm of the kitchen.
          </h2>
        </div>

        {/* 4 Glass Discipline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {moments.map((m) => (
            <GlassPanel
              key={m.index}
              variant="subtle"
              hoverEffect
              className="p-8 flex flex-col justify-between h-full space-y-8"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#C7AC83]">
                  <span>{m.index} • {m.phase}</span>
                  <span className="font-bengali text-[#A9A19A]/60">{m.bengali}</span>
                </div>

                <h3 className="font-serif text-2xl font-light text-[#F5F0E8] mt-6 mb-3">
                  {m.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A9A19A] font-light leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="h-[1px] w-8 bg-[#C7AC83]/40" />
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

