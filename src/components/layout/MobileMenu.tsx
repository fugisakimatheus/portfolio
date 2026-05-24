import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Mail, X } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { siteContent } from '../../content/site'
import type { SectionId } from '../../hooks/useScrollSpy'
import { cn } from '../../lib/cn'
import { getMailto } from '../../lib/contact'
import { getMonogram } from '../../lib/monogram'
import { SiteLogo } from '../brand/SiteLogo'
import { LanguageToggle } from './LanguageToggle'
import { NavLinks } from './NavLinks'

type Props = {
  open: boolean
  onClose: () => void
  active: SectionId
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const panelVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
}

export function MobileMenu({ open, onClose, active }: Props) {
  const { t } = useTranslation()
  const { profile, contact } = siteContent
  const mailto = getMailto()
  const monogram = getMonogram(profile.name)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.menuLabel')}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-100 md:hidden"
        >
          <motion.button
            type="button"
            aria-label={t('nav.closeMenu')}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-(--bg-overlay) backdrop-blur-md"
            onClick={onClose}
          />

          <motion.nav
            id="mobile-nav-menu"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'relative flex h-full flex-col overflow-y-auto',
              'bg-(--bg-base) px-5 pb-8 pt-[max(1.25rem,env(safe-area-inset-top))]',
            )}
          >
            <div className="relative flex items-center justify-between gap-4 py-3">
              <a href="#about" onClick={onClose} className="group flex min-w-0 items-center gap-3">
                <SiteLogo monogram={monogram} size="md" />
                <div className="min-w-0">
                  <p className="truncate font-display text-base font-semibold text-(--text-primary)">
                    {profile.name}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-(--text-muted)">
                    {t('nav.menuSubtitle')}
                  </p>
                </div>
              </a>

              <button
                type="button"
                aria-label={t('nav.closeMenu')}
                onClick={onClose}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-(--border-subtle) bg-white/4 text-(--text-primary) transition duration-200 hover:border-(--text-muted)/30 hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <NavLinks active={active} t={t} variant="mobile" onNavigate={onClose} />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="relative mt-auto space-y-4 border-t border-(--border-subtle) pt-6"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--text-muted)">
                  {t('nav.language')}
                </span>
                <LanguageToggle />
              </div>

              <a
                href={mailto}
                onClick={onClose}
                aria-label={`${t('nav.headerContact')} — ${contact.email}`}
                className={cn(
                  'group flex min-h-18 w-full items-center gap-4 rounded-2xl border px-4 py-4',
                  'border-(--border-subtle) bg-(--bg-elevated)',
                  'transition duration-200 active:scale-[0.99] hover:bg-white/4',
                )}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--border-subtle) bg-(--bg-base) text-(--text-muted)">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                </span>

                <span className="min-w-0 flex-1 text-left">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-(--text-muted)">
                    {t('contact.email')}
                  </span>
                  <span className="mt-0.5 block font-medium text-(--text-primary)">
                    {t('nav.headerContact')}
                  </span>
                  <span className="mt-1 block truncate text-sm text-(--text-muted)">
                    {contact.email}
                  </span>
                </span>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-(--text-muted)" aria-hidden />
              </a>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
