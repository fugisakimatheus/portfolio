import { cn } from '../../lib/cn'

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'rounded-full border border-(--border-subtle) bg-(--bg-base) px-2.5 py-1 font-mono text-[10px] leading-none text-(--text-muted)',
        className,
      )}
    >
      {children}
    </span>
  )
}
