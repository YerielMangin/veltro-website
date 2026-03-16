import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Shield, BarChart3, Wrench, ClipboardCheck, Package } from "lucide-react";
import { siteConfig } from "@/config/site";

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 200ms", label: "API response" },
  { value: "50+", label: "Integrations" },
  { value: "10k+", label: "Assets managed" },
];

const features = [
  { icon: Wrench, title: "Work Orders", description: "Create, assign, and track work from request to completion with real-time status updates." },
  { icon: BarChart3, title: "Asset Management", description: "Full lifecycle tracking — acquisition, maintenance history, depreciation, and retirement." },
  { icon: ClipboardCheck, title: "Inspections", description: "Digital checklists with photo capture, geolocation stamps, and automatic escalation." },
  { icon: Zap, title: "Preventive Maintenance", description: "Calendar and meter-based schedules that auto-generate work orders before breakdowns." },
  { icon: Package, title: "Inventory & Parts", description: "Track stock levels, set reorder points, and link parts directly to work orders." },
  { icon: Shield, title: "Multi-Tenant Security", description: "Row-level isolation, SSO support, audit logs, and SOC 2 compliant infrastructure." },
];

const trustedBy = [
  "Facility managers", "Manufacturing plants", "Property managers",
  "Healthcare systems", "Education institutions", "Government agencies",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--color-brand-500)_0%,_transparent_50%)] opacity-10" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Now in public beta
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Maintenance management with{" "}
              <span className="text-primary">velocity + control</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              The modern CMMS that replaces spreadsheets, whiteboards, and legacy software.
              Work orders, assets, inspections, and preventive maintenance — all in one platform.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent"
              >
                See all features
              </Link>
            </div>
          </div>

          {/* Product screenshot placeholder */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="aspect-video rounded-xl border border-border bg-muted/50 shadow-2xl">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                {/* Replace with actual product screenshot */}
                <p className="text-sm">Product screenshot</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Trusted by maintenance teams across industries
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {trustedBy.map((name) => (
              <span key={name} className="text-sm font-medium text-muted-foreground/70">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-foreground lg:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything your team needs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One platform to manage your entire maintenance operation — from work requests to compliance reports.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to modernize your maintenance?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start your 14-day free trial. No credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
              >
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
