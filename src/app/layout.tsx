import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/lib/posthog-provider";
import "@/styles/globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getveltro.com"),
  title: {
    default: "Veltro — Velocity + Control for Maintenance Management",
    template: "%s | Veltro",
  },
  description:
    "The modern CMMS platform that gives maintenance teams velocity without losing control. Work orders, assets, inspections, and more — all in one place.",
  keywords: [
    "CMMS",
    "maintenance management",
    "work orders",
    "asset management",
    "facility management",
    "preventive maintenance",
    "inspection software",
    "SaaS",
    "multi-tenant",
  ],
  authors: [{ name: "Veltro" }],
  creator: "Veltro",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/images/veltro-logo-thumbnail.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getveltro.com",
    siteName: "Veltro",
    title: "Veltro — Velocity + Control for Maintenance Management",
    description:
      "The modern CMMS platform that gives maintenance teams velocity without losing control.",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Veltro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veltro — Velocity + Control",
    description:
      "The modern CMMS platform that gives maintenance teams velocity without losing control.",
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F0E9" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${outfit.variable} ${cormorant.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen bg-cream font-body text-charcoal antialiased">
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
