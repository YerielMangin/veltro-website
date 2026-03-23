import { useState, useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'

const LINES = [
  '> Asset registered: Boiler Room #3...',
  '> Inspection completed: Building A...',
  '> Work order assigned: Maria T...',
  '> Sensor reading: 72.4°F nominal...',
  '> Compliance check: PASSED...',
]

export default function TelemetryTypewriter({ className }) {
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [displayLines, setDisplayLines] = useState(
    prefersReducedMotion.current ? LINES : []
  )
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [typing, setTyping] = useState(!prefersReducedMotion.current)

  useEffect(() => {
    if (!typing) return

    if (currentLine >= LINES.length) {
      const timeout = setTimeout(() => {
        setDisplayLines([])
        setCurrentLine(0)
        setCurrentChar(0)
      }, 2000)
      return () => clearTimeout(timeout)
    }

    const line = LINES[currentLine]

    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setDisplayLines((prev) => {
          const updated = [...prev]
          updated[currentLine] = line.slice(0, currentChar + 1)
          return updated
        })
        setCurrentChar((c) => c + 1)
      }, 50)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1)
        setCurrentChar(0)
      }, 600)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar, typing])

  const isTyping = typing && currentLine < LINES.length

  return (
    <div className={cn('bg-tertiary rounded-2xl p-6 flex flex-col h-full', className)}>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-label text-[10px] text-white/50 uppercase tracking-widest">
          Live Feed
        </span>
      </div>
      <div className="font-label text-sm space-y-3 leading-relaxed flex-1">
        {displayLines.map((line, i) => (
          <p key={i} className="text-white/60">
            <span className="text-white/80">{line?.slice(0, 2)}</span>
            <span>{line?.slice(2)}</span>
          </p>
        ))}
        {isTyping && (
          <span className="text-clay animate-pulse">|</span>
        )}
      </div>
    </div>
  )
}
