import type { Metadata } from "next";
import { SecondaryHero } from "@/components/marketing/SecondaryHero";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "Privacy Policy | Veltro",
  description: "Veltro's privacy policy — how we collect, use, and protect your operational data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SecondaryHero 
        line1="Privacy" 
        line2="Shield." 
        description="Our commitment to safeguarding the data that drives your operational rhythm."
      />

      <section className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/30">
              // revision 2026.03.17
            </span>
          </div>

          <div className="prose prose-lg max-w-none font-body prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-charcoal prose-p:leading-relaxed prose-p:text-charcoal/70 prose-strong:text-charcoal sm:prose-xl">
            <h2>Data Collection Protocols</h2>
            <p>
              We collect information you provide directly to our systems, such as when you
              initialize an account, configure a protocol, or contact our stations. This includes
              your identity, organizational metadata, and any operational parameters
              you choose to provide.
            </p>

            <div className="my-16 h-px bg-charcoal/5" />

            <h2>Utilization of Intelligence</h2>
            <p>
              We employ the information we collect to maintain, secure, and accelerate
              our services, communicate with your team, and protect the integrity of the
              Veltro ecosystem.
            </p>

            <div className="my-16 h-px bg-charcoal/5" />

            <h2>Security Architecture</h2>
            <p>
              We implement clinical technical and organizational measures to
              protect your operational data against unauthorized access, alteration,
              disclosure, or disruption. Your rhythm is our priority.
            </p>

            <div className="my-16 h-px bg-charcoal/5" />

            <h2>Communications</h2>
            <p>
              If you have any inquiries about this Privacy Shield, please reach out to
              our privacy station at{" "}
              <a
                href="mailto:privacy@getveltro.com"
                className="text-clay transition-colors hover:text-clay/80"
              >
                privacy@getveltro.com
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
