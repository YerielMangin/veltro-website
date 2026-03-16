export const siteConfig = {
  name: "Veltro",
  tagline: "Velocity + Control",
  description:
    "The modern CMMS platform that gives maintenance teams velocity without losing control.",
  url: "https://veltro.io",
  appUrl: "https://app.veltro.io",
  docsUrl: "https://docs.veltro.io",
  ogImage: "https://veltro.io/og/default.png",

  links: {
    twitter: "https://twitter.com/veltroio",
    github: "https://github.com/veltro-io",
    linkedin: "https://linkedin.com/company/veltro-io",
    discord: "https://discord.gg/veltro",
    youtube: "https://youtube.com/@veltro",
  },

  support: {
    email: "support@veltro.io",
    sales: "sales@veltro.io",
    status: "https://status.veltro.io",
  },

  legal: {
    company: "Veltro Inc.",
    address: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
