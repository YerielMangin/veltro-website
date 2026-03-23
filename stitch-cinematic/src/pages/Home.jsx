import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, ArrowRight } from 'lucide-react'
import MagneticButton from '../components/ui/MagneticButton'
import ScrollReveal from '../components/shared/ScrollReveal'
import DiagnosticShuffler from '../components/micro/DiagnosticShuffler'
import TelemetryTypewriter from '../components/micro/TelemetryTypewriter'
import CursorScheduler from '../components/micro/CursorScheduler'

gsap.registerPlugin(ScrollTrigger)

/* ─── Hero ─── */
function Hero() {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const subtextRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from([line1Ref.current, line2Ref.current, subtextRef.current, ctaRef.current], {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.5,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-20 md:pb-32 px-5 md:px-8 lg:px-12">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-container via-primary to-tertiary" />
        <img
          alt="Modern clean industrial facility interior with warm lighting"
          className="w-full h-full object-cover mix-blend-overlay opacity-60"
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="max-w-4xl space-y-4">
        <p
          ref={line1Ref}
          className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight"
        >
          Your operation has a
        </p>
        <h1
          ref={line2Ref}
          className="font-display italic text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] text-clay leading-[0.85] tracking-tight"
        >
          Rhythm.
        </h1>
        <p ref={subtextRef} className="font-body text-base sm:text-lg md:text-xl text-white/70 max-w-xl pt-4">
          The operations platform for teams who run on precision. Assets, work, inspections,
          compliance — one place, total clarity.
        </p>
        <div ref={ctaRef} className="pt-8">
          <MagneticButton variant="clay" to="/demo" className="px-10 py-4 text-lg shadow-xl shadow-clay/30">
            Start Your 14-Day Trial
            <ArrowRight className="w-5 h-5" />
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/80" />
      </div>
    </section>
  )
}

/* ─── Features ─── */
function Features() {
  return (
    <section className="bg-surface py-20 md:py-32 px-5 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="font-headline text-on-surface text-3xl sm:text-4xl md:text-5xl font-bold mb-16 md:mb-20 tracking-tight">
            How it works
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Card 1: DiagnosticShuffler */}
            <div className="group">
              <div className="aspect-[4/5] bg-white/40 backdrop-blur-md border border-white/20 rounded-3xl shadow-ambient p-6 md:p-8 flex flex-col justify-center overflow-hidden relative">
                <DiagnosticShuffler />
              </div>
              <div className="mt-6 md:mt-8">
                <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">Keep work moving</h3>
                <p className="font-body text-on-surface/60 mt-2 leading-relaxed">
                  Automated workflows that never miss a beat or a boiler.
                </p>
              </div>
            </div>

            {/* Card 2: TelemetryTypewriter */}
            <div className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-ambient">
                <TelemetryTypewriter className="h-full" />
              </div>
              <div className="mt-6 md:mt-8">
                <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">One shared place</h3>
                <p className="font-body text-on-surface/60 mt-2 leading-relaxed">
                  A real-time ledger for every action taken across your site.
                </p>
              </div>
            </div>

            {/* Card 3: CursorScheduler */}
            <div className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-ambient border border-outline-variant/20">
                <CursorScheduler className="h-full" />
              </div>
              <div className="mt-6 md:mt-8">
                <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">Turn findings into action</h3>
                <p className="font-body text-on-surface/60 mt-2 leading-relaxed">
                  Connect inspection results directly to maintenance cycles.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ─── Philosophy ─── */
function Philosophy() {
  const containerRef = useRef(null)
  const wordsRef = useRef([])

  const headline = 'We focus on: eliminating it.'
  const words = headline.split(' ')

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from(wordsRef.current, {
        y: 60,
        opacity: 0,
        rotateX: -20,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-[#1a1a1a] py-32 md:py-48 px-5 md:px-8 lg:px-12 relative overflow-hidden min-h-[60vh] flex items-center">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-gradient-to-br from-primary-container via-transparent to-clay/20" />

      <div ref={containerRef} className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        <p className="font-body text-xl md:text-2xl text-white/40 tracking-tight">
          Most operations focus on: managing the chaos.
        </p>
        <h2 className="font-display italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => (wordsRef.current[i] = el)}
              className={`inline-block mr-[0.3em] ${
                word === 'eliminating' || word === 'it.'
                  ? 'text-clay'
                  : ''
              }`}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}

/* ─── Protocol ─── */
const PROTOCOL_CARDS = [
  {
    step: '01',
    title: 'Capture',
    description:
      'Every asset, every reading, every finding — logged once, visible everywhere. Veltro turns human observation into structured, actionable data.',
    bg: 'bg-surface',
    text: 'text-on-surface',
    descText: 'text-on-surface/70',
    visual: 'concentric',
  },
  {
    step: '02',
    title: 'Direct',
    description:
      'Work orders flow to the right person at the right time. Intelligent routing ensures urgency is handled and routine is never forgotten.',
    bg: 'bg-primary',
    text: 'text-white',
    descText: 'text-white/70',
    visual: 'scanline',
  },
  {
    step: '03',
    title: 'Reflect',
    description:
      'Dashboards that show what happened, what\'s coming, and where to improve. Moving from reactive maintenance to proactive operational excellence.',
    bg: 'bg-tertiary',
    text: 'text-white',
    descText: 'text-white/70',
    visual: 'waveform',
  },
]

function ProtocolVisual({ type }) {
  if (type === 'concentric') {
    return (
      <div className="relative w-48 h-48 md:w-64 md:h-64 border-2 border-on-surface/10 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
        <div className="absolute inset-4 border border-on-surface/20 rounded-full" />
        <div className="absolute inset-8 border-2 border-on-surface/40 rounded-full" />
        <div className="w-4 h-4 bg-on-surface rounded-full" />
      </div>
    )
  }
  if (type === 'scanline') {
    return (
      <div className="relative overflow-hidden w-full h-full max-h-48 md:max-h-64 flex items-center">
        <div className="w-full h-px bg-clay/30 absolute top-1/2 -translate-y-1/2" />
        <div className="w-full h-1 bg-clay shadow-[0_0_20px_#cc5833] absolute top-1/2 -translate-y-1/2 animate-bounce" />
      </div>
    )
  }
  // waveform
  return (
    <svg className="w-full h-24 md:h-32 text-clay" viewBox="0 0 400 100">
      <path
        className="animate-pulse"
        d="M0 50 L150 50 L160 30 L175 70 L190 10 L210 90 L225 50 L400 50"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  )
}

function Protocol() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Only apply sticky blur effect on large screens
    const mq = window.matchMedia('(min-width: 1024px)')
    if (!mq.matches) return

    const ctx = gsap.context(() => {
      // As each subsequent card comes in, blur/scale the previous card
      cardRefs.current.forEach((card, i) => {
        if (i === cardRefs.current.length - 1) return // last card doesn't need exit anim

        ScrollTrigger.create({
          trigger: cardRefs.current[i + 1],
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress
            gsap.set(card, {
              scale: 1 - progress * 0.05,
              filter: `blur(${progress * 4}px)`,
              opacity: 1 - progress * 0.3,
            })
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-surface-container-low px-5 md:px-8 lg:px-12 py-20 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-12 lg:space-y-[204px]">
          {PROTOCOL_CARDS.map((card, i) => (
            <div
              key={card.step}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`${card.bg} rounded-xl p-8 md:p-16 min-h-[400px] md:h-[716px] flex flex-col md:flex-row gap-8 md:gap-12 items-center shadow-2xl shadow-primary/10 border border-outline-variant/10 lg:sticky`}
              style={{ top: `${153 + i * 51}px` }}
            >
              <div className="flex-1 space-y-4 md:space-y-6">
                <p className="font-label text-clay text-xl md:text-2xl font-bold">{card.step}</p>
                <h3 className={`font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter ${card.text}`}>
                  {card.title}
                </h3>
                <p className={`font-body text-lg md:text-xl leading-relaxed ${card.descText}`}>
                  {card.description}
                </p>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <ProtocolVisual type={card.visual} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─── */
function CtaSection() {
  return (
    <section className="bg-surface py-32 md:py-48 px-5 md:px-8 lg:px-12 text-center">
      <ScrollReveal>
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
            Veltro isn't for everyone.
          </h2>
          <p className="font-body text-xl md:text-2xl text-on-surface/70 leading-relaxed">
            It's for the teams who understand that speed is a byproduct of precision.
          </p>
          <div className="pt-8 space-y-6">
            <MagneticButton
              variant="clay"
              to="/demo"
              className="px-12 py-5 text-lg md:text-xl shadow-2xl shadow-clay/40"
            >
              Start Your 14-Day Trial
            </MagneticButton>
            <p className="font-label text-xs uppercase tracking-[0.2em] text-on-surface/50">
              NO CREDIT CARD REQUIRED · SETUP IN &lt; 2 MINS
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

/* ─── Home Page ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <CtaSection />
    </>
  )
}
