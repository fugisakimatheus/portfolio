import { ArrowUpRight, ExternalLink, GitBranch } from 'lucide-react'
import type { ProjectEntry } from '../../content/types'
import { cn } from '../../lib/cn'

export function ProjectLink({
  href,
  label,
  icon: Icon,
  variant = 'primary',
  fullWidth = false,
}: {
  href: string
  label: string
  icon: typeof GitBranch
  variant?: 'primary' | 'ghost'
  fullWidth?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition duration-200',
        'active:scale-[0.98]',
        fullWidth && 'w-full flex-1',
        variant === 'primary'
          ? 'bg-(--text-primary) text-(--bg-base) hover:bg-zinc-200'
          : 'border border-(--border-subtle) bg-transparent text-(--text-primary) hover:border-(--text-muted) hover:bg-white/4',
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {label}
      <ArrowUpRight className="h-3 w-3 shrink-0 opacity-60" />
    </a>
  )
}

export function CardActions({
  project,
  t,
  className,
  stacked = false,
}: {
  project: ProjectEntry
  t: (key: string) => string
  className?: string
  stacked?: boolean
}) {
  if (!project.liveUrl && !project.repoUrl) return null

  return (
    <div className={cn('flex gap-2', stacked ? 'flex-col sm:flex-row' : 'flex-wrap', className)}>
      {project.liveUrl && (
        <ProjectLink
          href={project.liveUrl}
          label={t('projects.live')}
          icon={ExternalLink}
          variant="primary"
          fullWidth={stacked}
        />
      )}
      {project.repoUrl && (
        <ProjectLink
          href={project.repoUrl}
          label={t('projects.repo')}
          icon={GitBranch}
          variant="ghost"
          fullWidth={stacked}
        />
      )}
    </div>
  )
}
