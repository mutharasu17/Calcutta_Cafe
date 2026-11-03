import Link from "next/link";
import { ArrowRight, Compass, Sparkles } from "lucide-react";

export const metadata = {
  title: "Page Not Found — 404 | The Calcutta Cafe",
  description:
    "The page you are looking for has been moved or does not exist. Explore The Calcutta Cafe's authentic Bengali menu and stories.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FFF8ED] px-4 py-24 sm:py-32 text-[#292321]">
      <div className="mx-auto max-w-2xl text-center space-y-6 sm:space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#8E171D]/20 text-[#8E171D] text-xs font-mono uppercase tracking-[0.25em] shadow-xs">
          <Sparkles className="h-3 w-3 text-[#C49A55]" />
          <span>Error 404 • পাতাটি পাওয়া যায়নি</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl text-[#292321] font-normal tracking-tight leading-[1.08]">
          This Course Seems to Have Wandered.
        </h1>

        <p className="font-bengali text-lg text-[#8E171D] font-medium">
          আপনি যে পাতাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা বিদ্যমান নেই।
        </p>

        <p className="text-sm sm:text-base text-[#5C524B] font-sans leading-relaxed max-w-lg mx-auto">
          The culinary journey continues across our table. Return to our main dining room or browse our complete Bengali menu.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8E171D] text-[#FFF8ED] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#A9272D] transition-colors shadow-sm"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#C49A55]" />
          </Link>

          <Link
            href="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#292321] border border-[#8E171D]/30 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] hover:border-[#8E171D] hover:text-[#8E171D] transition-colors shadow-2xs"
          >
            <Compass className="h-3.5 w-3.5 text-[#8E171D]" />
            <span>Explore Menu</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-[#5C524B] hover:text-[#8E171D] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            <span>Contact Kitchen</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

