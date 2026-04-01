import type { Metadata } from "next";
import { Mail, MessageSquare, Globe } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SecondaryHero } from "@/components/marketing/SecondaryHero";
import { CTASection } from "@/components/marketing/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Contact | Veltro",
  description: "Get in touch with the Veltro team — sales, support, or partnerships.",
};

const contacts = [
  {
    icon: Mail,
    label: "Sales",
    description: "Talk to our team about protocols and pricing.",
    href: `mailto:${siteConfig.support.sales}`,
    value: siteConfig.support.sales,
    color: "moss",
  },
  {
    icon: MessageSquare,
    label: "Support",
    description: "Need technical help? We're here for you.",
    href: `mailto:${siteConfig.support.email}`,
    value: siteConfig.support.email,
    color: "clay",
  },
  {
    icon: Globe,
    label: "Partnerships",
    description: "For ecosystem and integration inquiries.",
    href: `mailto:partners@getveltro.com`,
    value: "partners@getveltro.com",
    color: "charcoal",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SecondaryHero 
        line1="Get in" 
        line2="Touch." 
        description="Have questions about the Veltro Operational OS? Our team is ready to help you find your operational rhythm."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left -- contact info cards */}
          <div className="space-y-6">
            <ScrollReveal>
              <div className="mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/30">
                  // channels
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold text-charcoal">
                  Direct Lines
                </h2>
              </div>
            </ScrollReveal>

            {contacts.map((contact, i) => (
              <ScrollReveal key={contact.label} delay={i * 0.1}>
                <div className="group rounded-[2rem] border border-cream-300 bg-white p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex items-start gap-6">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-${contact.color}/10 text-${contact.color}`}>
                      <contact.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-charcoal">
                        {contact.label}
                      </h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">
                        {contact.description}
                      </p>
                      <a
                        href={contact.href}
                        className="mt-4 inline-block font-mono text-sm font-semibold text-clay transition-colors hover:text-clay/80"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right -- form */}
          <ScrollReveal delay={0.2}>
            <div className="rounded-[3rem] bg-charcoal p-8 text-cream shadow-2xl sm:p-12">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/30">
                // concierge
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold text-cream">
                Send a Message
              </h2>
              
              <form className="mt-10 space-y-6" action="#">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="font-mono text-[10px] uppercase tracking-wider text-cream/40">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="rounded-full border border-cream/10 bg-cream/5 px-5 py-4 font-body text-sm text-cream transition-all duration-300 focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="font-mono text-[10px] uppercase tracking-wider text-cream/40">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="rounded-full border border-cream/10 bg-cream/5 px-5 py-4 font-body text-sm text-cream transition-all duration-300 focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-wider text-cream/40">
                    Work Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="rounded-full border border-cream/10 bg-cream/5 px-5 py-4 font-body text-sm text-cream transition-all duration-300 focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss"
                    placeholder="jane@company.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-wider text-cream/40">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="rounded-[2rem] border border-cream/10 bg-cream/5 px-5 py-4 font-body text-sm text-cream transition-all duration-300 focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss resize-none"
                    placeholder="Tell us about your operation..."
                  />
                </div>
                <div className="pt-4">
                  <MagneticButton type="submit" variant="clay" size="lg" className="w-full">
                    Initialize Contact
                  </MagneticButton>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
