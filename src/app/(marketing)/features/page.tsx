import type { Metadata } from "next";
import { FeaturesHero } from "@/components/marketing/FeaturesHero";
import { InteractiveFeatures } from "@/components/marketing/InteractiveFeatures";
import { FeaturesGrid } from "@/components/marketing/FeaturesGrid";
import { ProtocolSection } from "@/components/marketing/ProtocolSection";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "Features | Veltro",
  description: "Explore Veltro's operational toolkit — work orders, asset tracking, inspections, and more.",
};

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <InteractiveFeatures />
      <FeaturesGrid />
      <ProtocolSection />
      <CTASection />
    </>
  );
}
