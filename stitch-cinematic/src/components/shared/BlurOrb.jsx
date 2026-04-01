import { cn } from '../../lib/cn'

export default function BlurOrb({ color = 'bg-clay', size = 'w-96 h-96', className, ...props }) {
  return (
    <div
      className={cn('absolute rounded-full blur-[120px] opacity-20', color, size, className)}
      aria-hidden="true"
      {...props}
    />
  )
}
