import { cn } from '../../lib/cn'

const iconBoxBase =
  'flex shrink-0 items-center justify-center border border-(--border-subtle) bg-(--bg-base) text-(--text-muted)'

type Props = {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md'
}

export function IconBox({ children, className, size = 'md' }: Props) {
  return (
    <span
      className={cn(
        iconBoxBase,
        size === 'sm' && 'h-8 w-8 rounded-full',
        size === 'md' && 'h-10 w-10 rounded-lg',
        className,
      )}
    >
      {children}
    </span>
  )
}
