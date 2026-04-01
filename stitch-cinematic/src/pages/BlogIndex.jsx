import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionWrapper from '../components/shared/SectionWrapper'
import ScrollReveal from '../components/shared/ScrollReveal'
import MagneticButton from '../components/ui/MagneticButton'
import Badge from '../components/ui/Badge'

const categories = ['All', 'Operations', 'Maintenance Strategy', 'Product Updates', 'Industry Insights', 'Best Practices']

const recentPosts = [
  {
    category: 'OPERATIONS',
    initials: 'EV',
    title: 'The Metadata of Efficiency: Why Every Click Matters',
    excerpt: 'How minor UI decisions in operational software directly impact the physical throughput of a team.',
    author: 'Elena Vance',
    readTime: '4 min read',
    gradient: 'from-primary-fixed via-surface-container to-surface-dim',
  },
  {
    category: 'PRODUCT UPDATES',
    initials: 'DK',
    title: 'Veltro 2.4: Introducing The Architectural Ledger',
    excerpt: 'Our latest update focuses on the tactile feeling of data entry and deep system integration.',
    author: 'David K.',
    readTime: '6 min read',
    gradient: 'from-surface-container via-surface-container-low to-surface-variant',
  },
  {
    category: 'INDUSTRY INSIGHTS',
    initials: 'SM',
    title: 'Decentralizing Maintenance Responsibility',
    excerpt: 'Empowering individual technicians with the data usually reserved for regional directors.',
    author: 'Sarah Miller',
    readTime: '8 min read',
    gradient: 'from-tertiary-container via-tertiary to-[#1a1a1a]',
  },
]

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <div className="bg-surface text-on-surface">
      {/* Hero */}
      <header className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 bg-surface">
        <ScrollReveal>
          <span className="font-label text-secondary text-sm tracking-[0.2em] mb-4 block uppercase">
            INSIGHTS
          </span>
          <h1 className="font-display italic text-6xl md:text-7xl text-primary leading-tight mb-4">
            The Veltro Blog
          </h1>
          <p className="font-body text-primary/50 text-lg md:text-xl max-w-2xl mx-auto">
            Perspectives on operations, maintenance strategy, and building software that works.
          </p>
        </ScrollReveal>
      </header>

      {/* Filter Pills */}
      <section className="bg-surface py-8 border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  'whitespace-nowrap rounded-full px-5 py-2 font-headline font-bold text-sm transition-all duration-200',
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-transparent border border-outline-variant/20 text-on-surface/60 hover:bg-surface-container',
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <SectionWrapper className="bg-surface">
        <ScrollReveal>
          <Link to="/blog/predictive-maintenance" className="group block">
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden bg-surface-container-low shadow-[0_40px_100px_rgba(24,42,33,0.03)]">
              {/* Image */}
              <div className="overflow-hidden aspect-[4/3] md:aspect-auto">
                <div className="w-full h-full min-h-[280px] bg-gradient-to-br from-primary via-primary-container to-tertiary group-hover:scale-105 transition-transform duration-700" />
              </div>
              {/* Content */}
              <div className="p-8 md:p-16 flex flex-col justify-center items-start">
                <span className="font-label text-xs text-secondary bg-secondary/10 px-4 py-1.5 rounded-full mb-8 uppercase tracking-widest">
                  FEATURED
                </span>
                <h2 className="font-headline text-2xl md:text-4xl text-primary font-bold leading-tight mb-6">
                  Beyond Fix-It: Transitioning to Predictive Operational Flow
                </h2>
                <p className="font-body text-primary/70 text-lg mb-8 leading-relaxed">
                  Reactive maintenance is the silent killer of enterprise velocity. Learn how the world's most efficient facilities are using Veltro to anticipate failure before it disrupts the ledger.
                </p>
                <div className="flex items-center gap-6 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center font-label text-[10px] text-secondary font-bold">
                      MV
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label text-xs text-primary/60 uppercase">AUTHOR</span>
                      <span className="font-body font-medium text-primary text-sm">Marcus Veltro</span>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-outline-variant/30" />
                  <div className="flex flex-col">
                    <span className="font-label text-xs text-primary/60 uppercase">DATE</span>
                    <span className="font-body font-medium text-primary text-sm">Oct 24, 2024</span>
                  </div>
                </div>
                <span className="font-headline text-secondary flex items-center gap-2 text-base group-hover:gap-4 transition-all duration-300">
                  Read more{' '}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </SectionWrapper>

      {/* Recent Posts */}
      <section className="bg-surface-container-lowest py-24 px-5 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <span className="font-label text-secondary text-xs tracking-widest mb-2 block uppercase">
                LATEST ENTRIES
              </span>
              <h2 className="font-headline text-4xl text-primary font-bold">Recent Perspectives</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <ScrollReveal key={post.title}>
                <Link to="/blog/predictive-maintenance" className="group block cursor-pointer">
                  <div className="aspect-[4/3] rounded-t-[2rem] overflow-hidden mb-6">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${post.gradient} group-hover:scale-105 transition-transform duration-500`}
                    />
                  </div>
                  <span className="font-label text-[10px] text-secondary tracking-widest uppercase mb-3 block">
                    {post.category}
                  </span>
                  <h3 className="font-headline text-xl text-primary font-bold mb-3 leading-snug group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-body text-primary/60 mb-5 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant/20 flex items-center justify-center font-label text-[10px]">
                      {post.initials}
                    </div>
                    <span className="font-label text-xs text-primary/40">
                      {post.author} · {post.readTime}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <MagneticButton variant="outline" className="px-10 py-4">
              Load more
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 bg-primary text-surface-container-lowest">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display italic text-5xl mb-6">
              Stay informed on the operational edge.
            </h2>
            <p className="font-body text-surface-container-lowest/60 text-lg mb-10 max-w-xl mx-auto">
              Weekly insights on system reliability and operational excellence, delivered directly to your inbox.
            </p>
            <form
              className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-white/10 rounded-full px-5 py-3 text-white placeholder:text-white/40 border-0 outline-none focus:ring-1 focus:ring-white/20"
              />
              <MagneticButton variant="clay" type="submit" className="whitespace-nowrap">
                Subscribe
              </MagneticButton>
            </form>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
