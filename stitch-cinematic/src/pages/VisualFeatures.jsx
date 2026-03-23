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
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)

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
    description: 'Guided digital checklists for precise field data capture.',
  },
  {
    icon: 'report_problem',
    title: 'Finding',
    description: 'Anomalies automatically flagged and logged for review.',
  },
  {
    icon: 'assignment_turned_in',
    title: 'Work Order',
    description: 'Scoped tasks created from findings with all context.',
  },
  {
    icon: 'person_search',
    title: 'Assignment',
    description: 'Matching the right skills and parts to every job.',
  },
  {
    icon: 'task_alt',
    title: 'Resolution',
    description: 'Verified completion with full digital evidence trail.',
  },
  {
    icon: 'monitoring',
    title: 'Dashboard',
    description: 'Real-time performance analytics for better decisions.',
  },
]

/* ─── Connected Flow Carousel (visual variant — large cards with image placeholder) ─── */
function ConnectedFlowCarousel() {
  return (
    <SectionWrapper className="py-16 md:py-24 lg:py-32 overflow-hidden">
      <div
        className="overflow-x-auto no-scrollbar flex gap-8 pb-12 -mx-5 md:-mx-8 lg:-mx-12 px-5 md:px-8 lg:px-12 items-start"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {flowSteps.map((step, i) => (
          <div key={step.title} className="flex-shrink-0 flex items-center gap-8 group">
            {/* Large visual card */}
            <div className="w-[300px] md:w-[380px] p-2 bg-white rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(24,42,33,0.08)] border border-outline-variant/20 hover:-translate-y-2 transition-all duration-500 cursor-default">
              {/* Image placeholder */}
              <div className="aspect-[4/3] rounded-[1.5rem] bg-gradient-to-br from-surface-container to-surface-container-high overflow-hidden mb-6 relative border border-outline-variant/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary/20 text-[96px]">{step.icon}</span>
              </div>
              <div className="px-6 pb-8 text-center">
                <div className="flex justify-center mb-4">
                  <span className="material-symbols-outlined text-secondary text-4xl">{step.icon}</span>
                </div>
                <h4 className="font-headline text-2xl text-primary font-bold mb-2">{step.title}</h4>
                <p className="text-primary/60 font-body">{step.description}</p>
              </div>
            </div>

            {/* Pulsing arrow between cards */}
            {i < flowSteps.length - 1 && (
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <span className="material-symbols-outlined text-secondary/40 text-4xl animate-pulse">
                  trending_flat
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-20 text-center text-xl text-primary/70 max-w-2xl mx-auto font-body">
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
    step_icon: 'assignment_turned_in',
    title: 'Keep work moving',
    description:
      'Create, assign, and track work from request to completion. Scheduled maintenance runs on autopilot. Urgent work gets routed instantly.',
    bullets: ['Work Orders', 'Preventive Maintenance', 'Task Scheduling', 'Team Assignment'],
    bgLight: true,
    reverse: false,
  },
  {
    step: '02 / Ledger',
    step_icon: 'inventory_2',
    title: 'Know every asset',
    description:
      'Every piece of equipment has a history — maintenance records, costs, downtime, parts consumed. One tap to see the full picture.',
    bullets: ['Asset Registry', 'Location Hierarchy', 'Parts & Inventory', 'Meter Readings'],
    bgLight: false,
    reverse: true,
  },
  {
    step: '03 / Shield',
    step_icon: 'shield',
    title: "Prevent, don't react",
    description:
      'Run inspections on schedule. When findings appear, corrective actions generate automatically. Incidents trigger workflows, not emails.',
    bullets: ['Inspections', 'Incidents', 'Corrective Actions', 'Compliance Tracking'],
    bgLight: true,
    reverse: false,
  },
  {
    step: '04 / Sight',
    step_icon: 'monitoring',
    title: 'See the whole operation',
    description:
      'Real-time dashboards for every KPI that matters. Exportable reports. Full audit trail. API for integrating with your existing systems.',
    bullets: ['Dashboards', 'Reports', 'Audit Logs', 'API Access'],
    bgLight: false,
    reverse: true,
  },
]

function FeatureSection({ step, step_icon, title, description, bullets, bgLight, reverse }) {
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
            <div className="relative aspect-[4/3] rounded-xl bg-gradient-to-br from-surface-container to-surface-container-high border border-outline-variant/20 shadow-2xl overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-outline/30 text-8xl">{step_icon}</span>
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
export default function VisualFeatures() {
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
