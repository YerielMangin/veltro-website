import type { Metadata } from "next";
import { SecondaryHero } from "@/components/marketing/SecondaryHero";
import { PhilosophySection } from "@/components/marketing/PhilosophySection";
import { ProtocolSection } from "@/components/marketing/ProtocolSection";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "Our Spirit | Veltro",
  description: "Why we believe operations teams deserve better software. The philosophy behind the Veltro Operational OS.",
};

const values = [
  {
    tag: "// vision",
    title: "Flow, not Friction",
    description: "Every operation has a natural rhythm. We build tools that reveal it, not hide it behind spreadsheets.",
  },
  {
    tag: "// approach",
    title: "Velocity through Clarity",
    description: "Speed isn't about working harder. It's about seeing clearly. One shared truth for every technician and director.",
  },
  {
    tag: "// purpose",
    title: "The Underserved",
    description: "Operations teams are the backbone of infrastructure. They deserve the same caliber of software as sales and engineering.",
  },
  {
    tag: "// standard",
    title: "Clinical Precision",
    description: "No sharp corners. No generic patterns. We build digital instruments for professionals who demand excellence.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SecondaryHero 
        line1="Operations should feel like" 
        line2="Flow, not Friction." 
        description="Veltro exists because we believe the people who keep buildings running and equipment humming deserve better than clunky legacy tools."
      />

      {/* Manifesto Section */}
      <PhilosophySection 
        line1="Most operations focus on: managing the chaos."
        line2Part1="We focus on:"
        line2Part2="eliminating"
        line2Accent="it."
      />

      {/* Values Grid */}
      <section className="bg-cream px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-[2rem] border border-cream-300 bg-white p-8 shadow-sm transition-shadow hover:shadow-[var(--shadow-card-hover)]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/30">
                  {value.tag}
                </span>
                <h3 className="mt-4 font-heading text-xl font-bold text-charcoal">
                  {value.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/60">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol / The HOW */}
      <div className="bg-charcoal pt-24 text-center">
        <span className="font-mono text-xs text-cream/30 uppercase tracking-[0.5em]">
          // the protocol
        </span>
        <h2 className="mt-4 font-display text-4xl italic text-cream md:text-6xl">
          Velocity + <span className="text-clay">Control.</span>
        </h2>
      </div>
      <ProtocolSection />

      <CTASection />
    </>
  );
}
