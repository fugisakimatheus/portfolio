import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { siteContent } from '../content/site'
import { getLocalized } from '../lib/localized'
import { Button } from '../components/ui/Button'
import { HeroGridFallback } from './HeroGridFallback'
import { useReducedMotion } from '../hooks/useReducedMotion'

const HeroScene = lazy(() =>
  import('./HeroScene').then((m) => ({ default: m.HeroScene })),
)

export function Hero() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language.startsWith('pt') ? 'pt' : 'en'
  const reduced = useReducedMotion()
  const [webgl] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      const canvas = document.createElement('canvas')
      return !!canvas.getContext('webgl')
    } catch {
      return false
    }
  })

  const { profile, contact } = siteContent
  const mailto = `mailto:${contact.email}`

  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center"
    >
      {!reduced && webgl ? (
        <Suspense fallback={<HeroGridFallback />}>
          <HeroScene />
        </Suspense>
      ) : (
        <HeroGridFallback />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.2 : 0.6 }}
        className="relative z-10 max-w-3xl"
      >
        <p className="font-mono text-sm text-[var(--accent-secondary)]">
          {getLocalized(profile.title, locale)}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-tight md:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-6 text-lg text-[var(--text-muted)]">
          {getLocalized(profile.bio, locale)}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={mailto}>{t('cta.primary')}</Button>
          <Button variant="ghost" href="#projects">
            {t('cta.viewProjects')}
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
