import { useState, useEffect } from 'react'
import { cn } from '../../lib/cn'

const CARDS = [
  { id: 'wo-1', number: '#0021', label: 'Fire Panel — Complete', status: 'COMPLETE', urgent: false },
  { id: 'wo-2', number: '#0022', label: 'Roof Leak — Urgent', status: 'URGENT', urgent: true },
  { id: 'wo-3', number: '#0023', label: 'HVAC Unit #7 — Scheduled', status: 'SCHEDULED', urgent: false },
]

const stackStyles = [
  'z-30 translate-y-0 scale-100 opacity-100 shadow-xl ring-1 ring-clay/10',
  'z-20 translate-y-12 scale-[0.9] opacity-40 shadow-md',
  'z-10 translate-y-24 scale-75 opacity-20 shadow-sm',
]

export default function DiagnosticShuffler({ className }) {
  const [order, setOrder] = useState([0, 1, 2])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn('relative h-60 flex items-start justify-center pt-4', className)}>
      {order.map((cardIndex, stackPos) => {
        const card = CARDS[cardIndex]
        return (
          <div
            key={card.id}
            className={cn(
              'absolute left-4 right-4 bg-surface-container-lowest rounded-2xl p-6 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
              stackStyles[stackPos]
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <span
                className={cn(
                  'font-label text-[10px] uppercase tracking-widest font-bold',
                  card.urgent ? 'text-clay' : 'text-on-surface/50'
                )}
              >
                {card.status}
              </span>
              <span className="font-label text-[10px] text-on-surface/30">{card.number}</span>
            </div>
            <p className="font-headline font-bold text-on-surface">{card.label}</p>
          </div>
        )
      })}
    </div>
  )
}
