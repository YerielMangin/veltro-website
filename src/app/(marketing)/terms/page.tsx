import type { Metadata } from "next";
import { SecondaryHero } from "@/components/marketing/SecondaryHero";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "Terms of Service | Veltro",
  description: "Veltro's terms of service — the protocols that govern our operational OS.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SecondaryHero 
        line1="Terms of" 
        line2="Protocol." 
        description="The formal agreements governing your relationship with the Veltro Operational OS."
      />

      <section className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/30">
              // revision 2026.03.17
            </span>
          </div>

          <div className="prose prose-lg max-w-none font-body prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-charcoal prose-p:leading-relaxed prose-p:text-charcoal/70 prose-strong:text-charcoal sm:prose-xl">
            <h2>Acceptance of Protocol</h2>
            <p>
              By initializing or utilizing the Veltro platform, you agree to be bound by
              these Protocols of Service. If you do not align with these terms, you may
              not engage with our systems.
            </p>

            <div className="my-16 h-px bg-charcoal/5" />

            <h2>System Utilization</h2>
            <p>
              You may employ Veltro only in compliance with these Protocols and all
              applicable jurisdictional laws. You are responsible for maintaining the
              confidentiality of your station credentials and access keys.
            </p>

            <div className="my-16 h-px bg-charcoal/5" />

            <h2>Intellectual Property</h2>
            <p>
              The Veltro platform, including all logic, design patterns, and
              operational structures, is owned by Veltro Inc. and is protected by
              international copyright, trademark, and proprietary laws.
            </p>

            <div className="my-16 h-px bg-charcoal/5" />

            <h2>Limitation of Liability</h2>
            <p>
              Veltro shall not be held liable for any indirect, incidental, or
              consequential operational variances resulting from your use of or
              inability to engage with the system.
            </p>

            <div className="my-16 h-px bg-charcoal/5" />

            <h2>Communication</h2>
            <p>
              For inquiries regarding these Protocols, contact our legal station at{" "}
              <a
                href="mailto:legal@getveltro.com"
                className="text-clay transition-colors hover:text-clay/80"
              >
                legal@getveltro.com
              </a>
              .
            </p>
          </div>
        </ScrollReveal>
      </section>

      <CTASection />
    </div>
  );
}
