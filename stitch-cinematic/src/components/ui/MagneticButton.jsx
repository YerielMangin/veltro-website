import { cn } from '../../lib/cn'
import { Link } from 'react-router-dom'

const variants = {
  clay: 'bg-clay text-white hover:bg-secondary',
  moss: 'bg-primary text-white hover:bg-primary-container',
  outline: 'bg-transparent text-primary border border-outline-variant/20 hover:bg-surface-container',
}

export default function MagneticButton({ children, variant = 'clay', href, to, className, ...props }) {
  const classes = cn(
    'group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-headline font-bold text-sm md:text-base transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] active:scale-[0.98] overflow-hidden',
    variants[variant],
    className
  )

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>
  }

  if (href) {
    return <a href={href} className={classes} {...props}>{children}</a>
  }

  return <button className={classes} {...props}>{children}</button>
}
