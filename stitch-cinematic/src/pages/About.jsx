import SectionWrapper from '../components/shared/SectionWrapper'
import ScrollReveal from '../components/shared/ScrollReveal'
import BlurOrb from '../components/shared/BlurOrb'
import MagneticButton from '../components/ui/MagneticButton'

const values = [
  {
    icon: 'visibility',
    title: 'Clarity over features',
    description:
      "We'd rather build one thing that works perfectly than ten things that sort of work. Every module earns its place in our ecosystem.",
  },
  {
    icon: 'bolt',
    title: 'Speed is earned',
    description:
      'Velocity comes from consistency and clarity — not from working harder. We build tools that create the conditions for elite speed.',
  },
  {
    icon: 'engineering',
    title: 'Operations deserves better',
    description:
      "The people who keep everything running shouldn't have to fight their software. We build for the frontline professional first.",
  },
]

const stats = [
  { number: '25', label: 'Modules' },
  { number: '∞', label: 'Users on Operations plan' },
  { number: '< 2 min', label: 'Setup time' },
  { number: '14 days', label: 'Trial, no card required' },
]

export default function About() {
  return (
    <div className="bg-surface text-on-surface">
      {/* Hero */}
      <header className="relative min-h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
        <BlurOrb color="bg-secondary" size="w-[800px] h-[800px]" className="opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <ScrollReveal>
            <span className="block font-headline text-surface/60 text-xl md:text-2xl mb-4 tracking-tight">
              About Veltro
            </span>
            <h1 className="font-display italic text-surface text-5xl md:text-7xl leading-tight">
              Built for the people who keep everything running.
            </h1>
          </ScrollReveal>
        </div>
      </header>

      {/* Story */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left — Text */}
          <ScrollReveal>
            <div className="space-y-8">
              <span className="font-label text-xs uppercase tracking-widest text-secondary block">
                Our Story
              </span>
              <h2 className="font-headline text-3xl md:text-5xl text-primary font-bold tracking-tighter">
                Why we built Veltro
              </h2>
              <div className="space-y-6 text-primary/80 text-lg leading-relaxed font-body">
                <p>
                  Operations teams — the people who maintain buildings, manage equipment, run inspections, and keep facilities safe — are the most underserved professionals in business software.
                </p>
                <p>
                  Sales teams have Salesforce. Engineering teams have Jira. Marketing has HubSpot. But the people who physically keep organizations running? They get spreadsheets, group chats, and systems built in the '90s.
                </p>
                <p>
                  Veltro exists to change that. We built a modern operations platform that gives these teams the clarity, consistency, and speed they deserve. Not by adding complexity — by removing it.
                </p>
                <p>
                  One place for every asset, every work order, every inspection, every incident. Connected workflows that turn findings into actions automatically. Dashboards that show what matters.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Image placeholder */}
          <ScrollReveal>
            <div className="relative group">
              <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-primary-fixed via-surface-container to-surface-dim overflow-hidden grayscale-[20%] hover:grayscale-0 transition-all duration-700 shadow-[0_40px_60px_-15px_rgba(24,42,33,0.06)]" />
              <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-sm rounded-lg p-4 max-w-xs shadow-xl">
                <span className="font-label text-xs uppercase tracking-widest text-primary/50 block mb-2">
                  Internal Motto
                </span>
                <p className="font-display italic text-primary text-xl">
                  "Reliability is a silent achievement."
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Values */}
      <section className="py-24 md:py-32 bg-tertiary text-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 xl:px-16">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-headline text-4xl md:text-5xl tracking-tight mb-4">What we believe</h2>
              <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <ScrollReveal key={v.title}>
                <div className="p-10 bg-[#2a2a2a] hover:bg-[#323232] transition-colors duration-300 rounded-xl flex flex-col items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {v.icon}
                    </span>
                  </div>
                  <h3 className="font-headline text-white text-xl font-bold">{v.title}</h3>
                  <p className="font-body text-white/60 leading-relaxed">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <SectionWrapper className="bg-surface">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <ScrollReveal key={s.label}>
              <div className="flex flex-col items-center text-center">
                <span className="font-display italic text-5xl md:text-7xl text-secondary mb-2">
                  {s.number}
                </span>
                <span className="font-label text-xs uppercase tracking-widest text-primary/60">
                  {s.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="relative py-24 md:py-32 bg-primary overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <ScrollReveal>
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <h2 className="font-display italic text-surface text-4xl md:text-6xl mb-12">
              Want to see what we're building?
            </h2>
            <MagneticButton variant="clay" to="/demo" className="text-lg px-10 py-5">
              Start Your 14-Day Trial
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
