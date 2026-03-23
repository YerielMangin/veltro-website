import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { cn } from '../../lib/cn'

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const ACTIVE_DAY = 3 // Wednesday

export default function CursorScheduler({ className }) {
  const containerRef = useRef(null)
  const cursorRef = useRef(null)
  const cellRefs = useRef([])
  const btnRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const cursor = cursorRef.current
    const container = containerRef.current
    if (!cursor || !container) return

    const ctx = gsap.context(() => {
      const activeCell = cellRefs.current[ACTIVE_DAY]
      const btn = btnRef.current
      if (!activeCell || !btn) return

      const getPos = (el) => {
        const containerRect = container.getBoundingClientRect()
        const rect = el.getBoundingClientRect()
        return {
          x: rect.left - containerRect.left + rect.width / 2 - 8,
          y: rect.top - containerRect.top + rect.height / 2 - 8,
        }
      }

      // Build timeline after layout settles
      gsap.delayedCall(0.3, () => {
        const cellPos = getPos(activeCell)
        const btnPos = getPos(btn)

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })

        // Start off-screen left
        tl.set(cursor, { x: -20, y: cellPos.y, opacity: 0 })
        // Fade in and move to cell
        tl.to(cursor, { x: cellPos.x, opacity: 1, duration: 0.8, ease: 'power3.out' })
        // Click effect
        tl.to(cursor, { scale: 0.7, duration: 0.15, ease: 'power2.in' })
        tl.to(cursor, { scale: 1, duration: 0.25, ease: 'back.out(2)' })
        // Move to button
        tl.to(cursor, { x: btnPos.x, y: btnPos.y, duration: 0.6, ease: 'power2.inOut' }, '+=0.3')
        // Click button
        tl.to(cursor, { scale: 0.7, duration: 0.15, ease: 'power2.in' })
        tl.to(cursor, { scale: 1, duration: 0.25, ease: 'back.out(2)' })
        // Fade out
        tl.to(cursor, { opacity: 0, duration: 0.4 }, '+=0.5')
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('relative bg-surface-container rounded-2xl p-6 flex flex-col justify-center overflow-hidden', className)}
    >
      {/* Animated cursor */}
      <div
        ref={cursorRef}
        className="absolute w-4 h-4 text-clay opacity-0 pointer-events-none z-20 font-headline font-bold text-lg"
        aria-hidden="true"
      >
        →
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {DAYS.map((day, i) => (
          <div
            key={i}
            className={cn(
              'text-center text-[10px] font-label',
              i === ACTIVE_DAY ? 'text-clay font-bold opacity-100' : 'opacity-40'
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid cells */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {DAYS.map((_, i) => (
          <div
            key={i}
            ref={(el) => (cellRefs.current[i] = el)}
            className={cn(
              'aspect-square rounded-md flex items-center justify-center transition-colors duration-300',
              i === ACTIVE_DAY
                ? 'bg-clay/20 ring-2 ring-clay/40'
                : 'bg-white'
            )}
          >
            {i === ACTIVE_DAY && (
              <div className="w-1.5 h-1.5 rounded-full bg-clay" />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center">
        <span className="font-label text-[10px] uppercase tracking-widest mb-4 opacity-50">
          Inspection Protocol
        </span>
        <button
          ref={btnRef}
          className="bg-clay text-white px-6 py-3 rounded-full font-headline text-sm font-bold w-full active:scale-95 transition-transform"
        >
          Schedule
        </button>
      </div>
    </div>
  )
}
