import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogData";

export default function JournalSection() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="relative py-20 sm:py-28 bg-[#F5EFE4] px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block mb-2">
              The Bengal Journal • প্রবন্ধমালা
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Stories from the Kitchen.
            </h2>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A382B] hover:text-[#29251F] transition-colors border-b border-[#7A382B]/30 pb-1 self-start md:self-auto"
          >
            <span>View All Articles</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Editorial Journal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-[#FFFFFF] border border-[#E6D8C3] shadow-sm flex flex-col justify-between overflow-hidden hover:border-[#7A382B]/50 transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center filter contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#F5EFE4]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#7A382B] font-semibold border border-[#E6D8C3]">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#6B6357]">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#29251F] font-normal leading-snug group-hover:text-[#7A382B] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#E6D8C3]/50">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7A382B] hover:text-[#29251F] transition-colors"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

