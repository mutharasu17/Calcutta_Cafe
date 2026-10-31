import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blogData";
import { ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="relative pt-32 pb-28 bg-[#171615] text-[#FAF9F6]">
      {/* Article Header */}
      <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-12 py-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#B79A65] hover:text-[#FAF9F6] transition-colors mb-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>The Heritage Journal</span>
        </Link>

        <div className="flex items-center gap-4 text-xs font-mono text-[#B79A65] uppercase tracking-widest mb-4">
          <span>{post.category}</span>
          <span className="text-white/20">•</span>
          <span className="text-[#D8D0C3]/60">{post.readTime}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#FAF9F6] leading-tight">
          {post.title}
        </h1>

        {post.bengaliTitle && (
          <p className="font-bengali text-lg text-[#B79A65] mt-2">
            {post.bengaliTitle}
          </p>
        )}

        <div className="mt-8 pt-6 border-t border-white/[0.08] text-xs font-mono text-[#D8D0C3]/60">
          <span>By {post.author}</span>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-12 my-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/[0.1] bg-[#292725]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Article Body Content */}
      <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-12 py-10">
        {/* Lead paragraph */}
        <p className="text-lg sm:text-xl text-[#FAF9F6] font-light leading-relaxed mb-10 pb-8 border-b border-white/[0.08]">
          {post.content.lead}
        </p>

        {/* Article sections */}
        <div className="space-y-12">
          {post.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF9F6]">
                {section.heading}
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-[#D8D0C3]/80 font-light leading-relaxed">
                {section.body.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {section.quote && (
                <blockquote className="my-8 border-l border-[#B79A65] pl-6 py-2">
                  <p className="font-serif text-lg sm:text-xl text-[#FAF9F6] font-light italic">
                    &ldquo;{section.quote}&rdquo;
                  </p>
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Back Link & Menu Link */}
        <div className="mt-16 pt-10 border-t border-white/[0.08] flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B79A65] hover:text-[#FAF9F6] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Journal</span>
          </Link>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 border border-[#B79A65]/40 px-6 py-3 text-xs uppercase tracking-widest text-[#FAF9F6] hover:border-[#B79A65] transition-colors"
          >
            <span>Explore The Menu</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
