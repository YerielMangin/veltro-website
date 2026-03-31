import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug, getAllContent, type ContentMeta } from "@/lib/content";
import { SecondaryHero } from "@/components/marketing/SecondaryHero";
import { PhilosophySection } from "@/components/marketing/PhilosophySection";
import { CTASection } from "@/components/marketing/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface UseCaseMeta extends ContentMeta {
  industry: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cases = getAllContent<UseCaseMeta>("use-cases");
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getContentBySlug<UseCaseMeta>("use-cases", slug);
  if (!useCase) return {};

  return {
    title: `${useCase.meta.title} | Veltro`,
    description: useCase.meta.description,
  };
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const useCase = getContentBySlug<UseCaseMeta>("use-cases", slug);
  if (!useCase) notFound();

  return (
    <div className="min-h-screen bg-cream">
      <SecondaryHero 
        line1="Veltro for" 
        line2={`${useCase.meta.industry}.`} 
        description={useCase.meta.description}
      />

      <PhilosophySection 
        line1={`Most ${useCase.meta.industry.toLowerCase()} teams struggle with data silos.`}
        line2Part1="We provide:"
        line2Part2="absolute"
        line2Accent="operational clarity."
      />

      <section className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <ScrollReveal>
          <div className="prose prose-lg max-w-none font-body prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-charcoal prose-p:leading-relaxed prose-p:text-charcoal/80 prose-strong:text-charcoal sm:prose-xl">
            <div dangerouslySetInnerHTML={{ __html: useCase.content }} />
          </div>
        </ScrollReveal>
      </section>

      <CTASection />
    </div>
  );
}
