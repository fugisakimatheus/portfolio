import { cn } from '../../lib/cn'

type Props = {
  children: React.ReactNode
  className?: string
}

export function AvailabilityBadge({ children, className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-(--border-subtle)',
        'bg-(--bg-base) px-3 py-1 text-[11px] font-medium text-(--text-muted)',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" aria-hidden />
      {children}
    </span>
  )
}
