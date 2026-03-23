import { useState } from 'react'
import SectionWrapper from '../components/shared/SectionWrapper'
import ScrollReveal from '../components/shared/ScrollReveal'
import MagneticButton from '../components/ui/MagneticButton'

const integrations = [
  {
    icon: 'chat',
    name: 'Slack',
    category: 'Communication',
    description: 'Send automated incident reports and real-time alerts to your team channels.',
    status: 'available',
  },
  {
    icon: 'account_balance',
    name: 'SAP',
    category: 'ERP',
    description: 'Bi-directional asset synchronization and financial reporting ledger integration.',
    status: 'available',
  },
  {
    icon: 'sensors',
    name: 'IoT Hub',
    category: 'IoT',
    description: 'Direct telemetry ingestion from edge sensors for predictive maintenance.',
    status: 'coming_soon',
  },
  {
    icon: 'fingerprint',
    name: 'Okta',
    category: 'Identity',
    description: 'Single Sign-On and enterprise-grade user provisioning for your entire org.',
    status: 'available',
  },
  {
    icon: 'groups',
    name: 'MS Teams',
    category: 'Communication',
    description: 'Collaborate on tickets and schedules without leaving your workspace.',
    status: 'available',
  },
  {
    icon: 'cloud_queue',
    name: 'Google Drive',
    category: 'Storage',
    description: 'Attach schematics, manuals, and floorplans directly to operational entities.',
    status: 'available',
  },
]

const categories = ['All', 'Communication', 'ERP', 'IoT', 'Storage', 'Identity']

export default function Integrations() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? integrations
      : integrations.filter((i) => i.category === activeCategory)

  return (
    <div className="pt-20">
      {/* Hero */}
      <header className="bg-surface flex flex-col items-center justify-center text-center px-5 md:px-8 py-24 md:py-32">
        <div className="mb-4">
          <span className="font-label text-secondary text-xs tracking-widest uppercase">
            Integrations
          </span>
        </div>
        <h1 className="font-display italic text-5xl md:text-7xl text-primary leading-tight mb-6">
          Fits right into your workflow.
        </h1>
        <p className="font-body text-lg text-on-surface-variant max-w-xl mx-auto">
          Veltro connects to the tools your team already uses. Seamlessly sync data across your
          existing stack.
        </p>
      </header>

      {/* Integration Grid with Filters */}
      <SectionWrapper className="bg-surface">
        {/* Filter Pills */}
        <ScrollReveal>
          <div className="flex gap-3 overflow-x-auto pb-4 mb-16 justify-center flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-body font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <ScrollReveal key={item.name}>
              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col gap-6 hover:scale-[1.02] transition-transform duration-300">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-xl">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      {item.icon}
                    </span>
                  </div>
                  {item.status === 'available' ? (
                    <span className="font-label text-[10px] px-2 py-1 bg-primary/5 text-primary rounded-lg border border-primary/10">
                      Available
                    </span>
                  ) : (
                    <span className="font-label text-[10px] px-2 py-1 bg-clay/10 text-clay rounded-lg border border-clay/20">
                      Coming Soon
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-headline text-xl text-primary mb-1">{item.name}</h3>
                  <span className="font-label text-xs text-secondary/70 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <p className="font-body text-on-surface-variant mt-3 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* API Section */}
      <SectionWrapper dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <ScrollReveal>
            <div className="space-y-8">
              <h2 className="font-headline text-4xl md:text-5xl leading-tight text-white">
                Build your own
              </h2>
              <p className="font-body text-xl text-white/80 max-w-lg leading-relaxed">
                Veltro's REST API covers 9 core entities, allowing you to build custom workflows,
                mobile apps, or hardware integrations tailored to your specific needs.
              </p>
              <a
                href="#"
                className="inline-block font-label text-secondary font-bold text-lg hover:translate-x-1 transition-transform"
              >
                View API Documentation →
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="bg-black p-8 rounded-2xl shadow-2xl border border-white/5 relative overflow-hidden">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                </div>
                <pre className="font-label text-sm leading-relaxed overflow-x-auto">
                  <span className="text-emerald-400">GET</span>
                  <span className="text-white/60"> /api/v1/entities{'\n'}</span>
                  <span className="text-white/60">{'{'}{'\n'}</span>
                  <span className="text-white/60">{'  '}</span>
                  <span className="text-clay">"status"</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-400">"success"</span>
                  <span className="text-white/60">,{'\n'}</span>
                  <span className="text-white/60">{'  '}</span>
                  <span className="text-clay">"data"</span>
                  <span className="text-white/60">: {'{'}{'\n'}</span>
                  <span className="text-white/60">{'    '}</span>
                  <span className="text-clay">"id"</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-400">"vel_82931"</span>
                  <span className="text-white/60">,{'\n'}</span>
                  <span className="text-white/60">{'    '}</span>
                  <span className="text-clay">"type"</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-400">"sensor_hub"</span>
                  <span className="text-white/60">,{'\n'}</span>
                  <span className="text-white/60">{'    '}</span>
                  <span className="text-clay">"connected"</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-400">true</span>
                  <span className="text-white/60">{'\n'}</span>
                  <span className="text-white/60">{'  }'}{'\n'}</span>
                  <span className="text-white/60">{'}'}</span>
                </pre>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-surface text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="font-display italic text-4xl md:text-5xl text-primary leading-tight">
              Don't see your tool? Let us know.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton variant="moss" to="/contact">
                Contact Us
              </MagneticButton>
              <MagneticButton variant="clay" to="/demo">
                Start Trial
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </div>
  )
}
