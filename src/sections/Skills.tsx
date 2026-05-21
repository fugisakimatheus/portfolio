import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { siteContent } from '../content/site'
import { Section } from '../components/ui/Section'
import { MotionSection } from '../components/motion/MotionSection'
import { Tag } from '../components/ui/Tag'
import { staggerContainer, fadeUp } from '../components/motion/variants'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Skills() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()

  return (
    <MotionSection>
      <Section id="skills" title={t('sections.skills')}>
        <motion.div
          className="flex flex-wrap gap-3"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {siteContent.skills.map((skill) => (
            <motion.div key={skill.name} variants={reduced ? undefined : fadeUp}>
              <Tag className="text-sm transition hover:border-[var(--accent)] hover:shadow-[0_0_12px_var(--accent-glow)]">
                {skill.name}
              </Tag>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </MotionSection>
  )
}
