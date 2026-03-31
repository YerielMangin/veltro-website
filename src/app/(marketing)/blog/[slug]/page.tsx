import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContentBySlug, getAllContent, type ContentMeta } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";
import { SecondaryHero } from "@/components/marketing/SecondaryHero";
import { CTASection } from "@/components/marketing/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface BlogMeta extends ContentMeta {
  category?: string;
  authorTitle?: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllContent<BlogMeta>("blog");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getContentBySlug<BlogMeta>("blog", slug);
  if (!post) return {};

  return {
    title: `${post.meta.title} | Veltro Journal`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      url: absoluteUrl(`/blog/${slug}`),
      images: post.meta.image ? [{ url: post.meta.image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getContentBySlug<BlogMeta>("blog", slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-cream">
      <SecondaryHero 
        line1={post.meta.title.split(" ").slice(0, 3).join(" ")}
        line2={post.meta.title.split(" ").slice(3).join(" ")}
        description={post.meta.description}
      />

      <article className="mx-auto max-w-3xl px-6 pb-24">
        <ScrollReveal>
          <Link
            href="/blog"
            className="mb-12 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-charcoal/40 transition-colors duration-300 hover:text-charcoal"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to journal
          </Link>

          <header className="mb-16 border-b border-charcoal/5 pb-10">
            <div className="flex items-center gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/30">
                  // author
                </p>
                <p className="mt-1 font-heading text-sm font-bold text-charcoal">
                  {post.meta.author || "Veltro Team"}
                </p>
              </div>
              <div className="h-8 w-px bg-charcoal/10" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/30">
                  // published
                </p>
                <p className="mt-1 font-heading text-sm font-bold text-charcoal">
                  {new Date(post.meta.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none font-body prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-charcoal prose-p:leading-relaxed prose-p:text-charcoal/80 prose-a:text-clay prose-a:no-underline hover:prose-a:text-clay/80 prose-strong:text-charcoal prose-blockquote:border-clay/30 prose-blockquote:text-charcoal/60 sm:prose-xl">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </ScrollReveal>
      </article>

      <CTASection />
    </div>
  );
}
