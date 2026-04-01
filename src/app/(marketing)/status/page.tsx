import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Status",
  description: "Current operational status of the Veltro platform.",
};

const services = [
  { name: "Web Application", status: "operational" as const },
  { name: "API", status: "operational" as const },
  { name: "Database", status: "operational" as const },
  { name: "Authentication", status: "operational" as const },
  { name: "File Storage", status: "operational" as const },
  { name: "Email Delivery", status: "operational" as const },
];

const statusConfig = {
  operational: {
    color: "bg-emerald-500",
    label: "Operational",
    labelColor: "text-emerald-700",
  },
  degraded: {
    color: "bg-amber-500",
    label: "Degraded",
    labelColor: "text-amber-700",
  },
  outage: {
    color: "bg-red-500",
    label: "Outage",
    labelColor: "text-red-700",
  },
};

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-32 bg-cream" />

      {/* Hero */}
      <section className="bg-cream px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <span className="mb-3 block font-mono text-xs text-charcoal/40">
            // status
          </span>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            System status
          </h1>

          {/* Overall status indicator */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-cream-300 bg-white px-5 py-3 shadow-sm">
            <span
              className={`h-3 w-3 rounded-full ${
                allOperational ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span
              className={`font-heading text-sm font-semibold ${
                allOperational ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {allOperational
                ? "All systems operational"
                : "Some systems experiencing issues"}
            </span>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-cream px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl space-y-3">
          {services.map((service) => {
            const config = statusConfig[service.status];
            return (
              <div
                key={service.name}
                className="rounded-[2rem] border border-cream-300 bg-white px-8 py-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-charcoal">
                    {service.name}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${config.color}`} />
                    <span className={`font-body text-sm ${config.labelColor}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Uptime note */}
      <section className="bg-white px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs text-charcoal/40">
            // uptime
          </p>
          <p className="mt-4 font-display text-4xl italic text-charcoal md:text-5xl">
            99.9% <span className="text-clay">uptime</span>
          </p>
          <p className="mx-auto mt-4 max-w-md font-body text-base text-charcoal/60">
            Veltro is built on enterprise-grade infrastructure. For real-time
            incident updates, subscribe to our status feed.
          </p>
        </div>
      </section>
    </>
  );
}
