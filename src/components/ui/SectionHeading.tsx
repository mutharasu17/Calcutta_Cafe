interface SectionHeadingProps {
  eyebrow?: string;
  bengaliEyebrow?: string;
  title: string;
  highlightedWord?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  bengaliEyebrow,
  title,
  highlightedWord,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`max-w-3xl ${
        isCentered ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {/* Eyebrow badge */}
      {(eyebrow || bengaliEyebrow) && (
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#161D2A] px-3.5 py-1 text-xs font-medium tracking-widest text-[#D4AF37] uppercase mb-4 shadow-sm ${
            isCentered ? "mx-auto" : ""
          }`}
        >
          {bengaliEyebrow && (
            <span className="font-normal text-[#FAF6F0]/80">
              {bengaliEyebrow}
            </span>
          )}
          {bengaliEyebrow && eyebrow && (
            <span className="h-1 w-1 rounded-full bg-[#8B1E1E]" />
          )}
          {eyebrow && <span>{eyebrow}</span>}
        </div>
      )}

      {/* Main Title */}
      <h2
        className="font-serif text-3xl font-bold tracking-tight text-[#FAF6F0] sm:text-4xl lg:text-5xl leading-[1.15]"
        style={{ fontFamily: "var(--font-serif, serif)" }}
      >
        {title}{" "}
        {highlightedWord && (
          <span className="text-gold-gradient font-normal italic">
            {highlightedWord}
          </span>
        )}
      </h2>

      {/* Subtitle / Description */}
      {description && (
        <p className="mt-4 text-base leading-relaxed text-neutral-300 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
