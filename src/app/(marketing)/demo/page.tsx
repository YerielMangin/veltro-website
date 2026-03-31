import type { Metadata } from "next";
import Link from "next/link";
import { Check, Shield, Zap, Heart } from "lucide-react";
import { SecondaryHero } from "@/components/marketing/SecondaryHero";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Start Free Trial | Veltro",
  description: "Experience the Veltro Operational OS. 14 days of absolute clarity, no credit card required.",
};

const benefits = [
  {
    icon: Zap,
    text: "14-day full access — no credit card required",
  },
  {
    icon: Shield,
    text: "Enterprise-grade security across all features",
  },
  {
    icon: Heart,
    text: "Dedicated human support during onboarding",
  },
  {
    icon: Check,
    text: "Seamless data import from legacy systems",
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SecondaryHero 
        line1="Find your" 
        line2="Rhythm." 
        description="Join elite operations teams using Veltro to eliminate friction and achieve absolute clarity."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left -- Benefits & Social Proof */}
          <div>
            <ScrollReveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/30">
                // implementation
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
                Ready to accelerate?
              </h2>
              <p className="mt-6 max-w-[45ch] font-body text-lg leading-relaxed text-charcoal/60">
                Setting up your Veltro environment takes less than 5 minutes. Start your trial today and experience the difference of clinical precision in your operations.
              </p>

              <div className="mt-12 space-y-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-moss/10 text-moss">
                      <benefit.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <p className="font-heading text-sm font-semibold text-charcoal/80">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Enhanced Social Proof */}
              <div className="mt-16 inline-flex items-center gap-6 rounded-3xl border border-cream-300 bg-white/50 p-4 pr-8 backdrop-blur-sm">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-cream bg-charcoal/20 ring-2 ring-cream-100"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-charcoal">
                    Trusted by 200+ leaders
                  </p>
                  <p className="font-body text-xs text-charcoal/50">
                    in Facility, Mfg & Healthcare
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right -- Signup Form */}
          <ScrollReveal delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[4rem] bg-moss/5 blur-3xl" />
              <div className="relative rounded-[3rem] bg-charcoal p-8 text-cream shadow-2xl sm:p-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/30">
                  // registration
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold text-cream">
                  Create Account
                </h2>
                
                <form className="mt-10 space-y-5" action="#">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="font-mono text-[10px] uppercase tracking-wider text-cream/40">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="rounded-full border border-cream/10 bg-white/5 px-5 py-4 font-body text-sm text-cream transition-all duration-300 focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="workEmail" className="font-mono text-[10px] uppercase tracking-wider text-cream/40">
                      Work Email
                    </label>
                    <input
                      id="workEmail"
                      name="workEmail"
                      type="email"
                      className="rounded-full border border-cream/10 bg-white/5 px-5 py-4 font-body text-sm text-cream transition-all duration-300 focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss"
                      placeholder="jane@organization.com"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="companyName" className="font-mono text-[10px] uppercase tracking-wider text-cream/40">
                        Organization
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        className="rounded-full border border-cream/10 bg-white/5 px-5 py-4 font-body text-sm text-cream transition-all duration-300 focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss"
                        placeholder="Veltro Inc."
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="teamSize" className="font-mono text-[10px] uppercase tracking-wider text-cream/40">
                        Operational Scale
                      </label>
                      <select
                        id="teamSize"
                        name="teamSize"
                        className="rounded-full border border-cream/10 bg-white/5 px-5 py-4 font-body text-sm text-cream transition-all duration-300 focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss appearance-none"
                      >
                        <option className="text-charcoal">1-10 Users</option>
                        <option className="text-charcoal">11-50 Users</option>
                        <option className="text-charcoal">51-200 Users</option>
                        <option className="text-charcoal">200+ Users</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-mono text-[10px] uppercase tracking-wider text-cream/40">
                      Access Key (Password)
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="rounded-full border border-cream/10 bg-white/5 px-5 py-4 font-body text-sm text-cream transition-all duration-300 focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="pt-4">
                    <MagneticButton type="submit" variant="clay" size="lg" className="w-full">
                      Activate 14-Day Trial
                    </MagneticButton>
                  </div>
                  <p className="text-center font-body text-[10px] leading-relaxed text-cream/30">
                    By clinical activation, you agree to our{" "}
                    <Link href="/terms" className="text-clay transition-colors hover:text-clay/80 underline underline-offset-4">
                      Protocol Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-clay transition-colors hover:text-clay/80 underline underline-offset-4">
                      Privacy Shield
                    </Link>
                    .
                  </p>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
