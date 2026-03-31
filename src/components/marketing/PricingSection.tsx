"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { pricingTiers } from "@/config/pricing";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="bg-cream px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-5xl">
        <span className="mb-3 block text-center font-mono text-xs text-charcoal/40">
          // investment
        </span>
        <h2 className="mb-16 text-center font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Choose your protocol
        </h2>

        <div className="grid grid-cols-1 items-start gap-6 pt-4 md:grid-cols-3 md:gap-4 lg:gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card relative flex flex-col rounded-[2rem] p-8 ${
                tier.highlighted
                  ? "bg-moss text-cream shadow-xl ring-2 ring-clay/30 md:-mt-4 md:pb-12"
                  : "border border-cream-300 bg-white text-charcoal shadow-sm"
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-clay px-4 py-1 font-heading text-xs font-semibold text-cream">
                  {tier.badge}
                </span>
              )}

              <h3 className="font-heading text-xl font-semibold">
                {tier.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold">
                  {tier.annualPrice ? `$${tier.annualPrice}` : "Custom"}
                </span>
                {tier.annualPrice && (
                  <span className={`font-body text-base ${tier.highlighted ? "text-cream/60" : "text-charcoal/50"}`}>
                    /mo
                  </span>
                )}
              </div>

              <p className={`mt-2 font-body text-sm ${tier.highlighted ? "text-cream/60" : "text-charcoal/50"}`}>
                {tier.description}
              </p>

              <div className={`my-6 h-px ${tier.highlighted ? "bg-cream/20" : "bg-cream-300"}`} />

              <ul className="flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 font-body text-sm">
                    <Check
                      size={16}
                      className={tier.highlighted ? "text-clay-200" : "text-moss"}
                      strokeWidth={2.5}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <MagneticButton
                  href={tier.cta.href}
                  variant={tier.highlighted ? "clay" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  {tier.cta.label}
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
