import { useTranslation } from 'react-i18next'
import { GlassCard } from '../../components/ui/GlassCard'
import { Tag } from '../../components/ui/Tag'
import type { CareerEntry, Locale } from '../../content/types'
import { cn } from '../../lib/cn'
import { getLocalized } from '../../lib/localized'
import { badgeType, surfaceCardHover } from '../../lib/surface'
import { CareerDescription } from './CareerDescription'

type Props = {
  entry: CareerEntry
  locale: Locale
}

export function CareerCard({ entry, locale }: Props) {
  const { t } = useTranslation()
  const description = entry.description ? getLocalized(entry.description, locale) : null

  return (
    <GlassCard className={cn(surfaceCardHover, 'flex flex-col p-4 sm:p-5')}>
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

      {description ? <CareerDescription key={locale} text={description} /> : null}

      {entry.technologies ? (
        <div
          className={cn(
            'mt-4 flex flex-wrap gap-1.5',
            description && 'border-t border-(--border-subtle) pt-4',
          )}
        >
          {entry.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      ) : null}
    </GlassCard>
  )
}
