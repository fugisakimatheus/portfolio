import type { LucideIcon } from 'lucide-react'
import { Code2, FlaskConical, Wrench } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatedInView, AnimatedItem } from '../components/motion/AnimatedInView'
import { GlassCard } from '../components/ui/GlassCard'
import { IconBox } from '../components/ui/IconBox'
import { SectionPage } from '../components/ui/SectionPage'
import { siteContent } from '../content/site'
import type { SkillEntry } from '../content/types'
import { cn } from '../lib/cn'
import { getSkillBrandColor, SkillIcon } from '../lib/skillIcons'
import { surfaceCardHover } from '../lib/surface'

const CATEGORIES = ['frontend', 'tools', 'testing'] as const

type CategoryId = (typeof CATEGORIES)[number]

const categoryMeta: Record<CategoryId, { icon: LucideIcon; descKey: string; spanClass?: string }> =
  {
    frontend: {
      icon: Code2,
      descKey: 'skills.frontendDesc',
      spanClass: 'lg:col-span-2',
    },
    tools: {
      icon: Wrench,
      descKey: 'skills.toolsDesc',
    },
    testing: {
      icon: FlaskConical,
      descKey: 'skills.testingDesc',
    },
  }

function groupSkills() {
  return CATEGORIES.map((category) => ({
    category,
    skills: siteContent.skills.filter((s) => s.category === category),
  })).filter((g) => g.skills.length > 0)
}

function SkillChip({ skill }: { skill: SkillEntry }) {
  const accent = getSkillBrandColor(skill.icon)

  return (
    <li
      style={accent ? ({ '--skill-accent': accent } as CSSProperties) : undefined}
      className={cn(
        'group inline-flex max-w-full items-center gap-2 rounded-full border border-(--border-subtle)',
        'bg-(--bg-base) py-1 pl-1 pr-3 transition duration-200',
        'hover:border-(--text-muted)/30 hover:bg-white/2',
        accent && 'hover:border-(--skill-accent)/35',
      )}
    >
      <span
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--border-subtle)',
          'bg-(--bg-elevated) transition duration-200',
          accent && 'group-hover:border-(--skill-accent)/40 group-hover:bg-(--skill-accent)/10',
        )}
      >
        {skill.icon ? (
          <SkillIcon
            icon={skill.icon}
            className={cn(
              'h-3.5 w-3.5 text-(--text-muted) transition duration-200',
              accent && 'group-hover:text-(--skill-accent)',
            )}
          />
        ) : (
          <span className="font-mono text-[9px] font-medium text-(--text-muted)">
            {skill.name.slice(0, 2)}
          </span>
        )}
      </span>
      <span className="truncate font-mono text-[10px] leading-none text-(--text-muted) transition group-hover:text-(--text-primary)">
        {skill.name}
      </span>
    </li>
  )
}

function CategoryCard({
  category,
  skills,
  t,
}: {
  category: CategoryId
  skills: SkillEntry[]
  t: (key: string, options?: Record<string, unknown>) => string
}) {
  const meta = categoryMeta[category]
  const CategoryIcon = meta.icon

  return (
    <AnimatedItem className={cn('min-w-0', meta.spanClass)}>
      <GlassCard className={cn(surfaceCardHover, 'flex h-full flex-col p-4 sm:p-5')}>
        <p className="font-mono text-[11px] tracking-wider text-(--text-muted)">
          {skills.length} {skills.length === 1 ? t('skills.item') : t('skills.items')}
        </p>

        <div className="mt-3 flex items-start gap-3">
          <IconBox className="shrink-0 rounded-full bg-(--bg-elevated)">
            <CategoryIcon className="h-4 w-4" aria-hidden />
          </IconBox>
          <div className="min-w-0">
            <h3 className="font-display text-base font-semibold text-(--text-primary) sm:text-lg">
              {t(`skills.${category}`)}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-(--text-muted)">{t(meta.descKey)}</p>
          </div>
        </div>

        <ul className="mt-4 flex list-none flex-wrap gap-1.5 sm:gap-2">
          {skills.map((skill) => (
            <SkillChip key={skill.name} skill={skill} />
          ))}
        </ul>
      </GlassCard>
    </AnimatedItem>
  )
}

export function Skills() {
  const { t } = useTranslation()
  const groups = groupSkills()
  const total = siteContent.skills.length

  return (
    <SectionPage id="skills" titleKey="sections.skills">
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <p className="max-w-2xl text-sm leading-relaxed text-(--text-muted) sm:text-base">
            {t('skills.subtitle')}
          </p>
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-(--text-muted)">
            {t('skills.total', { count: total })}
          </p>
        </div>

        <AnimatedInView
          viewportMargin="-60px"
          className="grid gap-4 sm:gap-5 lg:grid-cols-2"
          stagger
        >
          {groups.map(({ category, skills }) => (
            <CategoryCard key={category} category={category} skills={skills} t={t} />
          ))}
        </AnimatedInView>
      </div>
    </SectionPage>
  )
}
