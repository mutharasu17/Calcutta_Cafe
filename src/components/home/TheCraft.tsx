export default function TheCraft() {
  const moments = [
    {
      index: "I",
      phase: "Preparation",
      bengali: "উপকরণ",
      title: "The Raw Elements",
      description: "Whole panch phoron seeds, green chillies, and mustard paste prepared with care.",
    },
    {
      index: "II",
      phase: "Tempering",
      bengali: "ফোড়ন",
      title: "The Fire & Aromatics",
      description: "Mustard oil heated until aromatic, crackling whole spices to awaken their volatile oils.",
    },
    {
      index: "III",
      phase: "Braising",
      bengali: "কষানো",
      title: "Patience & Texture",
      description: "Unhurried reduction over gentle heat, allowing flavors to deepen naturally into velvety gravies.",
    },
    {
      index: "IV",
      phase: "Presentation",
      bengali: "পরিবেশন",
      title: "The Table Ritual",
      description: "Arranged with dignity on traditional serveware, respecting the sequence of the meal.",
    },
  ];

  return (
    <section className="relative py-28 lg:py-44 bg-[#171615] px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 lg:mb-24">
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#B79A65] block mb-3">
            The Culinary Discipline
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#FAF9F6] tracking-tight leading-[1.08]">
            The rhythm of the kitchen.
            <span className="block italic text-[#D8D0C3] font-normal">
              A sequence of moments.
            </span>
          </h2>
        </div>

        {/* Cinematic Grid of 4 Minimal Moments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {moments.map((m) => (
            <div
              key={m.index}
              className="group border-t border-white/[0.12] pt-6 flex flex-col justify-between h-full space-y-6"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#B79A65]">
                  <span>{m.index} • {m.phase}</span>
                  <span className="font-bengali text-[#D8D0C3]/60">{m.bengali}</span>
                </div>

                <h3 className="font-serif text-2xl font-light text-[#FAF9F6] mt-4 mb-2">
                  {m.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#D8D0C3]/80 font-light leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="h-[1px] w-6 bg-[#B79A65]/40 group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
