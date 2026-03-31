import { HeroSection } from "@/components/marketing/HeroSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { PhilosophySection } from "@/components/marketing/PhilosophySection";
import { ProtocolSection } from "@/components/marketing/ProtocolSection";
import { CTASection } from "@/components/marketing/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PhilosophySection />
      <ProtocolSection />
      <CTASection />
    </>
  );
}
