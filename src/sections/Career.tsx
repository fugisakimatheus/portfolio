import { Briefcase, Building2, CalendarClock, GraduationCap, TimerReset } from 'lucide-react'
import { AnimatedInView, AnimatedItem } from '../components/motion/AnimatedInView'
import { IconBox } from '../components/ui/IconBox'
import { SectionPage } from '../components/ui/SectionPage'
import { siteContent } from '../content/site'
import type { CareerType } from '../content/types'
import { useLocale } from '../hooks/useLocale'
import { cn } from '../lib/cn'
import { CareerCard } from './career/CareerCard'

const icons: Record<CareerType, typeof Briefcase> = {
  job: Briefcase,
  legal: Building2,
  'part-time': TimerReset,
  freelance: CalendarClock,
  internship: GraduationCap,
}

export function Career() {
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
                  'pl-14 md:grid md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:items-center md:gap-x-8 md:pl-0 lg:gap-x-10',
                )}
              >
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute left-5 top-11 -bottom-6 w-px bg-(--border-subtle) md:hidden"
                  />
                )}

                <div className="absolute left-0 top-0 z-10 md:relative md:col-start-2 md:row-start-1 md:flex md:justify-center">
                  <IconBox className="rounded-full ring-4 ring-(--bg-base) bg-(--bg-elevated)">
                    <Icon className="h-4 w-4" />
                  </IconBox>
                </div>

                <div
                  className={cn(
                    'min-w-0 md:row-start-1',
                    isLeft ? 'md:col-start-1 md:pr-1 lg:pr-2' : 'md:col-start-3 md:pl-1 lg:pl-2',
                  )}
                >
                  <CareerCard entry={entry} locale={locale} />
                </div>
              </AnimatedItem>
            )
          })}
        </AnimatedInView>
      </div>
    </SectionPage>
  )
}
