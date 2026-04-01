import type { Metadata } from "next";
import { SecondaryHero } from "@/components/marketing/SecondaryHero";
import { PricingSection } from "@/components/marketing/PricingSection";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "Pricing | Veltro",
  description: "Simple, transparent protocols for teams of all sizes. Choose the rhythm that fits your operation.",
};

export default function PricingPage() {
  return (
    <>
      <SecondaryHero 
        line1="Choose your" 
        line2="Protocol." 
        description="Simple, transparent pricing designed to scale with your operational maturity. No hidden fees. No friction."
      />
      <PricingSection />
      <CTASection />
    </>
  );
}
