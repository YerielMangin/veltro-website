import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionWrapper from '../components/shared/SectionWrapper'
import ScrollReveal from '../components/shared/ScrollReveal'
import BlurOrb from '../components/shared/BlurOrb'
import MagneticButton from '../components/ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

/* ─── Hero ─── */
function Hero() {
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const eyebrowRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from([eyebrowRef.current, headlineRef.current, subtitleRef.current], {
        y: 40,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-tertiary px-5 md:px-8 lg:px-12 pt-24 pb-16 md:pb-24">
      {/* Blur orb decorations */}
      <BlurOrb color="bg-secondary" size="w-96 h-96" className="top-0 left-1/4 opacity-10" />
      <BlurOrb color="bg-primary-container" size="w-96 h-96" className="bottom-0 right-1/4 opacity-10" />

      <div className="relative z-10 max-w-4xl space-y-4">
        <p ref={eyebrowRef} className="font-headline font-bold text-xl md:text-2xl text-white/60 uppercase tracking-widest">
          What's inside
        </p>
        <h1 ref={headlineRef} className="font-display italic text-5xl md:text-7xl lg:text-8xl text-white leading-tight">
          Everything connects.
        </h1>
        <p ref={subtitleRef} className="max-w-xl text-lg md:text-xl text-white/50 font-body leading-relaxed">
          25 modules. One operational picture. Here's how the pieces fit together.
        </p>
      </div>
    </section>
  )
}

/* ─── Flow step cards data ─── */
const flowSteps = [
  {
    icon: 'search_check',
    title: 'Inspection',
    description: 'Visual checks in the field',
  },
  {
    icon: 'report_problem',
    title: 'Finding',
    description: 'Issue identified & logged',
  },
  {
    icon: 'assignment_turned_in',
    title: 'Work Order',
    description: 'Task scoped & created',
  },
  {
    icon: 'person_search',
    title: 'Assignment',
    description: 'Right team, right parts',
  },
  {
    icon: 'task_alt',
    title: 'Resolution',
    description: 'Completion & validation',
  },
  {
    icon: 'monitoring',
    title: 'Dashboard',
    description: 'Operational analytics',
  },
]

/* ─── Connected Flow Carousel ─── */
function ConnectedFlowCarousel() {
  return (
    <SectionWrapper className="py-16 md:py-24 lg:py-32 overflow-hidden">
      <div
        className="overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-6 md:gap-8 pb-8 px-5 md:px-8 lg:px-12 -mx-5 md:-mx-8 lg:-mx-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {flowSteps.map((step, i) => (
          <div key={step.title} className="flex items-center gap-4 md:gap-6 flex-shrink-0">
            {/* Card */}
            <div className="snap-center min-w-[280px] md:min-w-[280px] p-8 bg-white rounded-xl shadow-[0_20px_40px_-10px_rgba(24,42,33,0.06)] border border-outline-variant/10 text-center space-y-4 hover:-translate-y-2 transition-transform duration-500 cursor-default">
              <span className="material-symbols-outlined text-secondary text-4xl">{step.icon}</span>
              <h4 className="font-headline text-primary font-bold">{step.title}</h4>
              <p className="text-sm text-on-surface/60 font-body">{step.description}</p>
            </div>
            {/* Pulsing arrow — not after the last card */}
            {i < flowSteps.length - 1 && (
              <span className="material-symbols-outlined text-secondary/40 text-3xl animate-pulse flex-shrink-0 hidden md:block">
                trending_flat
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-16 text-center text-xl text-primary/70 max-w-2xl mx-auto font-body">
        This is why Veltro feels different.{' '}
        <span className="text-primary font-semibold">Every signal is connected.</span>
      </p>
    </SectionWrapper>
  )
}

/* ─── Feature sections data ─── */
const featureSections = [
  {
    step: '01 / Flow',
    title: 'Keep work moving',
    description:
      'Create, assign, and track work from request to completion. Scheduled maintenance runs on autopilot. Urgent work gets routed instantly.',
    bullets: ['Work Orders', 'Preventive Maintenance', 'Task Scheduling', 'Team Assignment'],
    bgLight: true,
  },
  {
    step: '02 / Ledger',
    title: 'Know every asset',
    description:
      'Every piece of equipment has a history — maintenance records, costs, downtime, parts consumed. One tap to see the full picture.',
    bullets: ['Asset Registry', 'Location Hierarchy', 'Parts & Inventory', 'Meter Readings'],
    bgLight: false,
    reverse: true,
  },
  {
    step: '03 / Shield',
    title: 'Prevent, don\'t react',
    description:
      'Run inspections on schedule. When findings appear, corrective actions generate automatically. Incidents trigger workflows, not emails.',
    bullets: ['Inspections', 'Incidents', 'Corrective Actions', 'Compliance Tracking'],
    bgLight: true,
  },
  {
    step: '04 / Sight',
    title: 'See the whole operation',
    description:
      'Real-time dashboards for every KPI that matters. Exportable reports. Full audit trail. API for integrating with your existing systems.',
    bullets: ['Dashboards', 'Reports', 'Audit Logs', 'API Access'],
    bgLight: false,
    reverse: true,
  },
]

function FeatureSection({ step, title, description, bullets, bgLight, reverse }) {
  return (
    <SectionWrapper className={bgLight ? 'bg-surface-container-low' : 'bg-surface'}>
      <ScrollReveal>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center ${
            reverse ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : ''
          }`}
        >
          {/* Image area */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/5 rounded-xl blur-2xl group-hover:bg-primary/8 transition-colors duration-500" />
            <div className="relative aspect-[4/3] rounded-xl bg-gradient-to-br from-surface-container to-surface-container-high border border-outline-variant/20 overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-outline/30 text-8xl">
                {step.includes('Flow') ? 'assignment_turned_in' : step.includes('Ledger') ? 'inventory_2' : step.includes('Shield') ? 'shield' : 'monitoring'}
              </span>
            </div>
          </div>

          {/* Text area */}
          <div className="space-y-6 md:space-y-8">
            <span className="font-label text-secondary uppercase tracking-widest text-sm">{step}</span>
            <h2 className="font-headline font-bold text-primary text-3xl md:text-4xl lg:text-5xl leading-tight">
              {title}
            </h2>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                  <span className="font-headline text-sm font-bold text-on-surface/80">{bullet}</span>
                </div>
              ))}
            </div>
            <p className="text-base md:text-lg leading-relaxed text-primary/70 font-body">{description}</p>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  )
}

/* ─── CTA ─── */
function CTA() {
  return (
    <SectionWrapper dark className="py-20 md:py-32 text-center relative overflow-hidden">
      <BlurOrb color="bg-secondary" size="w-[500px] h-[500px]" className="-top-32 left-1/2 -translate-x-1/2 opacity-10" />
      <div className="relative z-10 space-y-8">
        <ScrollReveal>
          <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Ready to see how it connects?
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton variant="clay" href="/demo">
              Start Your 14-Day Trial
            </MagneticButton>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="font-label text-sm text-white/50 uppercase tracking-widest">No credit card required</p>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  )
}

/* ─── Page ─── */
export default function Features() {
  return (
    <div>
      <Hero />
      <ConnectedFlowCarousel />
      {featureSections.map((section) => (
        <FeatureSection key={section.step} {...section} />
      ))}
      <CTA />
    </div>
  )
}
