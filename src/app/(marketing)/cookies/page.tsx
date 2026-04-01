import type { Metadata } from "next";
import { SecondaryHero } from "@/components/marketing/SecondaryHero";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "Cookie Policy | Veltro",
  description: "Veltro's cookie policy — how we use cookies and similar technologies to maintain your operational rhythm.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SecondaryHero 
        line1="Cookie" 
        line2="Protocols." 
        description="How we use persistence technologies to provide a seamless and secure experience."
      />

      <section className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/30">
              // revision 2026.03.17
            </span>
          </div>

          <div className="prose prose-lg max-w-none font-body prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-charcoal prose-p:leading-relaxed prose-p:text-charcoal/70 prose-strong:text-charcoal sm:prose-xl">
            <h2>What Are Cookies</h2>
            <p>
              Cookies are minor data fragments stored on your device when you engage with
              our stations. They help us provide you with a superior experience and
              understand how you navigate the Veltro Operational OS.
            </p>

            <div className="my-16 h-px bg-charcoal/5" />

            <h2>How We Use Cookies</h2>
            <p>
              We utilize essential cookies for authentication and station functionality,
              analytics cookies to understand usage patterns, and preference
              cookies to remember your operational settings.
            </p>

            <div className="my-16 h-px bg-charcoal/5" />

            <h2>Managing Protocols</h2>
            <p>
              You can control and manage cookies through your station's browser settings.
              Note that removing or blocking cookies may disrupt your user 
              rhythm and site functionality.
            </p>

            <div className="my-16 h-px bg-charcoal/5" />

            <h2>Inquiries</h2>
            <p>
              For questions about our cookie protocols, reach out to our team at{" "}
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
