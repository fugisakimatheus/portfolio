import { useTranslation } from 'react-i18next'
import { setLocale } from '../../i18n'
import { cn } from '../../lib/cn'

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const current = i18n.language.startsWith('pt') ? 'pt' : 'en'

  return (
    <div className="flex gap-1 rounded-full border border-[var(--border-subtle)] p-1 text-xs">
      {(['pt', 'en'] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => setLocale(lng)}
          className={cn(
            'rounded-full px-2 py-1 uppercase transition',
            current === lng
              ? 'bg-[var(--accent)] text-white'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
          )}
        >
          {lng}
        </button>
      ))}
    </div>
  )
}
