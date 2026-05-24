import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { siteContent } from '../../content/site'
import { cn } from '../../lib/cn'
import { layoutInner, layoutOuter } from '../../lib/layout'

const socialLabels: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  website: 'Site',
}

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'border-t border-(--border-subtle) py-10 text-sm text-(--text-muted) sm:py-12',
        layoutOuter,
        'pb-[max(2.5rem,env(safe-area-inset-bottom))]',
      )}
    >
      <div className={cn(layoutInner, 'flex flex-col items-center gap-6 text-center')}>
        <p className="max-w-xs leading-relaxed sm:max-w-none">
          © {year} {siteContent.profile.name}. {t('footer.built')}
        </p>
        <div className="flex w-full max-w-sm flex-col gap-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          {siteContent.profile.socials.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full border border-(--border-subtle)',
                'bg-(--bg-elevated) px-4 py-2.5 text-sm font-medium capitalize text-(--text-primary) transition duration-200',
                'active:border-(--text-muted)/30 active:bg-white/4',
                'sm:w-auto md:hover:border-(--text-muted)/25 md:hover:bg-white/3',
              )}
            >
              {socialLabels[s.platform] ?? s.platform}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
