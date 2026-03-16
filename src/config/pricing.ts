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
    description: "For small teams getting started with digital maintenance",
    monthlyPrice: 29,
    annualPrice: 24,
    features: [
      "Work order management",
      "Asset tracking",
      "Basic reporting",
      "Mobile app access",
      "Email support",
      "5 custom fields",
    ],
    limits: {
      users: "Up to 5 users",
      assets: "Up to 100 assets",
      storage: "5 GB storage",
      apiCalls: "1,000 API calls/mo",
    },
    cta: { label: "Start free trial", href: "/demo?plan=starter" },
  },
  {
    name: "Professional",
    slug: "professional",
    description: "For growing teams that need advanced features",
    monthlyPrice: 79,
    annualPrice: 66,
    highlighted: true,
    badge: "Most popular",
    features: [
      "Everything in Starter",
      "Preventive maintenance schedules",
      "Inspections & checklists",
      "Inventory management",
      "Advanced analytics",
      "Webhook integrations",
      "API access",
      "Unlimited custom fields",
      "Priority email support",
    ],
    limits: {
      users: "Up to 25 users",
      assets: "Up to 1,000 assets",
      storage: "25 GB storage",
      apiCalls: "10,000 API calls/mo",
    },
    cta: { label: "Start free trial", href: "/demo?plan=professional" },
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    description: "For large organizations with complex requirements",
    monthlyPrice: null,
    annualPrice: null,
    features: [
      "Everything in Professional",
      "Unlimited users & assets",
      "SSO / SAML authentication",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
      "On-premise deployment option",
      "Audit logs & compliance",
      "24/7 phone support",
      "Custom training",
    ],
    limits: {
      users: "Unlimited",
      assets: "Unlimited",
      storage: "Unlimited",
      apiCalls: "Unlimited",
    },
    cta: { label: "Contact sales", href: "/contact?plan=enterprise" },
  },
];
