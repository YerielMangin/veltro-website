import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent, type ContentMeta } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { SecondaryHero } from "@/components/marketing/SecondaryHero";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "Journal | Veltro",
  description: "Insights on maintenance management, product updates, and industry best practices.",
};

interface BlogMeta extends ContentMeta {
  category?: string;
  readingTime?: string;
}

export default function BlogPage() {
  const posts = getAllContent<BlogMeta>("blog");
  const [featured, ...rest] = posts;

  return (
    <div className="bg-cream min-h-screen">
      <SecondaryHero 
        line1="The Operational" 
        line2="Journal." 
        description="Product updates, maintenance strategies, and engineering insights from the team building the future of infrastructure."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        {posts.length === 0 ? (
          <div className="rounded-[2rem] border border-cream-300 bg-white p-16 text-center">
            <p className="font-body text-base text-charcoal/50">
              Coming soon — stay tuned for our first posts.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured post */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="rounded-[3rem] bg-charcoal p-8 transition-shadow duration-500 hover:shadow-2xl sm:p-10 lg:p-12">
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
                    <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-moss-800 to-clay-900/40 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-cream/30">
                          // featured
                        </span>
                        <time className="font-mono text-[10px] text-cream/50 uppercase">
                          {formatDate(featured.date)}
                        </time>
                      </div>
                      <h2 className="mt-6 font-display text-4xl italic text-cream transition-colors duration-300 group-hover:text-clay md:text-5xl">
                        {featured.title}
                      </h2>
                      <p className="mt-4 font-body text-base leading-relaxed text-cream/60">
                        {featured.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Remaining posts */}
            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                    <div className="flex h-full flex-col rounded-[2rem] border border-cream-300 bg-white p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                        <time className="font-mono text-[10px] text-charcoal/40 uppercase">
                          {formatDate(post.date)}
                        </time>
                        {post.category && (
                          <span className="rounded-full bg-moss/10 px-3 py-1 font-mono text-[10px] font-medium text-moss uppercase tracking-wider">
                            {post.category}
                          </span>
                        )}
                      </div>
                      <h2 className="mt-6 font-heading text-xl font-bold tracking-tight text-charcoal transition-colors duration-300 group-hover:text-clay">
                        {post.title}
                      </h2>
                      <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/60">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <CTASection />
    </div>
  );
}
