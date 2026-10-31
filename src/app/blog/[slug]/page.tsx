import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blogData";
import { ArrowLeft, Clock, Calendar, User, Quote, Share2 } from "lucide-react";

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
    <article className="relative pt-28 pb-24 bg-[#0A0E17]">
      {/* Header Container */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Chronicles</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
          <span className="rounded-full bg-[#8B1E1E]/30 px-3 py-1 text-[#D4AF37] font-semibold border border-[#8B1E1E]/50">
            {post.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{post.date}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readTime}</span>
          </span>
        </div>

        <h1
          className="mt-6 font-serif text-3xl sm:text-5xl font-extrabold text-[#FAF6F0] leading-tight"
          style={{ fontFamily: "var(--font-serif, serif)" }}
        >
          {post.title}
        </h1>

        {post.bengaliTitle && (
          <p className="mt-2 text-sm text-[#D4AF37] font-medium">
            {post.bengaliTitle}
          </p>
        )}

        <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
          {post.subtitle}
        </p>

        <div className="mt-6 flex items-center gap-3 pt-6 border-t border-white/10 text-xs text-neutral-400">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#18202F] text-[#D4AF37] border border-[#D4AF37]/30">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-white">{post.author}</p>
            <p className="text-[11px] text-neutral-500">Curated Culinary Heritage</p>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 my-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[#D4AF37]/20 shadow-2xl">
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
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Lead Paragraph */}
        <p className="font-serif text-lg sm:text-xl text-[#FAF6F0] leading-relaxed italic border-l-2 border-[#D4AF37] pl-6 my-8">
          {post.content.lead}
        </p>

        <div className="space-y-12 text-base sm:text-lg leading-relaxed text-neutral-300">
          {post.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2
                className="font-serif text-2xl sm:text-3xl font-bold text-white pt-4"
                style={{ fontFamily: "var(--font-serif, serif)" }}
              >
                {section.heading}
              </h2>

              {section.body.map((para, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {para}
                </p>
              ))}

              {section.quote && (
                <blockquote className="my-8 rounded-2xl border border-[#D4AF37]/20 bg-[#141A26] p-6 text-base italic text-[#D4AF37]">
                  <Quote className="h-6 w-6 text-[#D4AF37]/40 mb-2" />
                  &ldquo;{section.quote}&rdquo;
                </blockquote>
              )}
            </section>
          ))}
        </div>

        {/* Back and Order Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Food Chronicles</span>
          </Link>

          <Link
            href="/menu"
            className="rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3CF5F] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#14100C] shadow-lg hover:scale-105 transition-transform"
          >
            Experience This on the Menu →
          </Link>
        </div>
      </div>
    </article>
  );
}
