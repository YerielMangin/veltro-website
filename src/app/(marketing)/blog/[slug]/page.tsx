import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContentBySlug, getAllContent, type ContentMeta } from "@/lib/content";
import { formatDate, absoluteUrl } from "@/lib/utils";

interface BlogMeta extends ContentMeta {
  category?: string;
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
    title: post.meta.title,
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
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <header>
        <time className="text-sm text-muted-foreground">{formatDate(post.meta.date)}</time>
        {post.meta.readingTime && (
          <span className="ml-3 text-sm text-muted-foreground">{post.meta.readingTime}</span>
        )}
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
          {post.meta.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.meta.description}</p>
      </header>

      <div className="prose prose-zinc dark:prose-invert mt-12 max-w-none">
        {/* MDX content would be rendered here via next/mdx */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
}
