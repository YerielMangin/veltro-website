import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { pricingTiers } from "@/config/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for teams of all sizes. Start free, scale as you grow.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Start free. Scale as you grow. No hidden fees.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <div
            key={tier.slug}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-card p-8",
              tier.highlighted
                ? "border-primary shadow-xl shadow-primary/10"
                : "border-border"
            )}
          >
            {tier.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  {tier.badge}
                </span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>

            <div className="mt-6">
              {tier.monthlyPrice !== null ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">${tier.annualPrice}</span>
                  <span className="text-sm text-muted-foreground">/user/mo (annual)</span>
                </div>
              ) : (
                <p className="text-4xl font-bold text-foreground">Custom</p>
              )}
            </div>

            <Link
              href={tier.cta.href}
              className={cn(
                "mt-6 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-colors",
                tier.highlighted
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-border bg-background text-foreground hover:bg-accent"
              )}
            >
              {tier.cta.label}
            </Link>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Includes</p>
              <ul className="mt-4 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Limits</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {Object.values(tier.limits).map((limit) => (
                  <li key={limit}>{limit}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ teaser */}
      <div className="mx-auto mt-24 max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-foreground">Questions?</h2>
        <p className="mt-2 text-muted-foreground">
          Reach out to our sales team at{" "}
          <a href="mailto:sales@veltro.io" className="text-primary hover:underline">
            sales@veltro.io
          </a>
        </p>
      </div>
    </div>
  );
}
