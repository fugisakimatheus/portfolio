import { cn } from '../../lib/cn'

const buttonStyles = {
  base: 'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition duration-200 w-full sm:w-auto',
  primary: 'bg-(--text-primary) text-(--bg-base) hover:bg-zinc-200 active:scale-[0.98]',
  ghost:
    'border border-(--border-subtle) bg-transparent text-(--text-primary) hover:border-(--text-muted) hover:bg-white/4 active:scale-[0.98]',
} as const

type Variant = 'primary' | 'ghost'

type SharedProps = {
  variant?: Variant
  className?: string
  children: React.ReactNode
}

type AnchorButton = SharedProps & Omit<React.ComponentProps<'a'>, keyof SharedProps> & { as?: 'a' }

type NativeButton = SharedProps &
  Omit<React.ComponentProps<'button'>, keyof SharedProps> & { as: 'button' }

export type ButtonProps = AnchorButton | NativeButton

function buttonClassName(variant: Variant, className?: string) {
  return cn(
    buttonStyles.base,
    variant === 'primary' ? buttonStyles.primary : buttonStyles.ghost,
    className,
  )
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', className, children, as = 'a', ...rest } = props

  if (as === 'button') {
    const { as: _, ...buttonRest } = rest as NativeButton
    return (
      <button type="button" className={buttonClassName(variant, className)} {...buttonRest}>
        {children}
      </button>
    )
  }

  const { as: _, ...anchorRest } = rest as AnchorButton
  return (
    <a className={buttonClassName(variant, className)} {...anchorRest}>
      {children}
    </a>
  )
}
