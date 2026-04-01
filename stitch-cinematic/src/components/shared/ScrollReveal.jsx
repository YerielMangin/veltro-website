import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '../../lib/cn'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal({ children, className, delay = 0, y = 40, stagger = 0, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const targets = stagger ? ref.current.children : ref.current
      gsap.from(targets, {
        y,
        duration: 0.8,
        delay,
        stagger: stagger || 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [delay, y, stagger])

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  )
}
