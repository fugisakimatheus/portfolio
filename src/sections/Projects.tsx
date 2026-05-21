import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ExternalLink, GitBranch } from 'lucide-react'
import { siteContent } from '../content/site'
import { getLocalized } from '../lib/localized'
import { Section } from '../components/ui/Section'
import { MotionSection } from '../components/motion/MotionSection'
import { GlassCard } from '../components/ui/GlassCard'
import { ProjectImage } from '../components/ui/ProjectImage'
import { Tag } from '../components/ui/Tag'
import { staggerContainer, fadeUp } from '../components/motion/variants'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Projects() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language.startsWith('pt') ? 'pt' : 'en'
  const reduced = useReducedMotion()
  const featured = siteContent.projects.filter((p) => p.featured)

  return (
    <MotionSection>
      <Section id="projects" title={t('sections.projects')}>
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((project) => {
            const title = getLocalized(project.title, locale)
            const initials = title.slice(0, 2).toUpperCase()
            return (
              <motion.div key={project.id} variants={reduced ? undefined : fadeUp}>
                <GlassCard className="group overflow-hidden p-0">
                  <div className="relative overflow-hidden">
                    <ProjectImage
                      src={project.image}
                      alt={title}
                      fallbackInitials={initials}
                      className="rounded-none transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition group-hover:opacity-100">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-white"
                        >
                          <ExternalLink className="h-4 w-4" /> {t('projects.live')}
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-white"
                        >
                          <GitBranch className="h-4 w-4" /> {t('projects.repo')}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      {getLocalized(project.description, locale)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>
    </MotionSection>
  )
}
