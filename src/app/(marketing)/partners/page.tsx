import type { Metadata } from "next";
import { Code2, Store, Briefcase } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with Veltro — reseller, integration, and technology partnerships.",
};

const partnerTypes = [
  {
    icon: Code2,
    title: "Technology Partners",
    description:
      "Build integrations with Veltro's API and reach maintenance teams worldwide.",
    benefits: [
      "API access and developer support",
      "Co-marketing opportunities",
      "Partner directory listing",
    ],
  },
  {
    icon: Store,
    title: "Reseller Partners",
    description:
      "Sell Veltro to your existing customer base with competitive margins.",
    benefits: [
      "Competitive revenue share",
      "Sales enablement and training",
      "Dedicated partner manager",
    ],
  },
  {
    icon: Briefcase,
    title: "Consulting Partners",
    description:
      "Help organizations implement and optimize their Veltro deployment.",
    benefits: [
      "Implementation certification",
      "Referral commissions",
      "Priority technical support",
    ],
  },
];

export default function PartnersPage() {
  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-32 bg-cream" />

      {/* Hero */}
      <section className="bg-cream px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <span className="mb-3 block font-mono text-xs text-charcoal/40">
            // partners
          </span>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-charcoal sm:text-5xl md:text-6xl">
            Grow with Veltro
          </h1>
          <p className="mt-6 max-w-[55ch] font-body text-lg text-charcoal/60">
            Join our partner ecosystem and help maintenance teams modernize
            their operations.
          </p>
        </div>
      </section>

      {/* Partner types grid */}
      <section className="bg-cream px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {partnerTypes.map((type) => (
            <div
              key={type.title}
              className="flex h-full flex-col rounded-[2rem] border border-cream-300 bg-white p-8 shadow-sm"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-moss/10 text-moss">
                <type.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal">
                {type.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">
                {type.description}
              </p>

              <div className="my-6 h-px bg-cream-300" />

              <ul className="flex-1 space-y-3">
                {type.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 font-body text-sm text-charcoal/70"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-charcoal">
              Become a partner
            </h2>
            <p className="mt-3 font-body text-base text-charcoal/60">
              Reach out to discuss partnership opportunities.
            </p>
          </div>
          <MagneticButton href="/contact" variant="clay">
            Apply now
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
