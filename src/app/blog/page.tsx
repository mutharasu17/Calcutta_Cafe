import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blogData";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "The Heritage Journal — Signature Edition | The Calcutta Cafe",
  description:
    "Reflective essays on Bengali gastronomy, seasonal rituals, and time-honored culinary traditions.",
};

export default function BlogListPage() {
  return (
    <div className="relative pt-32 pb-28 bg-[#171615] text-[#FAF9F6]">
      {/* Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#B79A65] block mb-4">
            The Heritage Journal
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[1.04]">
            Stories from Bengal&apos;s
            <span className="block italic text-[#D8D0C3] font-normal">
              culinary heritage.
            </span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-[#D8D0C3]/90 font-light leading-relaxed max-w-2xl">
            Essays on monsoon Hilsa legends, the sacred architecture of the Sunday Kosha ritual, and the overlooked genius of Bengal&apos;s vegetarian repertoire.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="group flex flex-col justify-between space-y-6">
                <div>
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#292725] border border-white/[0.08]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs font-mono text-[#B79A65]">
                    <span>{post.category}</span>
                    <span className="text-[#D8D0C3]/50">{post.readTime}</span>
                  </div>

                  <h2 className="font-serif text-2xl font-light text-[#FAF9F6] mt-3 group-hover:text-[#B79A65] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-xs sm:text-sm text-[#D8D0C3]/80 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B79A65] group-hover:text-[#FAF9F6] transition-colors"
                  >
                    <span>Read Monograph</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
