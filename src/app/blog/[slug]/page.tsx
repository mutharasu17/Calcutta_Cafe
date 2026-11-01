import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blogData";
import { ArrowLeft } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";

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
    <article className="relative pt-32 pb-28 bg-[#090909] text-[#F5F0E8] min-h-screen">
      {/* Article Header */}
      <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-12 py-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C7AC83] hover:text-[#F5F0E8] transition-colors mb-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>The Heritage Journal</span>
        </Link>

        <div className="flex items-center gap-4 text-xs font-mono text-[#C7AC83] uppercase tracking-widest mb-4">
          <span>{post.category}</span>
          <span className="text-white/20">•</span>
          <span className="text-[#A9A19A]">{post.readTime}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#F5F0E8] leading-tight">
          {post.title}
        </h1>

        {post.bengaliTitle && (
          <p className="font-bengali text-lg text-[#C7AC83] mt-2">
            {post.bengaliTitle}
          </p>
        )}

        <p className="text-xs font-mono text-[#A9A19A] uppercase tracking-wider mt-4">
          Published {post.date} • {post.author}
        </p>
      </div>

      {/* Featured Visual Canvas */}
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-12 mb-16">
        <div className="relative aspect-[21/10] w-full overflow-hidden border border-white/[0.12] bg-[#151313]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Body Copy Prose */}
      <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-12 space-y-10 text-base sm:text-lg text-[#F5F0E8]/90 font-light leading-relaxed">
        {/* Lead Paragraph */}
        <p className="text-lg sm:text-xl font-normal text-[#F5F0E8] border-l-2 border-l-[#C7AC83] pl-6 py-1 leading-relaxed">
          {post.content.lead}
        </p>

        {/* Article Sections */}
        {post.content.sections.map((section, idx) => (
          <div key={idx} className="space-y-6 pt-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F0E8]">
              {section.heading}
            </h2>

            {section.body.map((p, pIdx) => (
              <p key={pIdx} className="text-[#A9A19A] leading-relaxed">
                {p}
              </p>
            ))}

            {section.quote && (
              <GlassPanel variant="subtle" className="p-6 my-6 border-l border-l-[#C7AC83]">
                <blockquote className="font-serif italic text-lg sm:text-xl text-[#F5F0E8]">
                  &ldquo;{section.quote}&rdquo;
                </blockquote>
              </GlassPanel>
            )}
          </div>
        ))}

        {/* Closing Note */}
        <div className="pt-12 border-t border-white/[0.08] mt-16">
          <GlassPanel variant="subtle" className="p-8 space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C7AC83] block">
              Culinary Monograph Series
            </span>
            <p className="font-serif text-xl text-[#F5F0E8]">
              The Calcutta Cafe
            </p>
            <p className="text-xs text-[#A9A19A] font-light leading-relaxed">
              Preserving the layered gastronomy and living traditions of Bengal. Founded by Akash Santra.
            </p>
          </GlassPanel>
        </div>
      </div>
    </article>
  );
}
