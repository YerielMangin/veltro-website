import { Link } from 'react-router-dom'
import ScrollReveal from '../components/shared/ScrollReveal'
import BlurOrb from '../components/shared/BlurOrb'
import MagneticButton from '../components/ui/MagneticButton'

const tocItems = [
  { id: 'the-shift', label: 'Proactive Shift', active: true },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'visual-ledger', label: 'Visual Ledger' },
]

const relatedPosts = [
  {
    category: 'Case Study',
    title: 'How Zenith Labs Scaled Efficiency by 300%',
    gradient: 'from-surface-container via-primary-fixed to-primary-fixed-dim',
  },
  {
    category: 'Engineering',
    title: 'The Physics of Low-Latency Data Flow',
    gradient: 'from-tertiary-container to-tertiary',
  },
  {
    category: 'Leadership',
    title: 'Beyond Maintenance: Leading the OS Era',
    gradient: 'from-primary-container via-primary to-primary',
  },
]

export default function BlogPost() {
  return (
    <div className="bg-surface text-on-surface">
      <main className="pt-32 pb-24 px-6">
        {/* Header */}
        <ScrollReveal>
          <header className="max-w-[720px] mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 bg-secondary text-white rounded-full font-label text-xs uppercase tracking-widest mb-6">
              Operations OS
            </span>
            <h1 className="font-headline text-3xl md:text-5xl font-bold text-primary leading-[1.1] tracking-tight mb-6">
              Redefining Operational Velocity: The Architecture of Seamless Maintenance
            </h1>
            <div className="flex items-center justify-center gap-2 font-label text-xs text-primary/40">
              <span>Elias Thorne</span>
              <span>·</span>
              <span>March 22, 2026</span>
              <span>·</span>
              <span>8 min read</span>
            </div>
          </header>
        </ScrollReveal>

        {/* Featured Image */}
        <ScrollReveal>
          <div className="max-w-[720px] mx-auto mb-16">
            <div className="rounded-xl overflow-hidden aspect-[16/9] bg-gradient-to-br from-primary-fixed via-surface-container-high to-surface-dim shadow-lg" />
          </div>
        </ScrollReveal>

        {/* Article + Sidebar */}
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
          {/* Article */}
          <article className="max-w-[720px] mx-auto lg:mx-0">
            <p className="font-body text-lg leading-relaxed text-on-surface/80 mb-6">
              In the evolving landscape of industrial management, the term "maintenance" has long carried a heavy, reactive connotation. It suggests fixing what is broken, responding to failure, and fighting the entropy of machinery. However, at Veltro, we believe in a shift toward{' '}
              <em>Operations</em> — a proactive, engineered state of continuous flow.
            </p>

            <h2 id="the-shift" className="font-headline text-2xl font-bold text-primary mt-12 mb-4 tracking-tight">
              The Shift from Reactive to Proactive
            </h2>
            <p className="font-body text-lg leading-relaxed text-on-surface/80 mb-6">
              When an organization operates in a reactive state, the costs are not just financial; they are cognitive. The constant stress of impending failure prevents long-term strategic thinking. Our recent studies show that organizations utilizing an integrated Operational OS reduce downtime by nearly 42% in the first quarter alone.
            </p>

            <blockquote className="border-l-4 border-secondary bg-surface-container-low rounded-r-xl p-6 my-8">
              <p className="font-display italic text-xl md:text-2xl text-primary leading-relaxed">
                "The goal is not to fix machines, but to orchestrate a symphony of mechanical reliability that becomes invisible to the end user."
              </p>
            </blockquote>

            <h2 id="infrastructure" className="font-headline text-2xl font-bold text-primary mt-12 mb-4 tracking-tight">
              The Digital Infrastructure
            </h2>
            <p className="font-body text-lg leading-relaxed text-on-surface/80 mb-6">
              Modern operations require a digital ledger that acts as the single source of truth. This is where data meets design. Below is a representation of how our core engine handles priority queuing for task automation:
            </p>

            <div className="bg-tertiary rounded-xl p-6 font-label text-sm text-white overflow-x-auto my-8">
              <pre><code>{`function prioritizeTask(tasks) {
  return tasks.sort((a, b) => {
    const scoreA = (a.criticality * 0.7) + (a.latency * 0.3);
    const scoreB = (b.criticality * 0.7) + (b.latency * 0.3);
    return scoreB - scoreA;
  });
}

// Resulting in a high-velocity operation queue`}</code></pre>
            </div>

            <h2 id="visual-ledger" className="font-headline text-2xl font-bold text-primary mt-12 mb-4 tracking-tight">
              The Visual Ledger
            </h2>
            <p className="font-body text-lg leading-relaxed text-on-surface/80 mb-6">
              A data-rich environment doesn't have to be cluttered. By utilizing tonal layering and intentional white space, we allow critical information to surface naturally without overwhelming the operator.
            </p>

            <div className="my-8 rounded-xl overflow-hidden bg-gradient-to-br from-surface-container-high to-surface-dim aspect-[16/9]" />

            <p className="font-body text-lg leading-relaxed text-on-surface/80 mb-6">
              As we look toward the future of 2026 and beyond, the distinction between software and hardware continues to blur. Your operational strategy must be as flexible as the tools you use to manage it.
            </p>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block sticky top-32">
            <div className="mb-10">
              <h4 className="font-headline font-bold text-xs uppercase tracking-widest text-primary/40 mb-6">
                Table of Contents
              </h4>
              <ul className="space-y-4 font-label text-xs">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={[
                        'flex items-center gap-2 transition-colors',
                        item.active
                          ? 'text-secondary font-bold'
                          : 'text-on-surface-variant hover:text-primary',
                      ].join(' ')}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-secondary' : 'bg-outline-variant'}`}
                      />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-headline font-bold text-xs uppercase tracking-widest text-primary/40 mb-6">
                Share Story
              </h4>
              <div className="flex gap-4">
                {['share', 'link', 'mail'].map((icon) => (
                  <button
                    key={icon}
                    className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary transition-colors duration-200"
                    aria-label={icon}
                  >
                    <span className="material-symbols-outlined text-sm">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        <ScrollReveal>
          <section className="max-w-5xl mx-auto mt-24 pt-16 border-t border-surface-variant">
            <h3 className="font-headline font-bold text-2xl text-primary mb-10">Continue Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Link to="/blog/predictive-maintenance" key={post.title} className="group">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-surface-container">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${post.gradient} group-hover:scale-105 transition-transform duration-500`}
                    />
                  </div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2 block">
                    {post.category}
                  </span>
                  <h4 className="font-headline font-bold text-lg text-primary group-hover:text-secondary transition-colors">
                    {post.title}
                  </h4>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* CTA Banner */}
        <ScrollReveal>
          <section className="max-w-5xl mx-auto mt-24">
            <div className="bg-primary-container rounded-xl p-12 md:p-20 text-center relative overflow-hidden">
              <BlurOrb color="bg-secondary" size="w-64 h-64" className="opacity-10 -right-32 -top-32" />
              <BlurOrb color="bg-white" size="w-64 h-64" className="opacity-5 -left-32 -bottom-32" />
              <div className="relative z-10">
                <h2 className="font-headline font-bold text-3xl md:text-4xl text-white mb-6">
                  Want to see Veltro in action?
                </h2>
                <p className="text-on-primary-container text-lg max-w-xl mx-auto mb-10">
                  Experience the operational sophistication that elite organizations use to maintain a competitive edge.
                </p>
                <MagneticButton variant="clay" to="/demo" className="text-lg px-10 py-4">
                  Start Your 14-Day Trial
                </MagneticButton>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>
    </div>
  )
}
