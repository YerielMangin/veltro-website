import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-clay focus:px-4 focus:py-2 focus:font-heading focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <NoiseOverlay />
    </div>
  );
}
