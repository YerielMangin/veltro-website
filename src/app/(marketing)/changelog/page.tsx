import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Product updates, new features, and improvements to the Veltro platform.",
};

const entries = [
  {
    version: "0.9.0",
    date: "March 2026",
    type: "Beta",
    title: "Public Beta Launch",
    changes: [
      "Work order management with full lifecycle tracking",
      "Asset registry with hierarchy and custom fields",
      "Inspection templates with 21+ question types",
      "Preventive maintenance scheduling",
      "Inventory and parts management",
      "RESTful API and webhook integrations",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-32 bg-cream" />

      {/* Hero */}
      <section className="bg-cream px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <span className="mb-3 block font-mono text-xs text-charcoal/40">
            // changelog
          </span>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            What&rsquo;s new
          </h1>
          <p className="mt-4 max-w-[50ch] font-body text-lg text-charcoal/60">
            Product updates, new features, and improvements.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream px-6 pb-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          {/* Vertical timeline line */}
          <div className="relative border-l-2 border-cream-300 pl-8">
            {entries.map((entry) => (
              <div key={entry.version} className="relative pb-16 last:pb-0">
                {/* Timeline dot */}
                <span className="absolute -left-[calc(0.5rem+1px)] top-1 h-4 w-4 rounded-full border-2 border-clay bg-cream" />

                {/* Version badge row */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-clay/10 px-3 py-1 font-mono text-xs font-semibold text-clay">
                    {entry.type}
                  </span>
                  <span className="font-mono text-sm font-bold text-charcoal">
                    v{entry.version}
                  </span>
                  <span className="font-mono text-xs text-charcoal/40">
                    {entry.date}
                  </span>
                </div>

                {/* Card */}
                <div className="rounded-[2rem] border border-cream-300 bg-white p-8 shadow-sm">
                  <h2 className="font-heading text-xl font-bold tracking-tight text-charcoal">
                    {entry.title}
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {entry.changes.map((change) => (
                      <li
                        key={change}
                        className="flex items-start gap-3 font-body text-sm text-charcoal/70"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
