import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blogData";
import { ArrowLeft } from "lucide-react";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/seo/JsonLd";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Essay Not Found | The Bengal Journal",
    };
  }

  const url = `https://thecalcuttacafe.com/blog/${slug}`;

  return {
    title: `${post.title} | The Bengal Journal`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://thecalcuttacafe.com/blog/${slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://thecalcuttacafe.com" },
          { name: "The Bengal Journal", url: "https://thecalcuttacafe.com/blog" },
          { name: post.title, url: postUrl },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={postUrl}
        image={`https://thecalcuttacafe.com${post.image}`}
        datePublished={post.isoDate || post.date}
        author={post.author}
      />
      <article className="relative pb-28 bg-[#F5EFE4] text-[#29251F] min-h-screen">
        {/* Article Header */}
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-12 py-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#5B1B8A] hover:text-[#29251F] transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>The Bengal Journal</span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-mono text-[#5B1B8A] uppercase tracking-widest mb-3">
            <span>{post.category}</span>
            <span className="text-[#6B6357]/40">•</span>
            <span className="text-[#6B6357]">{post.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] leading-tight">
            {post.title}
          </h1>

          {post.bengaliTitle && (
            <p className="font-bengali text-lg text-[#5B1B8A] mt-2 font-medium">
              {post.bengaliTitle}
            </p>
          )}

          <p className="text-xs font-mono text-[#6B6357] uppercase tracking-wider mt-4">
            Published {post.date} • {post.author}
          </p>
        </div>

        {/* Featured Visual Canvas */}
        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-12 mb-14">
          <div className="relative aspect-[21/10] w-full overflow-hidden border border-[#E6D8C3] bg-[#E6D8C3] shadow-md">
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
        <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-12 space-y-10 text-base sm:text-lg text-[#29251F] font-normal leading-relaxed">
          {/* Lead Paragraph */}
          <p className="text-lg sm:text-xl font-normal text-[#29251F] border-l-4 border-l-[#5B1B8A] pl-6 py-1 leading-relaxed bg-[#FFFFFF]/60 p-4 border border-[#E6D8C3]">
            {post.content.lead}
          </p>

          {/* Article Sections */}
          {post.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4 pt-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#29251F]">
                {section.heading}
              </h2>

              {section.body.map((p, pIdx) => (
                <p key={pIdx} className="text-[#6B6357] leading-relaxed">
                  {p}
                </p>
              ))}

              {section.quote && (
                <div className="bg-[#FFFFFF] p-6 sm:p-8 my-6 border-l-4 border-l-[#5B1B8A] border border-[#E6D8C3] shadow-sm">
                  <blockquote className="font-serif italic text-lg sm:text-xl text-[#29251F]">
                    &ldquo;{section.quote}&rdquo;
                  </blockquote>
                </div>
              )}
            </div>
          ))}

          {/* Closing Note */}
          <div className="pt-10 border-t border-[#E6D8C3] mt-14">
            <div className="bg-[#FFFFFF] p-8 border border-[#E6D8C3] space-y-2 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-widest text-[#5B1B8A] font-semibold block">
                The Bengal Journal Series
              </span>
              <p className="font-serif text-xl text-[#29251F] font-normal">
                The Calcutta Cafe
              </p>
              <p className="text-xs text-[#6B6357] leading-relaxed">
                Preserving the layered gastronomy and living traditions of Bengal. Founded in 2019 by Akash Santra.
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
