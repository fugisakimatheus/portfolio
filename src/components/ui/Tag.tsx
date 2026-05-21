import { cn } from '../../lib/cn'

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'rounded-full border border-[var(--border-subtle)] px-3 py-1 font-mono text-xs text-[var(--accent-secondary)]',
        className,
      )}
    >
      {children}
    </span>
  )
}
