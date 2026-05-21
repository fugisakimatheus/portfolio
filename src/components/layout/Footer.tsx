import { useTranslation } from 'react-i18next'
import { siteContent } from '../../content/site'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border-subtle)] px-6 py-8 text-center text-sm text-[var(--text-muted)]">
      <p>
        © {year} {siteContent.profile.name}. {t('footer.built')}
      </p>
      <div className="mt-4 flex justify-center gap-4">
        {siteContent.profile.socials.map((s) => (
          <a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="capitalize hover:text-[var(--accent-glow)]"
          >
            {s.platform}
          </a>
        ))}
      </div>
    </footer>
  )
}
