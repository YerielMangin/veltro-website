export const siteConfig = {
  name: "Veltro",
  tagline: "Velocity + Control",
  description:
    "The modern CMMS platform that gives maintenance teams velocity without losing control.",
  url: "https://getveltro.com",
  appUrl: "https://app.getveltro.com",
  docsUrl: "https://docs.getveltro.com",
  ogImage: "https://getveltro.com/og/default.png",

  links: {
    twitter: "https://twitter.com/veltroio",
    github: "https://github.com/veltro-io",
    linkedin: "https://linkedin.com/company/veltro-io",
    discord: "https://discord.gg/veltro",
    youtube: "https://youtube.com/@veltro",
  },

  support: {
    email: "support@getveltro.com",
    sales: "sales@getveltro.com",
    status: "https://status.getveltro.com",
  },

  legal: {
    company: "Veltro Inc.",
    address: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
