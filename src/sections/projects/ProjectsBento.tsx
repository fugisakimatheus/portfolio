import { AnimatedInView, AnimatedItem } from '../../components/motion/AnimatedInView'
import type { ProjectEntry } from '../../content/types'
import { cn } from '../../lib/cn'
import { bentoCellClass, resolveBentoLayout } from '../../lib/projectLayout'
import { ProjectCard } from './ProjectCard'

type Props = {
  projects: ProjectEntry[]
}

export function ProjectsBento({ projects }: Props) {
  const placements = resolveBentoLayout(projects)
  let compactIndex = 0

  return (
    <AnimatedInView
      className={cn('grid grid-cols-4 grid-rows-2 items-stretch gap-5', 'auto-rows-fr min-h-120')}
      stagger
    >
      {placements.map(({ project, slot }) => {
        const cardVariant = slot === 'hero' ? 'hero' : 'standard'
        const cellClass =
          slot === 'compact' ? bentoCellClass(slot, compactIndex++) : bentoCellClass(slot, 0)

        return (
          <AnimatedItem key={project.id} className={cellClass}>
            <ProjectCard project={project} variant={cardVariant} />
          </AnimatedItem>
        )
      })}
    </AnimatedInView>
  )
}
