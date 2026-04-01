import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import MagneticButton from '../ui/MagneticButton'

const NAV_LINKS = [
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Use Cases', to: '/customers' },
  { label: 'Blog', to: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const overlayRef = useRef(null)
  const linksRef = useRef([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.08, delay: 0.1 }
      )
    } else {
      document.body.style.overflow = ''
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' })
      }
    }
  }, [menuOpen])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isActive = (to) => location.pathname === to || (to !== '/' && location.pathname.startsWith(to))

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 w-[calc(100%-2.5rem)] max-w-5xl ${
          scrolled
            ? 'bg-surface/60 backdrop-blur-xl shadow-lg shadow-primary/5'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter text-primary font-headline hover:scale-[1.03] transition-transform"
        >
          Veltro
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-headline font-bold transition-all duration-300 hover:scale-[1.03] ${
                isActive(link.to)
                  ? 'text-clay border-b-2 border-clay pb-1'
                  : 'text-primary/70 hover:text-clay'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <MagneticButton variant="clay" to="/demo">
            Start Trial
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-primary hover:text-clay transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-30 bg-tertiary/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          style={{ opacity: 0 }}
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              ref={(el) => (linksRef.current[i] = el)}
              className={`font-headline text-2xl font-bold text-center transition-colors ${
                isActive(link.to) ? 'text-clay' : 'text-white/80 hover:text-clay'
              }`}
              style={{ opacity: 0 }}
            >
              {link.label}
            </Link>
          ))}
          <div ref={(el) => (linksRef.current[NAV_LINKS.length] = el)} style={{ opacity: 0 }}>
            <MagneticButton variant="clay" to="/demo">
              Start Trial
            </MagneticButton>
          </div>
        </div>
      )}
    </>
  )
}
