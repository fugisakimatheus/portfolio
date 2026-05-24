import { useEffect, useState } from 'react'

const SECTION_IDS = ['about', 'career', 'projects', 'skills', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export function useScrollSpy(): SectionId {
  const [active, setActive] = useState<SectionId>('about')

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return

        const best = visible.reduce((current, next) =>
          next.intersectionRatio > current.intersectionRatio ? next : current,
        )
        const id = best.target.id
        if (SECTION_IDS.includes(id as SectionId)) {
          setActive(id as SectionId)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return active
}
