"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogData";

export default function JournalGrid() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#F5EFE4] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold mb-2">
              <BookOpen className="h-3.5 w-3.5 text-[#B68A52]" />
              <span>The Bengal Journal • রসনা কথা</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Stories from the Kitchen.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed max-w-xl">
              Curated essays exploring Bengal&apos;s culinary rituals, seasonal traditions, and historical food memories.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A382B] hover:text-[#29251F] transition-colors border-b border-[#7A382B]/30 pb-1 self-start md:self-auto"
          >
            <span>Read All Articles</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Article Grid (Anand Sweets Inspired Blog Presentation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="group bg-[#FFFDF8] border border-[#E6D8C3] flex flex-col justify-between shadow-sm hover:border-[#7A382B] hover:shadow-md transition-all duration-300"
            >
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3]"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#FFFDF8]/95 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#7A382B] font-semibold border border-[#E6D8C3]">
                    {post.category}
                  </div>
                </Link>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B6357]">
                    <Clock className="h-3 w-3 text-[#7A382B]" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#29251F] font-normal group-hover:text-[#7A382B] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#E6D8C3]/60 mt-3 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[#6B6357]">
                  By {post.author}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold uppercase tracking-wider text-[#7A382B] group-hover:text-[#29251F] transition-colors flex items-center gap-1.5"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

