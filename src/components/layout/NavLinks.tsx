import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { NAV_LINKS } from '../../content/nav'
import type { SectionId } from '../../hooks/useScrollSpy'
import { cn } from '../../lib/cn'

type Props = {
  active: SectionId
  t: (key: string) => string
  onNavigate?: () => void
  variant: 'desktop' | 'mobile'
}

export function NavLinks({ active, t, onNavigate, variant }: Props) {
  if (variant === 'desktop') {
    return (
      <ul className="flex w-fit items-center gap-1">
        {NAV_LINKS.map(({ id, key }) => {
          const isActive = active === id
          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative isolate block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200',
                  isActive
                    ? 'text-(--text-primary)'
                    : 'text-(--text-muted) hover:text-(--text-primary)',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 z-0 rounded-full bg-white/8"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{t(key)}</span>
              </a>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ul className="relative mt-6 flex flex-1 flex-col justify-center gap-1 py-4">
      {NAV_LINKS.map(({ id, key }, index) => {
        const isActive = active === id
        return (
          <motion.li
            key={id}
            custom={index}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: (i: number) => ({
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.08 + i * 0.05,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              }),
            }}
            initial="hidden"
            animate="visible"
          >
            <a
              href={`#${id}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={onNavigate}
              className={cn(
                'group flex items-center gap-4 rounded-2xl border px-4 py-4 transition duration-200',
                isActive
                  ? 'border-(--border-subtle) bg-white/6'
                  : 'border-transparent bg-transparent hover:bg-white/4',
              )}
            >
              <span
                className={cn(
                  'font-mono text-xs tabular-nums tracking-wider',
                  isActive ? 'text-(--text-primary)' : 'text-(--text-muted)',
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'flex-1 font-display text-2xl font-semibold tracking-tight',
                  isActive
                    ? 'text-(--text-primary)'
                    : 'text-(--text-muted) group-hover:text-(--text-primary)',
                )}
              >
                {t(key)}
              </span>
              <ArrowUpRight
                className={cn(
                  'h-5 w-5 shrink-0 transition',
                  isActive
                    ? 'text-(--text-muted) opacity-100'
                    : 'text-(--text-muted) opacity-0 group-hover:opacity-50',
                )}
                aria-hidden
              />
            </a>
          </motion.li>
        )
      })}
    </ul>
  )
}
