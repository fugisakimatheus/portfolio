import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Briefcase, Building2, GraduationCap } from 'lucide-react'
import { siteContent } from '../content/site'
import { getLocalized } from '../lib/localized'
import type { CareerType } from '../content/types'
import { Section } from '../components/ui/Section'
import { MotionSection } from '../components/motion/MotionSection'
import { GlassCard } from '../components/ui/GlassCard'
import { Tag } from '../components/ui/Tag'
import { staggerContainer, fadeUp } from '../components/motion/variants'
import { useReducedMotion } from '../hooks/useReducedMotion'

const icons: Record<CareerType, typeof Briefcase> = {
  job: Briefcase,
  freelance: Building2,
  internship: GraduationCap,
}

export function Career() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language.startsWith('pt') ? 'pt' : 'en'
  const reduced = useReducedMotion()
  const { career } = siteContent

  return (
    <MotionSection>
      <Section id="career" title={t('sections.career')}>
        <div className="relative mx-auto max-w-3xl">
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent md:left-1/2 md:-translate-x-px"
          />
          <motion.ol
            variants={reduced ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-12"
          >
            {career.map((entry, index) => {
              const Icon = icons[entry.type]
              const isLeft = index % 2 === 0
              return (
                <motion.li
                  key={entry.id}
                  variants={reduced ? undefined : fadeUp}
                  className={`relative flex md:w-1/2 ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12 md:translate-x-full'}`}
                >
                  <span className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--bg-base)] shadow-[0_0_12px_var(--accent-glow)] md:left-auto md:right-0 md:translate-x-1/2">
                    <Icon className="h-4 w-4 text-[var(--accent)]" />
                  </span>
                  <GlassCard className="ml-12 md:ml-0">
                    <p className="font-mono text-xs text-[var(--accent-secondary)]">
                      {getLocalized(entry.period, locale)}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                      {entry.company}
                    </h3>
                    <p className="text-[var(--text-muted)]">
                      {getLocalized(entry.role, locale)} · {t(`career.${entry.type}`)}
                    </p>
                    {entry.description && (
                      <p className="mt-3 text-sm text-[var(--text-muted)]">
                        {getLocalized(entry.description, locale)}
                      </p>
                    )}
                    {entry.technologies && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {entry.technologies.map((tech) => (
                          <Tag key={tech}>{tech}</Tag>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </motion.li>
              )
            })}
          </motion.ol>
        </div>
      </Section>
    </MotionSection>
  )
}
