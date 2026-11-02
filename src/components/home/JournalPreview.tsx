"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function JournalPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const supportingRef = useRef<HTMLDivElement>(null);

  const featuredPost =
    BLOG_POSTS.find((p) => p.slug === "the-sunday-kosha-mangsho-ritual") ||
    BLOG_POSTS[0];

  const supportingPosts = BLOG_POSTS.filter(
    (p) => p.slug !== featuredPost.slug
  ).slice(0, 2);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        featuredRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        supportingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-[#FFFDF8] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]"
    >
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
              Curated culinary monographs and historical essays exploring Bengal&apos;s dining culture and seasonal rituals.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A382B] hover:text-[#29251F] transition-colors border-b border-[#7A382B]/30 pb-1 self-start md:self-auto"
          >
            <span>View All Stories</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Featured Article + Supporting Articles Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Large Featured Article (7 Cols) */}
          <article
            ref={featuredRef}
            className="lg:col-span-7 bg-[#F5EFE4] border border-[#E6D8C3] shadow-sm flex flex-col justify-between group hover:border-[#7A382B] hover:shadow-md transition-all duration-300"
          >
            <div>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="block relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3]"
              >
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#7A382B] text-[#FFFDF8] px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold">
                  Featured Monograph
                </div>
              </Link>

              <div className="p-6 sm:p-8 space-y-3 bg-[#FFFDF8]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#6B6357]">
                  <Clock className="h-3.5 w-3.5 text-[#7A382B]" />
                  <span>{featuredPost.readTime}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#29251F] font-normal group-hover:text-[#7A382B] transition-colors leading-snug">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0 border-t border-[#E6D8C3]/60 bg-[#FFFDF8] flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-[#6B6357]">
                By {featuredPost.author}
              </span>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="font-semibold uppercase tracking-wider text-[#7A382B] hover:text-[#29251F] transition-colors flex items-center gap-1.5"
              >
                <span>Read Full Essay</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>

          {/* Supporting Articles Stack (5 Cols) */}
          <div ref={supportingRef} className="lg:col-span-5 space-y-6">
            {supportingPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-[#F5EFE4] border border-[#E6D8C3] p-5 shadow-sm group hover:border-[#7A382B] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex gap-4 items-start">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative h-24 w-24 sm:h-28 sm:w-28 bg-[#E6D8C3] flex-shrink-0 overflow-hidden border border-[#E6D8C3]"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="112px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#6B6357]">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h4 className="font-serif text-lg text-[#29251F] font-normal group-hover:text-[#7A382B] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>

                    <p className="text-xs text-[#6B6357] line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E6D8C3]/60 mt-3 flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-[#6B6357]">
                    {post.date}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-semibold uppercase tracking-wider text-[#7A382B] hover:text-[#29251F] transition-colors flex items-center gap-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
