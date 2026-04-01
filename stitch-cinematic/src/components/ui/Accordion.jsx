import { cn } from '../../lib/cn'

export default function Accordion({ items, className }) {
  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, i) => (
        <details key={i} className="group rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
          <summary className="flex cursor-pointer items-center justify-between font-headline font-bold text-lg text-primary list-none">
            {item.question}
            <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
              expand_more
            </span>
          </summary>
          <p className="mt-4 font-body text-on-surface/70 leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
