import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { setLocale } from '../../i18n'
import { cn } from '../../lib/cn'

export function LanguageToggle({ className }: { className?: string }) {
  const { i18n } = useTranslation()
  const current = i18n.language.startsWith('pt') ? 'pt' : 'en'

  return (
    <fieldset
      className={cn(
        'relative flex gap-0.5 rounded-full border border-(--border-subtle) bg-(--bg-elevated) p-0.5',
        'm-0 min-w-0 border-0 p-0.5',
        className,
      )}
    >
      <legend className="sr-only">Language</legend>
      {(['pt', 'en'] as const).map((lng) => {
        const isActive = current === lng
        return (
          <button
            key={lng}
            type="button"
            onClick={() => setLocale(lng)}
            className={cn(
              'relative z-10 rounded-full px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider transition-colors duration-200',
              isActive
                ? 'text-(--text-primary)'
                : 'text-(--text-muted) hover:text-(--text-primary)',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-white/1"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{lng}</span>
          </button>
        )
      })}
    </fieldset>
  )
}
