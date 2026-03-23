import { cn } from '../../lib/cn'

export default function Badge({ children, variant = 'default', className, ...props }) {
  const variants = {
    default: 'bg-clay/10 text-clay',
    primary: 'bg-primary/10 text-primary',
    outline: 'border border-outline-variant/20 text-on-surface',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 font-label text-[10px] uppercase tracking-widest font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
