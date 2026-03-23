import { cn } from '../../lib/cn'

export default function Card({ children, className, hover = true, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl bg-surface-container-lowest shadow-ambient',
        hover && 'transition-transform duration-300 hover:-translate-y-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
