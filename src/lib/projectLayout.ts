import type { ProjectEntry } from '../content/types'

export type BentoSlot = 'hero' | 'wide' | 'compact'

export type BentoPlacement = {
  project: ProjectEntry
  slot: BentoSlot
}

const DEFAULT_ASPECT = 16 / 10
const WIDE_ASPECT_THRESHOLD = 1.35
const SQUARE_ASPECT_MAX = 1.15

export function getProjectAspect(project: ProjectEntry): number {
  return project.imageAspect ?? DEFAULT_ASPECT
}

/** Assigns bento cells from image proportions (landscape → wide, square → hero). */
export function resolveBentoLayout(projects: ProjectEntry[]): BentoPlacement[] {
  if (projects.length === 0) return []

  const sorted = [...projects].sort((a, b) => getProjectAspect(b) - getProjectAspect(a))
  const widest = sorted[0]

  if (getProjectAspect(widest) >= WIDE_ASPECT_THRESHOLD) {
    const hero =
      projects.find((p) => getProjectAspect(p) <= SQUARE_ASPECT_MAX && p.id !== widest.id) ??
      projects.find((p) => p.id !== widest.id) ??
      projects[0]

    const placements: BentoPlacement[] = [
      { project: hero, slot: 'hero' },
      { project: widest, slot: 'wide' },
    ]

    for (const project of projects) {
      if (project.id === hero.id || project.id === widest.id) continue
      placements.push({ project, slot: 'compact' })
    }

    return placements
  }

  const hero = projects[0]
  const wide = sorted.find((p) => p.id !== hero.id) ?? sorted[1] ?? hero

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

export function bentoCellClass(slot: BentoSlot, compactIndex: number): string {
  const base = 'flex min-h-0 min-w-0 overflow-hidden'

  switch (slot) {
    case 'hero':
      return `${base} col-span-2 row-span-2 col-start-1 row-start-1`
    case 'wide':
      return `${base} col-span-2 row-span-1 col-start-3 row-start-1`
    case 'compact':
      return compactIndex === 0
        ? `${base} col-start-3 row-start-2`
        : `${base} col-start-4 row-start-2`
  }
}
