import { cn } from '../../lib/cn'

type Props = {
  monogram?: string
  size?: 'sm' | 'md'
  className?: string
}

/** sm = desktop header, md = mobile header / menu */
const sizeStyles = {
  sm: {
    radius: 'rounded-full',
    text: 'text-[13px]',
    pip: 'bottom-1.5 right-1.5 h-1.5 w-1.5',
  },
  md: {
    radius: 'rounded-full',
    text: 'text-[16px]',
    pip: 'bottom-2 right-2 h-1.5 w-1.5',
  },
} as const

export function SiteLogo({ monogram = 'MF', size = 'md', className }: Props) {
  const s = sizeStyles[size]

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 h-10 w-10 md:h-11 md:w-11',
        'transition-transform duration-300 ease-out',
        'group-hover:scale-[1.03] group-active:scale-[0.98]',
        'motion-reduce:transition-none motion-reduce:group-hover:scale-100',
        className,
      )}
      aria-hidden
    >
      <span
        className={cn(
          'pointer-events-none absolute -inset-1 rounded-[inherit] opacity-0 blur-md transition-opacity duration-300',
          'bg-[radial-gradient(circle,var(--logo-bloom)_0%,transparent_72%)]',
          'group-hover:opacity-100',
        )}
      />

      <span
        className={cn(
          'relative flex h-full w-full items-center justify-center overflow-hidden',
          s.radius,
          'border border-(--logo-border) bg-(--logo-bg)',
          'shadow-[inset_0_1px_0_var(--logo-shine),0_4px_16px_-12px_var(--logo-shadow)]',
        )}
      >
        <span className="pointer-events-none absolute inset-0 bg-(--logo-surface)" />

        <span
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 110% 85% at 50% -30%, var(--logo-mesh), transparent 65%)',
          }}
        />

        <span
          className={cn(
            'relative z-10 text-[15px]! font-display font-bold leading-none tracking-tighter',
            s.text,
            'bg-linear-to-br from-(--text-primary) via-(--text-primary) to-(--accent-glow)',
            'bg-clip-text text-transparent',
          )}
        >
          {monogram}
        </span>
      </span>
    </span>
  )
}
