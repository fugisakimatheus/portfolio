import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeRight, fadeUp, heroStagger, reducedFade } from '../components/motion/variants'
import { AvailabilityBadge } from '../components/ui/AvailabilityBadge'
import { Button } from '../components/ui/Button'
import { siteContent } from '../content/site'
import { useLocale } from '../hooks/useLocale'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../lib/cn'
import { getMailto } from '../lib/contact'
import { heroPt, layoutInner, layoutOuter } from '../lib/layout'
import { getLocalized } from '../lib/localized'
import { getMonogram } from '../lib/monogram'
import { splitName } from '../lib/names'
import { HeroBackground } from './HeroBackground'

function HeroAvatar({ name, src, badge }: { name: string; src?: string; badge: string }) {
  const initials = getMonogram(name)

  const sizeClasses = 'h-30 w-30 sm:h-48 sm:w-48 md:h-52 md:w-52 lg:h-54 lg:w-54'

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-5">
      <div className="relative shrink-0">
        <div
          aria-hidden
          className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.12)_0%,rgba(99,102,241,0.04)_45%,transparent_72%)] blur-3xl md:-inset-12"
        />
        <div className="relative rounded-full border border-(--border-subtle) bg-(--bg-elevated)/50 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          {src ? (
            <img
              src={src}
              alt={name}
              className={cn(sizeClasses, 'rounded-full object-cover object-[center_20%]')}
            />
          ) : (
            <div
              className={cn(
                sizeClasses,
                'flex items-center justify-center rounded-full bg-(--bg-elevated) font-display text-3xl font-semibold text-(--text-muted) sm:text-4xl',
              )}
            >
              {initials}
            </div>
          )}
        </div>
      </div>

      <AvailabilityBadge className="max-w-[min(100%,16rem)] bg-(--bg-elevated)/80 backdrop-blur-sm sm:max-w-none">
        {badge}
      </AvailabilityBadge>
    </div>
  )
}

export function Hero() {
  const { t } = useTranslation()
  const locale = useLocale()
  const reduced = useReducedMotion()
  const { profile } = siteContent
  const mailto = getMailto()
  const { first, last } = splitName(profile.name)

  const motionProps = reduced
    ? { initial: 'hidden', animate: 'visible', variants: reducedFade }
    : { variants: heroStagger, initial: 'hidden', animate: 'visible' }

  const childProps = reduced ? {} : { variants: fadeUp }
  const avatarProps = reduced ? childProps : { variants: fadeRight }

  return (
    <section id="about" className="relative flex min-h-svh flex-col overflow-hidden">
      <HeroBackground />

      <motion.div
        {...motionProps}
        className={cn(
          layoutOuter,
          'relative z-10 flex flex-1 flex-col items-center justify-center',
          heroPt,
          'pb-16 sm:pb-20',
        )}
      >
        <div
          className={cn(
            layoutInner,
            'flex w-full flex-col items-center gap-10 sm:gap-12',
            'md:flex-row md:items-center md:gap-14 lg:gap-16',
          )}
        >
          <motion.div {...avatarProps} className="flex w-full shrink-0 justify-center md:w-auto">
            <HeroAvatar name={profile.name} src={profile.avatar} badge={t('hero.available')} />
          </motion.div>

          <div className="flex w-full min-w-0 flex-1 flex-col items-center text-center md:items-start md:text-left">
            <motion.p
              {...childProps}
              className="font-mono text-[11px] tracking-[0.12em] text-(--text-muted) uppercase sm:text-xs"
            >
              {getLocalized(profile.title, locale)}
            </motion.p>

            <motion.h1
              {...childProps}
              className="mt-4 font-display text-[clamp(2rem,8vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] sm:mt-5 sm:text-5xl md:text-[3.15rem] lg:text-[3.35rem]"
            >
              <span className="bg-linear-to-br from-(--text-primary) via-[#e4e4e7] to-[#a5b4fc]/90 bg-clip-text text-transparent">
                {first}
              </span>
              {last && (
                <span className="mt-1 block bg-linear-to-r from-(--text-muted) via-(--text-muted) to-(--text-muted)/50 bg-clip-text text-transparent sm:mt-1.5">
                  {last}
                </span>
              )}
            </motion.h1>

            <motion.p
              {...childProps}
              className="mt-5 max-w-88 text-[15px] leading-[1.65] text-(--text-muted) sm:mt-6 sm:max-w-md sm:text-base"
            >
              {getLocalized(profile.bio, locale)}
            </motion.p>

            <motion.div
              {...childProps}
              className="mt-8 flex w-full max-w-[18rem] flex-col gap-3 sm:mt-10 sm:max-w-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 md:max-w-none md:justify-start"
            >
              <Button href={mailto}>{t('cta.primary')}</Button>
              <Button variant="ghost" href="#projects">
                {t('cta.viewProjects')}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
          aria-hidden
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--text-muted)/60">
            scroll
          </span>
          <motion.span
            className="block h-8 w-px origin-top bg-linear-to-b from-(--text-muted)/50 to-transparent"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </section>
  )
}
