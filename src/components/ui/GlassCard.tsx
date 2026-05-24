import { cn } from '../../lib/cn'
import { surfaceCard } from '../../lib/surface'

export function GlassCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn(surfaceCard, 'p-4 sm:p-6', className)}>{children}</div>
}
