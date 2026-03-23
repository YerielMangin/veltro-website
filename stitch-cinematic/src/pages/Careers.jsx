import SectionWrapper from '../components/shared/SectionWrapper'
import ScrollReveal from '../components/shared/ScrollReveal'
import MagneticButton from '../components/ui/MagneticButton'

const values = [
  {
    num: '01',
    label: 'IMPACT',
    icon: 'bolt',
    title: 'Meaningful work',
    description:
      'Solve complex logistical challenges that impact global infrastructure. Your code moves physical atoms.',
  },
  {
    num: '02',
    label: 'AUTONOMY',
    icon: 'manage_accounts',
    title: 'Small team, big ownership',
    description:
      'We hire experts and get out of their way. Own entire features from discovery to deployment.',
  },
  {
    num: '03',
    label: 'FREEDOM',
    icon: 'public',
    title: 'Remote-first, async-native',
    description:
      'Work from anywhere in the world. We prioritize documentation and deep work over endless meetings.',
  },
]

const jobs = [
  { title: 'Senior Frontend Engineer', category: 'Engineering' },
  { title: 'Product Designer', category: 'Design' },
  { title: 'Backend Infrastructure Architect', category: 'Engineering' },
  { title: 'Customer Operations Lead', category: 'Success' },
]

export default function Careers() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <header className="relative min-h-[80vh] w-full overflow-hidden flex items-end pb-16 bg-gradient-to-t from-primary via-primary/60 to-primary-container">
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent pointer-events-none" />
        <div className="relative z-10 container mx-auto px-5 md:px-8 max-w-6xl">
          <div className="max-w-3xl">
            <span className="font-label text-primary-fixed-dim uppercase tracking-widest text-xs mb-4 block">
              Careers
            </span>
            <h1 className="font-display italic text-surface-bright text-5xl md:text-7xl leading-tight">
              Join the team
            </h1>
            <p className="font-body text-surface-container-highest text-xl mt-4 opacity-90 max-w-lg">
              Build the tools that keep everything running.
            </p>
          </div>
        </div>
      </header>

      {/* Why Veltro */}
      <SectionWrapper className="bg-surface-container">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="font-headline font-bold text-4xl text-primary max-w-md leading-tight">
              Architecture of a Modern Workplace
            </h2>
            <p className="font-display italic text-2xl text-on-surface-variant max-w-sm">
              "We're not building a startup; we're crafting an operational legacy."
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.num}
                className="bg-surface-container-lowest p-10 rounded-2xl shadow-[0_20px_50px_rgba(24,42,33,0.02)] flex flex-col gap-6 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="font-label text-secondary text-sm tracking-wider">
                  {v.num}. {v.label}
                </div>
                <div className="w-12 h-12 rounded-full bg-clay/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-clay">{v.icon}</span>
                </div>
                <h3 className="font-headline font-bold text-xl">{v.title}</h3>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Open Positions */}
      <SectionWrapper className="bg-surface-container-lowest">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="font-headline font-bold text-4xl mb-4">Open Positions</h2>
            <div className="w-12 h-1 bg-secondary mx-auto rounded-full" />
          </div>
        </ScrollReveal>
        <ScrollReveal stagger={0.08}>
          <div className="max-w-4xl mx-auto space-y-4">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-all duration-300"
              >
                <div className="flex flex-col gap-2">
                  <h4 className="font-headline font-bold text-xl text-primary">{job.title}</h4>
                  <div className="flex items-center gap-4">
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-label text-[10px] uppercase tracking-wider font-bold">
                      {job.category}
                    </span>
                    <span className="text-on-surface-variant font-body text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">public</span>
                      Remote
                    </span>
                  </div>
                </div>
                <a
                  href="#"
                  className="mt-6 md:mt-0 font-label text-secondary text-sm font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                >
                  View role
                  <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
                </a>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper dark className="bg-tertiary text-center">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <span className="font-display italic text-3xl text-surface-container-high block mb-6">
                "Our next great architect isn't on a list yet."
              </span>
              <h2 className="font-headline font-bold text-4xl text-surface-bright mb-4">
                Don't see your role? We're always looking for great people.
              </h2>
            </div>
            <MagneticButton variant="clay" to="/contact">
              Say Hello
            </MagneticButton>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </div>
  )
}
