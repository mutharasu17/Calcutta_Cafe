import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blogData";
import { ArrowRight } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";

export const metadata = {
  title: "The Heritage Journal — Immersive Edition | The Calcutta Cafe",
  description:
    "Reflective essays on Bengali gastronomy, seasonal rituals, and time-honored culinary traditions.",
};

export default function BlogListPage() {
  return (
    <div className="relative pt-32 pb-28 bg-[#090909] text-[#F5F0E8] min-h-screen">
      {/* Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="mx-auto max-w-5xl">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#C7AC83] block mb-4">
            The Heritage Journal
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[1.04]">
            Stories from Bengal&apos;s
            <span className="block italic text-[#C7AC83] font-light mt-1">
              culinary heritage.
            </span>
          </h1>
          <p className="mt-8 text-base sm:text-lg text-[#A9A19A] font-light leading-relaxed max-w-2xl">
            Essays on monsoon Hilsa legends, the sacred architecture of the Sunday Kosha ritual, and the overlooked genius of Bengal&apos;s vegetarian repertoire.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {BLOG_POSTS.map((post) => (
              <GlassPanel
                key={post.slug}
                variant="subtle"
                hoverEffect
                className="p-6 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#151313] border border-white/[0.08] mb-6">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-[#C7AC83] mb-3">
                    <span>{post.category}</span>
                    <span className="text-[#A9A19A]">{post.readTime}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-light text-[#F5F0E8] group-hover:text-[#C7AC83] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#A9A19A] font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C7AC83] hover:text-[#F5F0E8] transition-colors"
                  >
                    <span>Read Essay</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
