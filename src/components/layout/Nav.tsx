import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { siteContent } from '../../content/site'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useCloseOnResize } from '../../hooks/useCloseOnResize'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { useScrollThreshold } from '../../hooks/useScrollThreshold'
import { cn } from '../../lib/cn'
import { getMailto } from '../../lib/contact'
import { layoutOuter } from '../../lib/layout'
import { getMonogram } from '../../lib/monogram'
import { getFirstName } from '../../lib/names'
import { LanguageToggle } from './LanguageToggle'
import { MobileMenu } from './MobileMenu'
import { NavBrandLink } from './NavBrandLink'
import { NavContactButton } from './NavContactButton'
import { NavLinks } from './NavLinks'
import { NavMenuButton } from './NavMenuButton'

export function Nav() {
  const { t } = useTranslation()
  const active = useScrollSpy()
  const scrolled = useScrollThreshold(32)
  const [menuOpen, setMenuOpen] = useState(false)
  const { profile, contact } = siteContent
  const mailto = getMailto()
  const firstName = getFirstName(profile.name)
  const monogram = getMonogram(profile.name)
  const contactAria = `${t('nav.headerContact')} — ${contact.email}`

  useBodyScrollLock(menuOpen)
  useCloseOnResize(menuOpen, () => setMenuOpen(false))

  const navSurface = cn(
    'relative w-full max-w-5xl rounded-2xl border border-(--border-subtle) transition-all duration-300',
    scrolled
      ? 'bg-(--bg-nav-scrolled) shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl'
      : 'bg-(--bg-nav) backdrop-blur-md',
  )

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex justify-center pt-3 sm:pt-4',
          layoutOuter,
          'max-sm:pt-[max(0.75rem,env(safe-area-inset-top))]',
        )}
      >
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={navSurface}
        >
          <div className="hidden h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 px-3 sm:px-4 md:grid">
            <NavBrandLink monogram={monogram} label={firstName} size="sm" />

            <div className="justify-self-center rounded-full border border-(--border-subtle) bg-(--bg-elevated)/80 p-1">
              <NavLinks active={active} t={t} variant="desktop" />
            </div>

            <div className="flex items-center gap-3 justify-self-end">
              <LanguageToggle />
              <NavContactButton
                href={mailto}
                label={t('nav.headerContact')}
                ariaLabel={contactAria}
              />
            </div>
          </div>

          <div className="flex h-14 items-center justify-between gap-3 px-3 sm:px-4 md:hidden">
            <NavBrandLink monogram={monogram} label={firstName} size="md" onClick={closeMenu} />

            <div className="flex shrink-0 items-center gap-2">
              <NavContactButton
                href={mailto}
                label={t('nav.headerContact')}
                ariaLabel={contactAria}
                size="compact"
              />
              <NavMenuButton
                open={menuOpen}
                openLabel={t('nav.openMenu')}
                closeLabel={t('nav.closeMenu')}
                onToggle={() => setMenuOpen((o) => !o)}
              />
            </div>
          </div>
        </motion.nav>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} />
    </>
  )
}
