import { Briefcase, Building2, GraduationCap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimatedInView, AnimatedItem } from '../components/motion/AnimatedInView'
import { GlassCard } from '../components/ui/GlassCard'
import { IconBox } from '../components/ui/IconBox'
import { SectionPage } from '../components/ui/SectionPage'
import { Tag } from '../components/ui/Tag'
import { siteContent } from '../content/site'
import type { CareerType } from '../content/types'
import { useLocale } from '../hooks/useLocale'
import { cn } from '../lib/cn'
import { getLocalized } from '../lib/localized'
import { badgeType, surfaceCardHover } from '../lib/surface'

const icons: Record<CareerType, typeof Briefcase> = {
  job: Briefcase,
  freelance: Building2,
  internship: GraduationCap,
}

export function Career() {
  const { t } = useTranslation()
  const locale = useLocale()
  const { career } = siteContent

  return (
    <SectionPage id="career" titleKey="sections.career">
      <div className="relative md:mx-auto md:max-w-5xl">
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-5 w-px bg-(--border-subtle) md:left-1/2 md:-translate-x-1/2"
        />

        <AnimatedInView as="ol" className="space-y-6 sm:space-y-8 md:space-y-10" stagger>
          {career.map((entry, index) => {
            const Icon = icons[entry.type]
            const isLeft = index % 2 === 0
            const isLast = index === career.length - 1

            return (
              <AnimatedItem
                key={entry.id}
                as="li"
                className={cn(
                  'relative',
                  'pl-14 md:grid md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:items-start md:gap-x-10 md:pl-0',
                )}
              >
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute left-5 top-11 -bottom-6 w-px bg-(--border-subtle) md:hidden"
                  />
                )}

                <div className="absolute left-0 top-0 z-10 md:relative md:col-start-2 md:row-start-1 md:flex md:justify-center md:pt-2">
                  <IconBox className="rounded-full ring-4 ring-(--bg-base) bg-(--bg-elevated)">
                    <Icon className="h-4 w-4" />
                  </IconBox>
                </div>

                <div
                  className={cn(
                    'min-w-0 md:row-start-1',
                    isLeft ? 'md:col-start-1 md:pr-2' : 'md:col-start-3 md:pl-2',
                  )}
                >
                  <GlassCard className={cn(surfaceCardHover, 'p-4 sm:p-5')}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-mono text-[11px] tracking-wider text-(--text-muted)">
                        {getLocalized(entry.period, locale)}
                      </p>
                      <span className={badgeType}>{t(`career.${entry.type}`)}</span>
                    </div>

                    <h3 className="mt-3 font-display text-base font-semibold text-(--text-primary) sm:text-lg">
                      {entry.company}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-(--text-muted)">
                      {getLocalized(entry.role, locale)}
                    </p>

                    {entry.description && (
                      <p className="mt-3 text-sm leading-relaxed text-(--text-muted)">
                        {getLocalized(entry.description, locale)}
                      </p>
                    )}

                    {entry.technologies && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {entry.technologies.map((tech) => (
                          <Tag key={tech}>{tech}</Tag>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </div>
              </AnimatedItem>
            )
          })}
        </AnimatedInView>
      </div>
    </SectionPage>
  )
}
