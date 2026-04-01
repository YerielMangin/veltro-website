import type { Metadata } from "next";
import { Shield, Lock, Eye, Server } from "lucide-react";
import { SecondaryHero } from "@/components/marketing/SecondaryHero";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "Security | Veltro",
  description: "How Veltro protects your station data — security protocols, compliance, and clinical architecture.",
};

const practices = [
  {
    icon: Shield,
    title: "SOC 2 Type II",
    description:
      "Our infrastructure and processes are independently audited for security, availability, and clinical confidentiality.",
  },
  {
    icon: Lock,
    title: "Clinical Encryption",
    description:
      "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Database connections are encrypted end-to-end.",
  },
  {
    icon: Eye,
    title: "Isolation Protocol",
    description:
      "Multi-tenant data is isolated at the database level using Row-Level Security. Stations can never access parallel data.",
  },
  {
    icon: Server,
    title: "Hardened Infrastructure",
    description:
      "We run on Vercel and Supabase — both SOC 2 compliant with enterprise-grade security controls and global redundancy.",
  },
];

const badges = [
  "SOC 2 Type II",
  "GDPR Compliant",
  "AES-256 Encryption",
  "TLS 1.3",
  "99.9% Uptime SLA",
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SecondaryHero 
        line1="Security" 
        line2="First." 
        description="Defense-in-depth at every layer. We maintain your operational integrity with clinical precision."
      />

      {/* Compliance badges */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-moss/20 bg-moss/5 px-6 py-3 font-mono text-[10px] uppercase tracking-widest font-bold text-moss"
              >
                <Shield className="h-3 w-3" strokeWidth={2.5} />
                {badge}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Practices grid */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="grid gap-8 sm:grid-cols-2">
          {practices.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <div className="group h-full rounded-[2.5rem] border border-cream-300 bg-white p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-charcoal text-cream transition-transform duration-500 group-hover:scale-110">
                  <p.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-charcoal">
                  {p.title}
                </h3>
                <p className="mt-4 font-body text-base leading-relaxed text-charcoal/60">
                  {p.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="mx-auto max-w-3xl px-6 pb-32">
        <ScrollReveal>
          <div className="rounded-[3rem] bg-charcoal p-10 text-cream shadow-2xl sm:p-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/30">
              // responsibility
            </span>
            <h2 className="mt-6 font-heading text-3xl font-bold text-cream">
              Responsible Disclosure
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-cream/60">
              If you discover a security vulnerability, please report it
              responsibly by contacting our security station at{" "}
              <a
                href="mailto:security@getveltro.com"
                className="font-bold text-clay underline underline-offset-8 transition-colors hover:text-clay/80"
              >
                security@getveltro.com
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
