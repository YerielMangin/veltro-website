import type { Metadata } from "next";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect Veltro to the tools your team already uses.",
};

const categories = [
  {
    name: "Communication",
    integrations: [
      {
        name: "Slack",
        description: "Get work order notifications in your channels",
        status: "available" as const,
      },
      {
        name: "Microsoft Teams",
        description: "Integrate with Teams for notifications and approvals",
        status: "available" as const,
      },
      {
        name: "Email (SMTP)",
        description: "Custom email notifications and alerts",
        status: "available" as const,
      },
    ],
  },
  {
    name: "Business Tools",
    integrations: [
      {
        name: "Zapier",
        description: "Connect to 5,000+ apps with no-code workflows",
        status: "available" as const,
      },
      {
        name: "Power Automate",
        description: "Microsoft automation for enterprise workflows",
        status: "available" as const,
      },
      {
        name: "QuickBooks",
        description: "Sync maintenance costs and invoices",
        status: "coming" as const,
      },
    ],
  },
  {
    name: "IoT & Sensors",
    integrations: [
      {
        name: "Webhooks",
        description: "Receive real-time data from any IoT platform",
        status: "available" as const,
      },
      {
        name: "REST API",
        description: "Full API access for custom sensor integrations",
        status: "available" as const,
      },
      {
        name: "MQTT Bridge",
        description: "Direct MQTT protocol support for IoT devices",
        status: "coming" as const,
      },
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <>
      {/* Navbar spacer */}
      <div className="h-32 bg-cream" />

      {/* Hero */}
      <section className="bg-cream pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-mono text-xs text-charcoal/40">// connections</p>
          <h1 className="mt-4 max-w-2xl font-heading text-4xl font-bold tracking-tight text-charcoal sm:text-5xl md:text-6xl">
            Connect your{" "}
            <em className="font-display italic text-moss">entire stack</em>
          </h1>
          <p className="mt-6 max-w-[55ch] font-body text-base leading-relaxed text-charcoal/60 sm:text-lg">
            Veltro works with the tools your team already uses. Connect via API,
            webhooks, or pre-built integrations.
          </p>
        </div>
      </section>

      {/* Integration categories */}
      {categories.map((category, ci) => (
        <section
          key={category.name}
          className={`py-24 lg:py-32 ${ci % 2 === 0 ? "bg-cream-50" : "bg-cream"}`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="font-mono text-xs text-charcoal/40">
              // {category.name.toLowerCase()}
            </p>
            <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-charcoal">
              {category.name}
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="rounded-[2rem] border border-cream-300 bg-cream-50 p-8 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    {/* Icon placeholder */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-300/40">
                      <span className="font-mono text-xs text-charcoal/30">
                        {integration.name.slice(0, 2)}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 font-mono text-[10px] font-medium ${
                        integration.status === "available"
                          ? "bg-moss/10 text-moss"
                          : "bg-clay/10 text-clay"
                      }`}
                    >
                      {integration.status === "available"
                        ? "Available"
                        : "Coming soon"}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-base font-semibold text-charcoal">
                    {integration.name}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">
                    {integration.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-xs text-cream/40">// build</p>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-cream sm:text-4xl">
                Need a custom integration?
              </h2>
              <p className="mt-4 font-body text-base text-cream/60">
                Our API supports full CRUD operations. Build anything you need.
              </p>
            </div>
            <MagneticButton href="/contact" variant="outline-cream" size="lg">
              Talk to engineering
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
