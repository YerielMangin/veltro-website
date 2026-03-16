export interface NavItem {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const mainNav: NavItem[] = [
  { title: "Features", href: "/features" },
  { title: "Pricing", href: "/pricing" },
  { title: "Customers", href: "/customers" },
  { title: "Blog", href: "/blog" },
  { title: "Integrations", href: "/integrations" },
];

export const footerNav: NavGroup[] = [
  {
    title: "Product",
    items: [
      { title: "Features", href: "/features" },
      { title: "Pricing", href: "/pricing" },
      { title: "Integrations", href: "/integrations" },
      { title: "Changelog", href: "/changelog" },
      { title: "Status", href: "/status", external: true },
    ],
  },
  {
    title: "Solutions",
    items: [
      { title: "Facility Management", href: "/use-cases/facility-management" },
      { title: "Manufacturing", href: "/use-cases/manufacturing" },
      { title: "Property Management", href: "/use-cases/property-management" },
      { title: "Healthcare", href: "/use-cases/healthcare" },
      { title: "Education", href: "/use-cases/education" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Blog", href: "/blog" },
      { title: "Documentation", href: "https://docs.veltro.io", external: true },
      { title: "API Reference", href: "https://docs.veltro.io/api", external: true },
      { title: "Partners", href: "/partners" },
      { title: "Demo", href: "/demo" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Careers", href: "/careers", badge: "Hiring" },
      { title: "Contact", href: "/contact" },
      { title: "Security", href: "/security" },
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
    ],
  },
];

export const featureNav: NavItem[] = [
  { title: "Work Orders", href: "/features#work-orders", description: "Create, assign, and track work orders with real-time status updates" },
  { title: "Asset Management", href: "/features#assets", description: "Complete asset lifecycle tracking from acquisition to retirement" },
  { title: "Preventive Maintenance", href: "/features#pm", description: "Schedule and automate recurring maintenance to prevent downtime" },
  { title: "Inspections", href: "/features#inspections", description: "Digital inspection checklists with photo capture and geolocation" },
  { title: "Inventory", href: "/features#inventory", description: "Parts and supplies tracking with automatic reorder alerts" },
  { title: "Reports & Analytics", href: "/features#reports", description: "Real-time dashboards and exportable reports for data-driven decisions" },
  { title: "Mobile App", href: "/features#mobile", description: "Full-featured mobile app for field technicians", badge: "Coming soon" },
  { title: "API & Integrations", href: "/features#api", description: "RESTful API and webhook system for connecting your tools" },
];
