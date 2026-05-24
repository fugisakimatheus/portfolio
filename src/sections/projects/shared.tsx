import { ExternalLink, GitBranch } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ProjectEntry } from '../../content/types'
import { cn } from '../../lib/cn'

const trayClass = cn(
  'flex w-full flex-nowrap items-stretch gap-1',
  'rounded-xl border border-(--border-subtle)/60 bg-(--bg-base)/50 p-1',
)

const linkBase = cn(
  'group inline-flex min-h-8 min-w-0 flex-1 basis-0 items-center justify-center gap-1.5',
  'rounded-[10px] px-2.5 py-1.5',
  'text-[11px] font-medium leading-none tracking-tight',
  'transition-[color,background-color,border-color,box-shadow,transform] duration-200',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/25',
  'active:scale-[0.98]',
)

function ProjectLinkIcon({ children, tone }: { children: ReactNode; tone: 'live' | 'repo' }) {
  return (
    <span
      className={cn(
        'flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border',
        tone === 'live'
          ? 'border-white/12 bg-white/10 text-(--text-primary)'
          : 'border-(--border-subtle)/80 bg-(--bg-elevated)/60 text-(--text-muted) group-hover:border-(--text-muted)/40 group-hover:text-(--text-primary)',
      )}
      aria-hidden
    >
      {children}
    </span>
  )
}

export function ProjectLink({
  href,
  label,
  icon: Icon,
  variant = 'live',
}: {
  href: string
  label: string
  icon: typeof GitBranch
  variant?: 'live' | 'repo'
}) {
  const isLive = variant === 'live'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        linkBase,
        isLive
          ? 'border border-white/8 bg-white/10 text-(--text-primary) hover:bg-white/13'
          : cn(
              'border border-(--border-subtle)/70 bg-white/3 text-(--text-muted)',
              'hover:border-(--text-muted)/35 hover:bg-white/6 hover:text-(--text-primary)',
            ),
      )}
    >
      <ProjectLinkIcon tone={variant}>
        <Icon className="h-3 w-3" strokeWidth={2} />
      </ProjectLinkIcon>
      <span className="truncate">{label}</span>
    </a>
  )
}

export function CardActions({
  project,
  t,
  className,
}: {
  project: ProjectEntry
  t: (key: string) => string
  className?: string
}) {
  if (!project.liveUrl && !project.repoUrl) return null

  return (
    <div className={cn(trayClass, className)}>
      {project.liveUrl && (
        <ProjectLink
          href={project.liveUrl}
          label={t('projects.live')}
          icon={ExternalLink}
          variant="live"
        />
      )}
      {project.repoUrl && (
        <ProjectLink
          href={project.repoUrl}
          label={t('projects.repo')}
          icon={GitBranch}
          variant="repo"
        />
      )}
    </div>
  )
}
