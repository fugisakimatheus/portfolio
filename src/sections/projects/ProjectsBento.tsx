import { AnimatedInView, AnimatedItem } from '../../components/motion/AnimatedInView'
import type { ProjectEntry } from '../../content/types'
import { cn } from '../../lib/cn'
import { resolveBentoLayout } from '../../lib/projectLayout'
import { ProjectCard } from './ProjectCard'

type Props = {
  projects: ProjectEntry[]
}

const bentoGrid = cn(
  'grid min-h-120 gap-4',
  'grid-cols-1 grid-rows-[auto_auto_auto]',
  'lg:grid-cols-2 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]',
)

export function ProjectsBento({ projects }: Props) {
  const placements = resolveBentoLayout(projects)
  const hero = placements.find((p) => p.slot === 'hero')
  const wide = placements.find((p) => p.slot === 'wide')
  const compacts = placements.filter((p) => p.slot === 'compact')

  return (
    <AnimatedInView className={bentoGrid} stagger>
      {hero ? (
        <AnimatedItem className="flex min-h-72 lg:row-span-2 lg:min-h-0">
          <ProjectCard project={hero.project} variant="hero" className="h-full w-full" />
        </AnimatedItem>
      ) : null}

      {wide ? (
        <AnimatedItem className="flex min-h-52 lg:min-h-0">
          <ProjectCard project={wide.project} variant="standard" className="h-full w-full" />
        </AnimatedItem>
      ) : null}

      {compacts.length > 0 ? (
        <AnimatedItem
          className={cn(
            'grid min-h-0 gap-4',
            compacts.length === 1 ? 'grid-cols-1' : 'grid-cols-2',
            'lg:col-start-2 lg:row-start-2',
          )}
        >
          {compacts.map(({ project }) => (
            <div key={project.id} className="flex min-h-52 lg:min-h-0">
              <ProjectCard project={project} variant="standard" className="h-full w-full" />
            </div>
          ))}
        </AnimatedItem>
      ) : null}
    </AnimatedInView>
  )
}
