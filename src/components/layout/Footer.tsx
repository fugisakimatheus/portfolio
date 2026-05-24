import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { IconType } from 'react-icons'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { SiGithub } from 'react-icons/si'
import { siteContent } from '../../content/site'
import { cn } from '../../lib/cn'
import { layoutInner, layoutOuter } from '../../lib/layout'

const socialConfig: Record<string, { label: string; icon: IconType }> = {
  github: { label: 'GitHub', icon: SiGithub },
  linkedin: { label: 'LinkedIn', icon: FaLinkedin },
  instagram: { label: 'Instagram', icon: FaInstagram },
}

const socialLinkClass = cn(
  'inline-flex items-center justify-center rounded-full border border-(--border-subtle)',
  'bg-(--bg-elevated) text-(--text-primary) transition duration-200',
  'active:border-(--text-muted)/30 active:bg-white/4',
  'md:hover:border-(--text-muted)/25 md:hover:bg-white/3',
)

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
      <div className={cn(layoutInner, 'flex flex-col items-center gap-5 text-center sm:gap-6')}>
        <p className="max-w-xs leading-relaxed sm:max-w-none">
          © {year} {siteContent.profile.name}.
        </p>

        <ul
          className="flex list-none items-center justify-center gap-2.5 p-0 sm:flex-wrap sm:gap-3"
          aria-label={t('footer.socials')}
        >
          {siteContent.profile.socials.map((s) => {
            const config = socialConfig[s.platform]
            const label = config?.label ?? s.platform
            const Icon = config?.icon

            return (
              <li key={s.platform}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    socialLinkClass,
                    'h-11 w-11 shrink-0',
                    'sm:min-h-11 sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2.5',
                  )}
                >
                  {Icon ? (
                    <Icon className="h-[1.125rem] w-[1.125rem] sm:h-4 sm:w-4" aria-hidden />
                  ) : null}
                  <span className="hidden text-sm font-medium sm:inline">{label}</span>
                  <ArrowUpRight className="hidden h-3.5 w-3.5 opacity-60 sm:inline" aria-hidden />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </footer>
  )
}
