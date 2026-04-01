import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the team building the future of maintenance management.",
};

const openings = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
    tags: ["TypeScript", "React", "Node.js"],
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote",
    type: "Full-time",
    tags: ["Figma", "Design Systems", "UX"],
  },
  {
    title: "Solutions Engineer",
    team: "Customer Success",
    location: "Remote",
    type: "Full-time",
    tags: ["CMMS", "Onboarding", "Technical"],
  },
];

const values = [
  {
    title: "Craft over convention",
    description:
      "We obsess over the details. Every interaction, every workflow, every pixel is intentional.",
  },
  {
    title: "Speed without shortcuts",
    description:
      "Move fast, but never compromise on quality. Our users depend on reliability.",
  },
  {
    title: "Built for operators",
    description:
      "We design for the people doing the work — field technicians, facility managers, and maintenance leads.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-32 bg-cream" />

      {/* Hero */}
      <section className="bg-cream px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <span className="mb-3 block font-mono text-xs text-charcoal/40">
            // careers
          </span>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-charcoal sm:text-5xl md:text-6xl">
            Build something
            <br />
            that matters
          </h1>
          <p className="mt-6 max-w-[55ch] font-body text-lg text-charcoal/60">
            We&rsquo;re a small team solving a big problem. Join us in building
            the modern CMMS that maintenance teams deserve.
          </p>
        </div>
      </section>

      {/* Open positions */}
      <section className="bg-cream px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 font-heading text-2xl font-bold tracking-tight text-charcoal">
            Open positions
          </h2>

          <div className="space-y-4">
            {openings.map((job) => (
              <Link
                key={job.title}
                href={`/careers/${job.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group block"
              >
                <div className="rounded-[2rem] border border-cream-300 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-charcoal transition-colors duration-300 group-hover:text-clay">
                        {job.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-3 font-body text-sm text-charcoal/50">
                        <span>{job.team}</span>
                        <span className="text-charcoal/20">|</span>
                        <span>{job.location}</span>
                        <span className="text-charcoal/20">|</span>
                        <span>{job.type}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-moss/10 px-3 py-1 font-mono text-xs text-moss"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-charcoal/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-clay" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <span className="mb-3 block font-mono text-xs text-charcoal/40">
            // culture
          </span>
          <h2 className="mb-12 font-heading text-3xl font-bold tracking-tight text-charcoal">
            What drives us
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-[2rem] border border-cream-300 bg-cream-50 p-8 shadow-sm"
              >
                <h3 className="font-heading text-base font-semibold text-charcoal">
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

      {/* CTA */}
      <section className="bg-cream px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-charcoal">
              Don&rsquo;t see your role?
            </h2>
            <p className="mt-3 font-body text-base text-charcoal/60">
              We&rsquo;re always looking for talented people. Send us a note.
            </p>
          </div>
          <MagneticButton href="/contact" variant="outline">
            Get in touch
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
