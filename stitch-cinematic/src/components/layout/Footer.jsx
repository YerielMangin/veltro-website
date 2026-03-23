import { Link } from 'react-router-dom'

const LINK_GROUPS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Integrations', to: '/integrations' },
      { label: 'Security', to: '/security' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Blog', to: '/blog' },
      { label: 'Customers', to: '/customers' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', to: '/docs' },
      { label: 'API Reference', to: '/api' },
      { label: 'Status', to: '/status' },
      { label: 'Changelog', to: '/changelog' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
      { label: 'Cookies', to: '/cookies' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-tertiary rounded-t-[4rem] px-5 md:px-8 lg:px-12 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 md:gap-12">
          {/* Brand section — spans 2 cols on lg */}
          <div className="col-span-2 lg:col-span-2 space-y-4 mb-4 lg:mb-0">
            <div className="font-headline text-2xl font-bold tracking-tighter text-white">
              Veltro
            </div>
            <p className="font-label text-xs uppercase tracking-widest text-white/40">
              Velocity + Control
            </p>
            <p className="font-body text-sm text-white/40 max-w-xs leading-relaxed">
              Building the world's most sophisticated operational operating system.
            </p>
          </div>

          {/* Link groups */}
          {LINK_GROUPS.map((group) => (
            <div key={group.heading} className="space-y-4">
              <h4 className="font-headline text-white text-xs font-bold uppercase tracking-widest">
                {group.heading}
              </h4>
              <nav className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label text-xs text-white/40">
            © 2026 Veltro. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-label text-xs text-white/40">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
