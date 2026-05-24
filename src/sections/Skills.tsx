import { Code2, FlaskConical, Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimatedInView, AnimatedItem } from '../components/motion/AnimatedInView'
import { GlassCard } from '../components/ui/GlassCard'
import { IconBox } from '../components/ui/IconBox'
import { SectionPage } from '../components/ui/SectionPage'
import { siteContent } from '../content/site'
import type { SkillEntry } from '../content/types'
import { cn } from '../lib/cn'
import { SkillIcon } from '../lib/skillIcons'
import { surfaceCardHover } from '../lib/surface'

const CATEGORIES = ['frontend', 'tools', 'testing'] as const

type CategoryId = (typeof CATEGORIES)[number]

const categoryMeta: Record<CategoryId, { icon: typeof Code2 }> = {
  frontend: { icon: Code2 },
  tools: { icon: Wrench },
  testing: { icon: FlaskConical },
}

function groupSkills() {
  return CATEGORIES.map((category) => ({
    category,
    skills: siteContent.skills.filter((s) => s.category === category),
  })).filter((g) => g.skills.length > 0)
}

function SkillChip({ skill }: { skill: SkillEntry }) {
  return (
    <li
      className={cn(
        'inline-flex min-h-10 items-center gap-2.5 rounded-full border border-(--border-subtle)',
        'bg-(--bg-base) py-1.5 pl-1.5 pr-4 transition duration-200 sm:min-h-11 sm:pl-2 sm:pr-4',
        'hover:border-(--text-muted)/40',
      )}
    >
      <IconBox size="sm" className="bg-(--bg-elevated) sm:h-9 sm:w-9">
        {skill.icon ? (
          <SkillIcon
            icon={skill.icon}
            className="h-4 w-4 text-(--text-primary) sm:h-4.5 sm:w-4.5"
          />
        ) : (
          <span className="font-mono text-[10px] font-medium text-(--text-muted)">
            {skill.name.slice(0, 2)}
          </span>
        )}
      </IconBox>
      <span className="text-sm font-medium text-(--text-primary)">{skill.name}</span>
    </li>
  )
}

function CategoryRow({
  category,
  skills,
  t,
  isLast,
}: {
  category: CategoryId
  skills: SkillEntry[]
  t: (key: string) => string
  isLast: boolean
}) {
  const CategoryIcon = categoryMeta[category].icon

  return (
    <AnimatedItem
      className={cn(
        'flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:gap-6 sm:py-6',
        !isLast && 'border-b border-(--border-subtle)',
      )}
    >
      <div className="flex shrink-0 items-center gap-3 sm:w-38 sm:flex-col sm:items-start sm:gap-2 md:w-40">
        <IconBox>
          <CategoryIcon className="h-4 w-4" />
        </IconBox>
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold text-(--text-primary) sm:text-lg">
            {t(`skills.${category}`)}
          </h3>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-(--text-muted)">
            {skills.length} {skills.length === 1 ? t('skills.item') : t('skills.items')}
          </p>
        </div>
      </div>

      <ul className="flex min-w-0 flex-1 list-none flex-wrap gap-2 sm:gap-2.5">
        {skills.map((skill) => (
          <SkillChip key={skill.name} skill={skill} />
        ))}
      </ul>
    </AnimatedItem>
  )
}

export function Skills() {
  const { t } = useTranslation()
  const groups = groupSkills()

  return (
    <SectionPage id="skills" titleKey="sections.skills">
      <GlassCard className={cn(surfaceCardHover, 'p-4 sm:p-6 md:p-8')}>
        <AnimatedInView viewportMargin="-60px" stagger>
          {groups.map(({ category, skills }, index) => (
            <CategoryRow
              key={category}
              category={category}
              skills={skills}
              t={t}
              isLast={index === groups.length - 1}
            />
          ))}
        </AnimatedInView>
      </GlassCard>
    </SectionPage>
  )
}
