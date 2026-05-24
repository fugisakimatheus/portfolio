import { Mail } from 'lucide-react'
import { cn } from '../../lib/cn'

type Props = {
  href: string
  label: string
  ariaLabel: string
  size?: 'default' | 'compact'
  onClick?: () => void
}

export function NavContactButton({ href, label, ariaLabel, size = 'default', onClick }: Props) {
  const iconSize = size === 'compact' ? 'h-3.5 w-3.5' : 'h-4 w-4'

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full',
        'border border-(--border-subtle) bg-(--bg-elevated)',
        'text-(--text-primary) transition duration-200',
        'hover:border-(--text-muted) hover:bg-white/6',
        'active:scale-[0.98]',
        size === 'compact' && 'min-h-10 px-3 py-1.5 text-xs font-medium',
        size === 'default' && 'min-h-10 px-4 py-2 text-sm font-medium',
      )}
    >
      <Mail className={cn('shrink-0 text-(--text-muted)', iconSize)} aria-hidden />
      <span>{label}</span>
    </a>
  )
}
