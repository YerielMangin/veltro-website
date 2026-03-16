import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench, BarChart3, ClipboardCheck, Zap, Package, Shield,
  Users, Globe, Smartphone, Webhook, FileText, MapPin,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore every feature of Veltro — the complete CMMS platform for modern maintenance teams.",
};

const featureSections = [
  {
    id: "work-orders",
    icon: Wrench,
    title: "Work Order Management",
    description: "From request to resolution — manage the full lifecycle of every work order.",
    bullets: [
      "Create work orders from requests, inspections, or PM schedules",
      "Assign to teams or individuals with priority levels",
      "Track time, labor, and parts costs per work order",
      "Real-time status updates and notifications",
      "Attach photos, documents, and notes",
    ],
  },
  {
    id: "assets",
    icon: BarChart3,
    title: "Asset Management",
    description: "Know the complete history and health of every asset you maintain.",
    bullets: [
      "Full asset registry with hierarchy (parent/child)",
      "Maintenance history, cost tracking, and depreciation",
      "QR code / barcode scanning for quick lookup",
      "Custom fields for any asset attribute",
      "Warranty and vendor tracking",
    ],
  },
  {
    id: "inspections",
    icon: ClipboardCheck,
    title: "Inspections & Checklists",
    description: "Standardize inspections with digital checklists that auto-escalate issues.",
    bullets: [
      "Configurable inspection templates",
      "Pass/fail, numeric, text, and photo response types",
      "GPS stamps and timestamps on every entry",
      "Automatic work order creation on failed items",
      "Inspection schedule management",
    ],
  },
  {
    id: "pm",
    icon: Zap,
    title: "Preventive Maintenance",
    description: "Stop reacting — start preventing. Auto-generate work orders on schedule.",
    bullets: [
      "Calendar-based (daily, weekly, monthly, yearly)",
      "Meter-based triggers (hours, miles, cycles)",
      "Auto-generates work orders with full instructions",
      "Compliance tracking and audit trail",
      "Seasonal and equipment-specific schedules",
    ],
  },
  {
    id: "inventory",
    icon: Package,
    title: "Inventory & Parts",
    description: "Never run out of critical parts. Track stock, costs, and reorder points.",
    bullets: [
      "Real-time stock levels across locations",
      "Automatic reorder alerts at min thresholds",
      "Link parts to assets and work orders",
      "Vendor catalog and purchase history",
      "Barcode scanning for receiving and issuing",
    ],
  },
  {
    id: "reports",
    icon: FileText,
    title: "Reports & Analytics",
    description: "Data-driven decisions with real-time dashboards and exportable reports.",
    bullets: [
      "Work order completion rates and SLA compliance",
      "Asset downtime and MTBF/MTTR metrics",
      "Labor and cost analysis by team, location, or asset",
      "Scheduled report delivery via email",
      "Export to PDF, CSV, or Excel",
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App",
    description: "Your full CMMS in your pocket — built for field technicians.",
    bullets: [
      "Native iOS and Android app",
      "Offline-capable for areas with no signal",
      "Photo capture directly into work orders",
      "Push notifications for assignments",
      "Barcode/QR scanning for asset lookup",
    ],
  },
  {
    id: "api",
    icon: Webhook,
    title: "API & Integrations",
    description: "Connect Veltro to your existing tools with our RESTful API and webhooks.",
    bullets: [
      "RESTful API with full CRUD for all entities",
      "Webhook events for work orders, assets, inspections",
      "API key management with rotation support",
      "Rate limiting and usage analytics",
      "Pre-built integrations for popular tools",
    ],
  },
  {
    id: "multi-tenant",
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with multi-tenant isolation and compliance features.",
    bullets: [
      "Row-level security — tenants can never see each other's data",
      "SSO / SAML support (Enterprise plan)",
      "Audit logs for every data change",
      "SOC 2 Type II compliant infrastructure",
      "Data encryption at rest and in transit",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Built for modern maintenance teams
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Every feature you need to run world-class maintenance operations — nothing you don't.
        </p>
      </div>

      <div className="mt-24 space-y-32">
        {featureSections.map((section, i) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <div className={`flex flex-col gap-12 lg:flex-row lg:items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className="flex-1">
                <div className="inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <section.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">{section.description}</p>
                <ul className="mt-8 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <div className="aspect-[4/3] rounded-xl border border-border bg-muted/50">
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    {section.title} screenshot
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-bold text-foreground">See it in action</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          14-day free trial. No credit card required.
        </p>
        <Link
          href="/demo"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
        >
          Start free trial
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
