import { Menu } from 'lucide-react'
import { cn } from '../../lib/cn'

type Props = {
  open: boolean
  openLabel: string
  closeLabel: string
  onToggle: () => void
}

export function NavMenuButton({ open, openLabel, closeLabel, onToggle }: Props) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls="mobile-nav-menu"
      aria-label={open ? closeLabel : openLabel}
      onClick={onToggle}
      className={cn(
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition duration-200',
        open
          ? 'border-(--text-muted)/35 bg-white/8 text-(--text-primary)'
          : 'border-(--border-subtle) bg-white/4 text-(--text-primary) hover:border-(--text-muted)/30 hover:bg-white/5',
      )}
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
