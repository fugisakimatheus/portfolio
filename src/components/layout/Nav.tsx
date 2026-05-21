import { useTranslation } from 'react-i18next'
import { cn } from '../../lib/cn'
import { useScrollSpy, type SectionId } from '../../hooks/useScrollSpy'
import { LanguageToggle } from './LanguageToggle'
import { siteContent } from '../../content/site'

const LINKS: { id: SectionId; key: string }[] = [
  { id: 'about', key: 'nav.about' },
  { id: 'career', key: 'nav.career' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'contact', key: 'nav.contact' },
]

export function Nav() {
  const { t } = useTranslation()
  const active = useScrollSpy()
  const mailto = `mailto:${siteContent.contact.email}`

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="font-[family-name:var(--font-display)] font-bold text-[var(--text-primary)]">
          {siteContent.profile.name.split(' ')[0]}
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map(({ id, key }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  'text-sm transition',
                  active === id
                    ? 'text-[var(--accent-glow)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                )}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a href={mailto} className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm text-white md:inline-flex">
            {t('cta.primary')}
          </a>
        </div>
      </nav>
    </header>
  )
}
