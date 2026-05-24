import type { ProjectEntry } from '../content/types'

export type BentoSlot = 'hero' | 'wide' | 'compact'

export type BentoPlacement = {
  project: ProjectEntry
  slot: BentoSlot
}

const DEFAULT_ASPECT = 16 / 10
const WIDE_ASPECT_THRESHOLD = 1.35

export function getProjectAspect(project: ProjectEntry): number {
  return project.imageAspect ?? DEFAULT_ASPECT
}

/** Assigns bento cells: most portrait → hero, widest landscape → wide, rest → compact. */
export function resolveBentoLayout(projects: ProjectEntry[]): BentoPlacement[] {
  if (projects.length === 0) return []
  if (projects.length === 1) {
    return [{ project: projects[0], slot: 'hero' }]
  }

  const byAspectAsc = [...projects].sort((a, b) => getProjectAspect(a) - getProjectAspect(b))
  const byAspectDesc = [...byAspectAsc].reverse()

  const hero = byAspectAsc[0]
  const wideCandidate = byAspectDesc.find((p) => p.id !== hero.id) ?? hero

  const wide =
    getProjectAspect(wideCandidate) >= WIDE_ASPECT_THRESHOLD &&
    getProjectAspect(wideCandidate) > getProjectAspect(hero)
      ? wideCandidate
      : (byAspectDesc.find((p) => p.id !== hero.id) ?? wideCandidate)

  const placements: BentoPlacement[] = [
    { project: hero, slot: 'hero' },
    { project: wide, slot: 'wide' },
  ]

  for (const project of projects) {
    if (project.id === hero.id || project.id === wide.id) continue
    placements.push({ project, slot: 'compact' })
  }

  return placements
}
