import { cn } from '../../lib/cn'

export function GlassCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] p-6 backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </div>
  )
}
