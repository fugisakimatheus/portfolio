import { useTranslation } from 'react-i18next'
import { ProjectImage } from '../../components/ui/ProjectImage'
import { Tag } from '../../components/ui/Tag'
import type { ProjectEntry } from '../../content/types'
import { useImageAspectRatio } from '../../hooks/useImageAspectRatio'
import { useLocale } from '../../hooks/useLocale'
import { cn } from '../../lib/cn'
import { getProjectCopy } from '../../lib/project'
import { getProjectAspect } from '../../lib/projectLayout'
import { badgeMuted, surfaceCard, surfaceCardHover } from '../../lib/surface'
import { CardActions } from './shared'

export type ProjectCardVariant = 'hero' | 'standard' | 'mobile-featured'

type Props = {
  project: ProjectEntry
  variant: ProjectCardVariant
  className?: string
}

const projectCard = cn(surfaceCard, surfaceCardHover, 'overflow-hidden')

const titleStyles: Record<ProjectCardVariant, string> = {
  hero: 'text-xl',
  standard: 'text-base',
  'mobile-featured': 'text-xl',
}

function ProjectImageHeader({
  project,
  initials,
  variant,
  featuredLabel,
  primaryTag,
  aspect,
}: {
  project: ProjectEntry
  initials: string
  variant: ProjectCardVariant
  featuredLabel?: string
  primaryTag: string
  aspect: number
}) {
  const isHero = variant === 'hero'
  const isMobileFeatured = variant === 'mobile-featured'
  const isWide = aspect >= 1.35

  const gradientClass = isHero
    ? 'bg-linear-to-b from-(--bg-base)/30 via-transparent to-(--bg-base)/90'
    : isMobileFeatured
      ? 'bg-linear-to-b from-(--bg-base)/25 via-transparent to-(--bg-base)/85'
      : 'bg-linear-to-t from-(--bg-base)/50 to-transparent'

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        isHero && 'min-h-48 flex-1',
        !isHero && 'shrink-0',
        isMobileFeatured && 'max-h-[min(52vh,28rem)] shrink-0',
        variant === 'standard' && 'max-h-36 min-h-0 shrink-0',
      )}
      style={isHero ? undefined : { aspectRatio: aspect }}
    >
      <ProjectImage
        src={project.image}
        alt=""
        fallbackInitials={initials}
        fallback={isHero || isMobileFeatured ? 'watermark' : 'cover'}
        objectPosition={isWide ? 'top' : 'center'}
        className={cn(
          'h-full w-full',
          isHero && 'absolute inset-0',
          !isMobileFeatured && 'transition duration-500 group-hover:scale-[1.03]',
        )}
      />
      <div aria-hidden className={cn('absolute inset-0', gradientClass)} />

      {featuredLabel ? (
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-3 sm:p-3.5">
          <span className={badgeMuted}>{featuredLabel}</span>
          <span className={cn(badgeMuted, 'shrink-0')}>{primaryTag}</span>
        </div>
      ) : (
        <span className={cn(badgeMuted, 'absolute right-2.5 top-2.5')}>{primaryTag}</span>
      )}
    </div>
  )
}

function ProjectCardBody({
  title,
  description,
  tags,
  variant,
  project,
  t,
}: {
  title: string
  description: string
  tags: string[]
  variant: ProjectCardVariant
  project: ProjectEntry
  t: (key: string) => string
}) {
  const isHero = variant === 'hero'
  const isMobileFeatured = variant === 'mobile-featured'

  const isStandard = variant === 'standard'

  return (
    <div
      className={cn(
        'flex flex-col',
        isHero && 'shrink-0 border-t border-(--border-subtle) bg-(--bg-elevated) p-4',
        isStandard && 'min-h-34 flex-1 p-4',
        isMobileFeatured && 'shrink-0 border-t border-(--border-subtle) p-4',
      )}
    >
      <div className={cn('flex flex-col', isStandard && 'min-h-0 flex-1')}>
        <h3
          className={cn(
            'font-display font-semibold leading-tight text-(--text-primary)',
            titleStyles[variant],
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'text-sm leading-relaxed text-(--text-muted)',
            (isHero || isStandard) && 'mt-1.5 line-clamp-2',
            isMobileFeatured && 'mt-2',
          )}
        >
          {description}
        </p>
        <div
          className={cn(
            'flex flex-wrap gap-1',
            isHero && 'mt-2',
            isStandard && 'mt-2.5',
            isMobileFeatured && 'mt-3 gap-1.5',
          )}
        >
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      <CardActions
        project={project}
        t={t}
        stacked={isMobileFeatured}
        className={cn(
          'mt-auto shrink-0 border-t border-(--border-subtle) pt-3',
          isHero && 'mt-3',
          isStandard && 'mt-3',
          isMobileFeatured && 'mt-4 pt-4',
        )}
      />
    </div>
  )
}

export function ProjectCard({ project, variant, className }: Props) {
  const { t } = useTranslation()
  const locale = useLocale()
  const { title, description, initials } = getProjectCopy(project, locale)
  const isHero = variant === 'hero'

  const staticAspect = project.imageAspect
  const loadedAspect = useImageAspectRatio(
    staticAspect ? undefined : project.image,
    getProjectAspect(project),
  )
  const aspect = staticAspect ?? loadedAspect

  return (
    <article
      className={cn(
        projectCard,
        (isHero || variant === 'standard') && 'group flex h-full max-h-full min-h-0 flex-col',
        className,
      )}
    >
      <ProjectImageHeader
        project={project}
        initials={initials}
        variant={variant}
        featuredLabel={project.featured ? t('projects.featured') : undefined}
        primaryTag={project.tags[0]}
        aspect={aspect}
      />
      <ProjectCardBody
        title={title}
        description={description}
        tags={project.tags}
        variant={variant}
        project={project}
        t={t}
      />
    </article>
  )
}
