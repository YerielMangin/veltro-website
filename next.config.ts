import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/app", destination: "https://app.getveltro.com", permanent: false },
      { source: "/dashboard", destination: "https://app.getveltro.com", permanent: false },
    ];
  },
};

export default withMDX(nextConfig);
