import { describe, expect, it } from 'vitest'
import type { ProjectEntry } from '../content/types'
import { getProjectAspect, resolveBentoLayout } from './projectLayout'

function mockProject(
  id: string,
  imageAspect?: number,
  overrides: Partial<ProjectEntry> = {},
): ProjectEntry {
  return {
    id,
    title: { pt: id, en: id },
    description: { pt: id, en: id },
    image: `/projects/${id}.png`,
    imageAspect,
    tags: ['React'],
    featured: true,
    ...overrides,
  }
}

describe('resolveBentoLayout', () => {
  it('places landscape screenshots in the wide slot', () => {
    const projects = [
      mockProject('energy-dashboard', 1686 / 959),
      mockProject('code-hero', 16 / 10),
      mockProject('currency-converter', 995 / 953),
      mockProject('strategy', 16 / 10),
    ]

    const slots = Object.fromEntries(
      resolveBentoLayout(projects).map((p) => [p.project.id, p.slot]),
    )

    expect(slots['energy-dashboard']).toBe('wide')
    expect(slots['currency-converter']).toBe('hero')
  })

  it('falls back to first project as hero when none are wide', () => {
    const projects = [mockProject('a', 1.1), mockProject('b', 1.05), mockProject('c', 1.0)]

    const placements = resolveBentoLayout(projects)
    expect(placements[0].slot).toBe('hero')
    expect(placements[0].project.id).toBe('a')
  })
})

describe('getProjectAspect', () => {
  it('uses default when imageAspect is omitted', () => {
    expect(getProjectAspect(mockProject('x'))).toBe(16 / 10)
  })
})
