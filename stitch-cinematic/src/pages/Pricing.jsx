import SectionWrapper from '../components/shared/SectionWrapper'
import ScrollReveal from '../components/shared/ScrollReveal'
import MagneticButton from '../components/ui/MagneticButton'
import Accordion from '../components/ui/Accordion'

const faqItems = [
  {
    question: 'Can I switch plans later?',
    answer: 'Yes. Upgrade or downgrade anytime. Changes take effect on your next billing cycle.',
  },
  {
    question: 'What happens after my trial?',
    answer: 'You choose a plan or your account pauses. No surprise charges. Your data stays safe for 30 days.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer: 'Yes. Annual plans save 20% compared to monthly.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. Row-level security, encrypted at rest and in transit, SOC 2 compliance in progress.',
  },
  {
    question: 'Can I import data from my current system?',
    answer: 'Yes. We offer CSV import and a dedicated onboarding specialist for Operations and Enterprise plans.',
  },
]

function PricingCard({ tier, subtitle, headline, features, cta, highlight }) {
  return (
    <div
      className={[
        'relative flex flex-col rounded-xl p-10 transition-transform duration-500',
        highlight
          ? 'bg-primary text-white scale-105 shadow-[0_60px_80px_-20px_rgba(24,42,33,0.15)] z-10 border border-primary-container order-first md:order-none'
          : 'bg-surface-container-lowest border border-outline-variant/10 shadow-[0_40px_60px_-15px_rgba(24,42,33,0.04)] hover:scale-[1.02]',
      ].join(' ')}
    >
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-label font-bold px-4 py-1 rounded-full tracking-widest whitespace-nowrap">
          MOST POPULAR
        </div>
      )}

      <span className={`font-label text-xs uppercase tracking-widest mb-4 ${highlight ? 'text-white/50' : 'text-primary/50'}`}>
        {tier}
      </span>
      <p className={`text-sm mb-2 ${highlight ? 'text-white/70' : 'text-primary/70'}`}>{subtitle}</p>
      <h3 className={`font-display italic text-3xl leading-tight mb-8 ${highlight ? 'text-white' : 'text-primary'}`}>
        {headline}
      </h3>

      <ul className="space-y-4 mb-12 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3">
            <span
              className={`material-symbols-outlined text-xl ${highlight ? 'text-secondary' : 'text-primary'}`}
              style={f.fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {f.icon || 'check_circle'}
            </span>
            <span className={highlight ? (i === 0 ? 'text-white' : 'text-white/90') : 'text-on-surface-variant'}>
              {f.label}
            </span>
          </li>
        ))}
      </ul>

      <MagneticButton
        variant={highlight ? 'clay' : 'outline'}
        className="w-full justify-center py-4 text-base"
        to="/demo"
      >
        {cta}
      </MagneticButton>
    </div>
  )
}

export default function Pricing() {
  return (
    <div className="bg-surface text-on-surface">
      {/* Hero */}
      <header className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 bg-surface">
        <ScrollReveal>
          <p className="font-headline text-lg md:text-xl text-primary/60 tracking-tight mb-2">
            Simple, transparent
          </p>
          <h1 className="font-display italic text-6xl md:text-8xl text-primary leading-none">
            Pricing.
          </h1>
          <p className="mt-6 text-primary/50 text-lg md:text-xl max-w-xl mx-auto">
            Start where you are. Scale as you grow. No surprises.
          </p>
        </ScrollReveal>
      </header>

      {/* Pricing Grid */}
      <SectionWrapper className="bg-surface pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          <PricingCard
            tier="STARTER"
            subtitle="Small teams getting organized"
            headline="Get your team on the same page"
            features={[
              { label: 'Work Orders' },
              { label: 'Assets & Locations' },
              { label: '1 site' },
              { label: 'Up to 5 users' },
              { label: 'Email support' },
            ]}
            cta="Start Trial"
          />

          <PricingCard
            tier="OPERATIONS"
            subtitle="Growing operations that need visibility"
            headline="See everything. Control everything."
            highlight
            features={[
              { label: 'Everything in Starter', icon: 'stars', fill: true },
              { label: 'Inspections & Findings' },
              { label: 'Incidents & Corrective Actions' },
              { label: 'Inventory & Parts' },
              { label: 'PM Schedules' },
              { label: 'Dashboards & Analytics' },
              { label: 'Unlimited users' },
              { label: 'Priority support' },
            ]}
            cta="Start Trial"
          />

          <PricingCard
            tier="ENTERPRISE"
            subtitle="Multi-site orgs with compliance needs"
            headline="Scale with confidence"
            features={[
              { label: 'Everything in Operations', icon: 'layers', fill: true },
              { label: 'Multi-site management' },
              { label: 'API access' },
              { label: 'Audit logs & compliance' },
              { label: 'SSO / SAML' },
              { label: 'Dedicated account manager' },
              { label: 'Custom integrations' },
            ]}
            cta="Talk to Us"
          />
        </div>

        <div className="mt-16 text-center">
          <p className="font-label text-xs text-primary/50 tracking-wider">
            All plans include a 14-day trial. No credit card required.
          </p>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper className="bg-surface-container-low">
        <ScrollReveal>
          <h2 className="font-headline text-4xl text-primary font-bold mb-12 text-center">
            Common questions
          </h2>
        </ScrollReveal>
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqItems} />
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <section className="bg-tertiary text-surface-container-lowest py-24 md:py-32 px-6">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-headline text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Still deciding?
            </h2>
            <p className="text-surface-container-low/60 text-xl mb-12 max-w-2xl mx-auto">
              Start your trial and explore at your own pace. See how Veltro elevates your operational velocity.
            </p>
            <MagneticButton variant="clay" to="/demo" className="text-lg px-10 py-5">
              Start Your 14-Day Trial
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
