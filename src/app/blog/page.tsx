import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blogData";
import { ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "The Bengal Journal — Culinary Essays & Heritage | The Calcutta Cafe",
  description:
    "Reflective essays on Bengali gastronomy, seasonal river rituals, the architecture of Sunday Kosha Mangsho, and centuries of culinary traditions.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "The Bengal Journal — The Calcutta Cafe",
    description:
      "Essays on monsoon Hilsa legends, the sacred architecture of the Sunday Kosha ritual, and the overlooked genius of Bengal's vegetarian repertoire.",
    url: "https://thecalcuttacafe.com/blog",
    images: [
      {
        url: "/images/hero-bengali-bhoj.jpg",
        width: 1200,
        height: 675,
        alt: "The Bengal Journal Culinary Monograph",
      },
    ],
  },
};

export default function BlogListPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://thecalcuttacafe.com" },
          { name: "The Bengal Journal", url: "https://thecalcuttacafe.com/blog" },
        ]}
      />
      <div className="relative pb-28 bg-[#F5EFE4] text-[#29251F] min-h-screen">
      {/* Editorial Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 border-b border-[#E6D8C3]">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#5B1B8A] font-semibold block mb-3">
            The Bengal Journal • প্রবন্ধমালা
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.04]">
            Stories from Bengal&apos;s
            <span className="block italic text-[#5B1B8A] font-light mt-1">
              culinary heritage.
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed max-w-2xl">
            Essays on monsoon Hilsa legends, the sacred architecture of the Sunday Kosha ritual, and the overlooked genius of Bengal&apos;s vegetarian repertoire.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="group bg-[#FFFFFF] border border-[#E6D8C3] shadow-sm flex flex-col justify-between overflow-hidden hover:border-[#5B1B8A]/50 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#F5EFE4]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#5B1B8A] font-semibold border border-[#E6D8C3]">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-[#6B6357]">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl text-[#29251F] font-normal leading-snug group-hover:text-[#5B1B8A] transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#E6D8C3]/50">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5B1B8A] hover:text-[#29251F] transition-colors"
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
    </div>
    </>
  );
}
