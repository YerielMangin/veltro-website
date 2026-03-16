import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent, type ContentMeta } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on maintenance management, product updates, and industry best practices.",
};

interface BlogMeta extends ContentMeta {
  category?: string;
}

export default function BlogPage() {
  const posts = getAllContent<BlogMeta>("blog");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Product updates, maintenance tips, and industry insights.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Coming soon — stay tuned for our first posts.
          </p>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <time className="text-sm text-muted-foreground">{formatDate(post.date)}</time>
                  {post.category && (
                    <span className="ml-3 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {post.category}
                    </span>
                  )}
                  <h2 className="mt-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">{post.description}</p>
                  {post.readingTime && (
                    <p className="mt-2 text-sm text-muted-foreground">{post.readingTime}</p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
