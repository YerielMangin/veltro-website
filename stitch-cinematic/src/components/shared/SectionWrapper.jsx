import { cn } from '../../lib/cn'

export default function SectionWrapper({ children, className, dark, id, ...props }) {
  return (
    <section
      id={id}
      className={cn(
        'px-5 md:px-8 lg:px-12 xl:px-16 py-16 md:py-20 lg:py-24',
        dark ? 'bg-tertiary text-white' : 'bg-surface text-on-surface',
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}
