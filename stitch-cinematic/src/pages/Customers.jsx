import SectionWrapper from '../components/shared/SectionWrapper'
import ScrollReveal from '../components/shared/ScrollReveal'
import MagneticButton from '../components/ui/MagneticButton'

export default function Customers() {
  const stories = [
    {
      icon: 'domain',
      industry: 'Property Management',
      company: 'Lumina Residential',
      quote: 'Reduced inspection prep time from 3 weeks to 2 days across 14 properties.',
    },
    {
      icon: 'health_and_safety',
      industry: 'Healthcare',
      company: 'St. Jude Medical Center',
      quote: 'Achieved 100% compliance audit success for medical equipment maintenance.',
    },
    {
      icon: 'school',
      industry: 'Education',
      company: 'Oakwood University',
      quote: 'Centralized facility requests for 3 campuses into one unified ledger.',
    },
    {
      icon: 'factory',
      industry: 'Manufacturing',
      company: 'Precision Dynamics',
      quote: 'Eliminated $200k in annual downtime costs through predictive modeling.',
    },
  ]

  const industries = [
    { icon: 'apartment', label: 'Facility Management' },
    { icon: 'precision_manufacturing', label: 'Manufacturing' },
    { icon: 'local_hospital', label: 'Healthcare' },
    { icon: 'history_edu', label: 'Education' },
    { icon: 'real_estate_agent', label: 'Property Management' },
  ]

  return (
    <div className="pt-24">
      {/* Hero */}
      <header className="bg-tertiary flex flex-col items-center justify-center text-center px-5 md:px-8 py-24 md:py-32 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="font-label text-secondary text-sm tracking-widest mb-4 block uppercase">
            Customer Stories
          </span>
          <h1 className="font-display italic text-5xl md:text-7xl text-surface mb-6 leading-tight">
            Teams that found their rhythm.
          </h1>
          <p className="font-body text-surface/50 text-lg md:text-xl max-w-2xl mx-auto">
            See how operations teams across industries use Veltro to gain clarity and velocity.
          </p>
        </div>
      </header>

      {/* Featured Story */}
      <SectionWrapper className="bg-surface">
        <ScrollReveal>
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(24,42,33,0.04)] grid grid-cols-1 md:grid-cols-2">
            <div className="min-h-[400px] bg-gradient-to-br from-primary-container via-primary to-tertiary relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <span className="material-symbols-outlined text-white" style={{ fontSize: '8rem' }}>
                  precision_manufacturing
                </span>
              </div>
            </div>
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <span className="font-label text-secondary text-xs mb-8 uppercase tracking-widest block">
                Featured Narrative — Apex Logistics
              </span>
              <blockquote className="font-display italic text-2xl md:text-3xl text-primary leading-tight mb-8">
                "Veltro didn't just organize our tasks; it changed how our people think about
                operations. We finally stopped fighting fires and started building futures."
              </blockquote>
              <div className="mb-10">
                <div className="font-label text-primary font-bold text-sm tracking-widest">
                  MARCUS CHEN
                </div>
                <div className="font-label text-on-surface-variant text-xs tracking-wider">
                  Director of Operations, Apex Global
                </div>
              </div>
              <div className="border-t border-surface-variant pt-8 mb-8">
                <div className="font-headline text-4xl text-secondary font-extrabold mb-2">
                  40% reduction
                </div>
                <div className="font-body text-on-surface-variant">
                  in reactive work orders within six months
                </div>
              </div>
              <a
                href="#"
                className="text-secondary font-semibold flex items-center gap-2 hover:translate-x-2 transition-transform font-body"
              >
                Read the full story
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* All Stories Grid */}
      <SectionWrapper className="bg-surface-container-lowest">
        <ScrollReveal>
          <h2 className="font-headline text-3xl mb-16 text-primary tracking-tight">
            Voices of Efficiency
          </h2>
        </ScrollReveal>
        <ScrollReveal stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story) => (
              <div
                key={story.company}
                className="p-10 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors group"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-surface">
                    <span className="material-symbols-outlined">{story.icon}</span>
                  </div>
                  <span className="font-label text-secondary text-[10px] px-3 py-1 rounded-full bg-secondary/10 uppercase tracking-wider">
                    {story.industry}
                  </span>
                </div>
                <h3 className="font-headline text-2xl text-primary mb-4">{story.company}</h3>
                <p className="font-body text-on-surface-variant text-lg mb-8 leading-relaxed">
                  {story.quote}
                </p>
                <a
                  href="#"
                  className="text-secondary font-semibold flex items-center gap-2 font-body"
                >
                  Read story
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Industries We Serve */}
      <SectionWrapper className="bg-surface-container-low">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="font-label text-xs text-on-surface-variant/60 tracking-[0.2em] mb-12 uppercase">
              Tailored for your ecosystem
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {industries.map((item) => (
                <div
                  key={item.label}
                  className="bg-surface-container-lowest px-8 py-4 rounded-full flex items-center gap-3 shadow-sm border border-outline-variant/10"
                >
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  <span className="font-body font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-primary text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display italic text-5xl text-surface mb-8">
              Your team could be next.
            </h2>
            <p className="font-body text-surface/70 text-lg mb-12 max-w-xl mx-auto">
              Experience the operational operating system designed for modern scale.
            </p>
            <MagneticButton variant="clay" to="/demo">
              Start Your 14-Day Trial
            </MagneticButton>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </div>
  )
}
