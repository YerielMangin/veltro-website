export interface PricingTier {
  name: string;
  slug: string;
  description: string;
  monthlyPrice: number | null; // null = custom
  annualPrice: number | null;
  highlighted?: boolean;
  badge?: string;
  features: string[];
  limits: {
    users: string;
    assets: string;
    storage: string;
    apiCalls: string;
  };
  cta: {
    label: string;
    href: string;
  };
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    slug: "starter",
    description: "Get your team on the same page",
    monthlyPrice: 29,
    annualPrice: 24,
    features: [
      "Work Orders",
      "Asset Management",
      "Locations & Sites",
      "Up to 5 Users",
      "Basic Reporting",
      "Mobile Access",
    ],
    limits: {
      users: "5 users",
      assets: "100 assets",
      storage: "5 GB",
      apiCalls: "Basic",
    },
    cta: { label: "Start Trial", href: "/demo?plan=starter" },
  },
  {
    name: "Operations",
    slug: "operations",
    description: "See everything. Control everything.",
    monthlyPrice: 79,
    annualPrice: 66,
    highlighted: true,
    badge: "Recommended",
    features: [
      "Everything in Starter",
      "Inspections & Checklists",
      "Incident Tracking",
      "Inventory Management",
      "PM Schedules",
      "Advanced Analytics",
      "Unlimited Users",
    ],
    limits: {
      users: "Unlimited",
      assets: "1,000 assets",
      storage: "25 GB",
      apiCalls: "Advanced",
    },
    cta: { label: "Start Trial", href: "/demo?plan=operations" },
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    description: "Scale with confidence",
    monthlyPrice: null,
    annualPrice: null,
    features: [
      "Everything in Operations",
      "Multi-site Management",
      "API & Webhooks",
      "Audit Logs",
      "SSO / SAML",
      "Dedicated Support",
      "Custom Training",
    ],
    limits: {
      users: "Unlimited",
      assets: "Unlimited",
      storage: "Unlimited",
      apiCalls: "Unlimited",
    },
    cta: { label: "Talk to Us", href: "/contact?plan=enterprise" },
  },
];
