import { cn } from '../../lib/cn'

type Props = React.ComponentProps<'a'> & {
  variant?: 'primary' | 'ghost'
}

export function Button({ variant = 'primary', className, children, ...props }: Props) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition',
        variant === 'primary' &&
          'bg-[var(--accent)] text-white hover:shadow-[0_0_24px_var(--accent-glow)]',
        variant === 'ghost' &&
          'border border-[var(--border-subtle)] bg-[var(--surface-glass)] text-[var(--text-primary)] backdrop-blur-xl hover:border-[var(--accent)]',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
