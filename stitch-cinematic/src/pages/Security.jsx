import SectionWrapper from '../components/shared/SectionWrapper'
import ScrollReveal from '../components/shared/ScrollReveal'
import BlurOrb from '../components/shared/BlurOrb'
import MagneticButton from '../components/ui/MagneticButton'

const principles = [
  {
    icon: 'hub',
    title: 'Tenant Isolation',
    description:
      'Rigid logical separation between customer environments ensures your operational data never leaks or commingles.',
  },
  {
    icon: 'encrypted',
    title: 'Encryption Everywhere',
    description:
      'AES-256 encryption for data at rest and TLS 1.3 for data in transit. Your secrets remain secret, always.',
  },
  {
    icon: 'admin_panel_settings',
    title: 'Access Control',
    description:
      'Granular RBAC and MFA-enforced logins ensure only verified operators can touch your mission-critical systems.',
  },
]

const practices = [
  { icon: 'block', title: 'No wildcard CORS', tag: 'STRICT-ORIGIN' },
  { icon: 'webhook', title: 'Webhook secrets verified', tag: 'SHA-256 SIGNED' },
  { icon: 'cleaning_services', title: 'Sanitized logging', tag: 'PII-REDACTED' },
  { icon: 'radar', title: 'Dependency scanning', tag: 'CONTINUOUS' },
]

export default function Security() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <header className="bg-tertiary flex flex-col items-center justify-center text-center px-5 md:px-8 py-24 md:py-32 relative overflow-hidden">
        <BlurOrb color="bg-primary-container" className="top-0 left-1/4 opacity-10" />
        <BlurOrb color="bg-secondary-container" className="bottom-0 right-1/4 opacity-10" />
        <div className="relative z-10">
          <p className="font-label text-secondary text-sm tracking-widest mb-4 uppercase">
            Security
          </p>
          <h1 className="font-display italic text-5xl md:text-7xl text-surface-bright leading-tight">
            Your data is not our data.
          </h1>
          <p className="text-surface-container-highest mt-6 max-w-lg mx-auto opacity-80 text-lg">
            How Veltro protects your operation.
          </p>
        </div>
      </header>

      {/* Security Principles */}
      <SectionWrapper className="bg-surface">
        <ScrollReveal stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div
                key={p.title}
                className="bg-surface-container-lowest p-10 rounded-2xl shadow-[0_40px_60px_rgba(24,42,33,0.03)] hover:-translate-y-1 transition-transform duration-500"
              >
                <div className="w-14 h-14 rounded-full bg-clay/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-clay text-2xl">{p.icon}</span>
                </div>
                <h3 className="font-headline text-2xl text-primary mb-4 tracking-tight">
                  {p.title}
                </h3>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Infrastructure */}
      <SectionWrapper className="bg-primary text-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <ScrollReveal>
            <div>
              <h2 className="font-headline text-4xl md:text-5xl mb-8 leading-tight text-white">
                Built on trusted infrastructure
              </h2>
              <ul className="space-y-6">
                {[
                  'Supabase (PostgreSQL & Auth)',
                  'Vercel Edge Network',
                  'SOC 2 Type II compliance in progress',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                    <span className="font-label text-lg text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative bg-primary-container p-8 md:p-12 rounded-2xl border border-white/5">
              <div className="flex flex-col gap-6">
                {/* Global Edge row */}
                <div className="flex items-center bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">public</span>
                    <span className="font-label text-xs tracking-widest">GLOBAL EDGE</span>
                  </div>
                  <div className="h-px flex-1 mx-4 bg-white/10" />
                  <span className="material-symbols-outlined text-white/40">shield</span>
                </div>
                {/* Isolated DB + KMS Storage */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-xl text-center space-y-2 border border-white/5">
                    <span className="material-symbols-outlined text-secondary block">database</span>
                    <p className="font-label text-[10px] opacity-50">ISOLATED DB</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl text-center space-y-2 border border-white/5">
                    <span className="material-symbols-outlined text-secondary block">key</span>
                    <p className="font-label text-[10px] opacity-50">KMS STORAGE</p>
                  </div>
                </div>
                {/* End-to-End Verified */}
                <div className="bg-secondary/10 p-4 rounded-xl flex items-center justify-center gap-3 border border-secondary/20">
                  <span className="material-symbols-outlined text-secondary animate-pulse">
                    verified_user
                  </span>
                  <span className="font-label text-xs uppercase tracking-widest">
                    End-to-End Verified
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Practices */}
      <SectionWrapper className="bg-surface-container-low">
        <ScrollReveal>
          <h2 className="font-headline text-primary text-4xl mb-16 text-center">How we work</h2>
        </ScrollReveal>
        <ScrollReveal stagger={0.08}>
          <div className="max-w-4xl mx-auto space-y-4">
            {practices.map((item) => (
              <div
                key={item.title}
                className="group flex items-center justify-between p-8 bg-surface-container-lowest rounded-2xl hover:bg-surface-bright transition-colors duration-300"
              >
                <div className="flex items-center gap-6">
                  <span className="material-symbols-outlined text-on-surface/40 group-hover:text-clay transition-colors">
                    {item.icon}
                  </span>
                  <div>
                    <span className="font-headline text-xl text-primary tracking-tight">
                      {item.title}
                    </span>
                  </div>
                </div>
                <span className="font-label text-xs text-on-surface-variant/40 tracking-widest hidden sm:block">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-surface">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto bg-surface-container p-12 md:p-24 rounded-2xl text-center flex flex-col items-center">
            <h2 className="font-display italic text-4xl md:text-6xl text-primary mb-10">
              Questions about security?
            </h2>
            <MagneticButton variant="moss" to="/contact">
              Contact Us
            </MagneticButton>
            <p className="mt-10 font-label text-sm text-on-surface-variant/60">
              Typical response time: &lt; 2 hours.
            </p>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </div>
  )
}
