import { cn } from '../../lib/cn'
import { SiteLogo } from '../brand/SiteLogo'

type LogoSize = 'sm' | 'md'

type Props = {
  monogram: string
  label: string
  size: LogoSize
  onClick?: () => void
  className?: string
}

const labelStyles: Record<LogoSize, string> = {
  sm: 'font-display text-[16px] font-semibold tracking-tight text-(--text-primary)',
  md: 'truncate font-display text-[15px] font-semibold text-(--text-primary)',
}

export function NavBrandLink({ monogram, label, size, onClick, className }: Props) {
  return (
    <a
      href="#about"
      onClick={onClick}
      className={cn(
        'group flex min-w-0 items-center',
        size === 'sm' &&
          'gap-2.5 justify-self-start rounded-full border border-transparent py-1 px-1.5 pr-4 transition-colors duration-200 hover:border-(--border-subtle) hover:bg-white/3',
        size === 'md' && 'gap-3.5',
        className,
      )}
    >
      <SiteLogo monogram={monogram} size={size} />
      <span className={labelStyles[size]}>{label}</span>
    </a>
  )
}
