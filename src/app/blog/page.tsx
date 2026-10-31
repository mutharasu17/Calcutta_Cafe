import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { BLOG_POSTS } from "@/data/blogData";
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from "lucide-react";

export const metadata = {
  title: "Food Heritage & Stories | The Calcutta Cafe Blog",
  description:
    "Explore the deep culinary culture, seasonal rituals, and time-honored cooking secrets of Bengal. Curated by The Calcutta Cafe.",
};

export default function BlogListPage() {
  return (
    <div className="relative pt-28 pb-24 bg-[#0A0E17]">
      {/* Header Banner */}
      <section className="relative py-16 lg:py-20 border-b border-white/10 bg-[#080C14]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#161D2B]/90 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-5">
            <BookOpen className="h-3.5 w-3.5" />
            <span>আমাদের কথকতা • The Bengal Food Chronicle</span>
          </div>

          <h1
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAF6F0]"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            Stories from{" "}
            <span className="text-gold-gradient italic font-normal">
              Bengal&apos;s Culinary Heritage
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base text-neutral-300">
            Unraveling the history of mustard, monsoon Hilsa migrations, the sacred zero-waste
            philosophy of vegetarian Bengal, and the art of afternoon Mishti.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#121622] shadow-xl transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#8B1E1E]/20"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 rounded-full glass-panel px-3 py-1 text-[11px] font-semibold text-[#D4AF37]">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2
                    className="mt-3 font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-serif, serif)" }}
                  >
                    {post.title}
                  </h2>

                  {post.bengaliTitle && (
                    <p className="mt-1 text-xs text-[#D4AF37]/80 font-medium">
                      {post.bengaliTitle}
                    </p>
                  )}

                  <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Article CTA */}
              <div className="p-6 sm:p-7 pt-0 border-t border-white/5">
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] group-hover:text-white transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
