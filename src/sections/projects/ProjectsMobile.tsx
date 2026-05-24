import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimatedInView, AnimatedItem, AnimatedLink } from '../../components/motion/AnimatedInView'
import { ProjectImage } from '../../components/ui/ProjectImage'
import { Tag } from '../../components/ui/Tag'
import type { ProjectEntry } from '../../content/types'
import { useImageAspectRatio } from '../../hooks/useImageAspectRatio'
import { useLocale } from '../../hooks/useLocale'
import { cn } from '../../lib/cn'
import { getProjectCopy } from '../../lib/project'
import { getProjectAspect } from '../../lib/projectLayout'
import { badgeMuted, surfaceCard } from '../../lib/surface'
import { ProjectCard } from './ProjectCard'

type Props = {
  projects: ProjectEntry[]
}

function MobileProjectRow({ project }: { project: ProjectEntry }) {
  const locale = useLocale()
  const { t } = useTranslation()
  const { title, description, initials } = getProjectCopy(project, locale)
  const href = project.liveUrl ?? project.repoUrl
  const linkLabel = project.liveUrl ? t('projects.live') : t('projects.repo')
  const staticAspect = project.imageAspect
  const loadedAspect = useImageAspectRatio(
    staticAspect ? undefined : project.image,
    getProjectAspect(project),
  )
  const aspect = staticAspect ?? loadedAspect

  const inner = (
    <>
      <div
        className="relative w-22 shrink-0 overflow-hidden rounded-xl border border-(--border-subtle)"
        style={{ aspectRatio: aspect }}
      >
        <ProjectImage
          src={project.image}
          alt=""
          fallbackInitials={initials}
          objectPosition={aspect >= 1.2 ? 'top' : 'center'}
          className="h-full w-full"
        />
        <span className={cn(badgeMuted, 'absolute right-1.5 top-1.5 px-1.5 py-0.5 text-[8px]')}>
          {project.tags[0]}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center py-3.5 pr-3.5">
        <h3 className="font-display text-base font-semibold leading-tight text-(--text-primary)">
          {title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-(--text-muted)">
          {description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} className="px-2 py-0.5 text-[9px]">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </>
  )

  const cardClass = cn(
    surfaceCard,
    'flex gap-3.5 overflow-hidden p-3.5 transition duration-200',
    'active:border-(--text-muted)/30 active:bg-white/3',
  )

  if (href) {
    return (
      <AnimatedLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} — ${linkLabel}`}
        className={cn(cardClass, 'group pl-3.5')}
      >
        {inner}
        <ArrowUpRight
          className="h-4.5 w-4.5 shrink-0 self-center text-(--text-muted) group-active:text-(--text-primary)"
          aria-hidden
        />
      </AnimatedLink>
    )
  }

  return (
    <AnimatedItem as="article" className={cardClass}>
      {inner}
    </AnimatedItem>
  )
}

export function ProjectsMobile({ projects }: Props) {
  const { t } = useTranslation()
  const [featured, ...rest] = projects

  return (
    <AnimatedInView className="flex flex-col gap-4" viewportMargin="-24px" stagger>
      {featured && (
        <AnimatedItem as="article">
          <ProjectCard project={featured} variant="mobile-featured" />
        </AnimatedItem>
      )}

      {rest.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--text-muted)">
            {t('projects.more')}
          </p>
          {rest.map((project) => (
            <MobileProjectRow key={project.id} project={project} />
          ))}
        </div>
      )}
    </AnimatedInView>
  )
}
