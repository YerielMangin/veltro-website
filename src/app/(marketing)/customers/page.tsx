import type { Metadata } from "next";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "See how maintenance teams use Veltro to modernize their operations.",
};

const caseStudies = [
  {
    slug: "facility-management",
    industry: "Facility Management",
    company: "Meridian Facilities Group",
    quote:
      "Veltro cut our work order response time by 40% in the first quarter.",
    stat: { value: "40%", label: "Faster response" },
  },
  {
    slug: "manufacturing",
    industry: "Manufacturing",
    company: "Precision Dynamics Corp",
    quote:
      "We went from reactive to proactive maintenance in under 90 days.",
    stat: { value: "90", label: "Days to transform" },
  },
  {
    slug: "property-management",
    industry: "Property Management",
    company: "Atlas Property Partners",
    quote:
      "Managing 2,000+ assets across 30 properties is finally straightforward.",
    stat: { value: "2k+", label: "Assets managed" },
  },
];

const featured = {
  slug: "facility-management",
  company: "Meridian Facilities Group",
  industry: "Facility Management",
  quote:
    "Veltro didn't just replace our old system — it changed the way our teams think about maintenance. Everything is faster, clearer, and more intentional.",
  author: "Sarah Chen",
  role: "VP of Operations",
  stats: [
    { value: "40%", label: "Faster response" },
    { value: "3x", label: "Technician throughput" },
    { value: "12k", label: "Work orders / month" },
  ],
};

export default function CustomersPage() {
  return (
    <>
      {/* Navbar spacer */}
      <div className="h-32 bg-cream" />

      {/* Hero */}
      <section className="bg-cream pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-mono text-xs text-charcoal/40">// proof</p>
          <h1 className="mt-4 max-w-2xl font-heading text-4xl font-bold tracking-tight text-charcoal sm:text-5xl md:text-6xl">
            Trusted by teams that{" "}
            <em className="font-display italic text-clay">ship</em>
          </h1>
          <p className="mt-6 max-w-[55ch] font-body text-base leading-relaxed text-charcoal/60 sm:text-lg">
            From facility managers to manufacturing plants — see how teams use
            Veltro to run better operations.
          </p>
        </div>
      </section>

      {/* Featured case study */}
      <section className="bg-cream px-6 pb-24 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] bg-charcoal p-8 text-cream sm:p-12 lg:p-16">
            <p className="font-mono text-xs text-cream/40">
              // featured story
            </p>
            <blockquote className="mt-6 max-w-3xl font-display text-2xl italic leading-snug text-cream/90 sm:text-3xl lg:text-4xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-heading text-sm font-semibold text-cream">
                {featured.author}
              </p>
              <p className="font-body text-sm text-cream/50">
                {featured.role}, {featured.company}
              </p>
            </div>
            <div className="mt-10 grid gap-6 border-t border-cream/10 pt-10 sm:grid-cols-3">
              {featured.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-mono text-3xl font-bold text-clay sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-body text-sm text-cream/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case study cards */}
      <section className="bg-cream-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-mono text-xs text-charcoal/40">// case studies</p>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            More stories
          </h2>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <div
                key={study.slug}
                className="flex h-full flex-col rounded-[2rem] border border-cream-300 bg-cream-50 p-8 shadow-sm"
              >
                <span className="inline-flex self-start rounded-full bg-moss/10 px-3 py-1 font-mono text-[10px] font-medium text-moss">
                  {study.industry}
                </span>
                <p className="mt-6 flex-1 font-display text-lg italic leading-relaxed text-charcoal/80">
                  &ldquo;{study.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-end justify-between border-t border-cream-300 pt-6">
                  <div>
                    <p className="font-heading text-sm font-semibold text-charcoal">
                      {study.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-2xl font-bold text-clay">
                      {study.stat.value}
                    </p>
                    <p className="font-body text-xs text-charcoal/40">
                      {study.stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-xs text-charcoal/40">
                // get started
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
                Ready to join them?
              </h2>
              <p className="mt-4 font-body text-base text-charcoal/60">
                Start your 14-day free trial today.
              </p>
            </div>
            <MagneticButton href="/demo" variant="clay" size="lg">
              Start free trial
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
