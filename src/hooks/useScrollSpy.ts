import { useEffect, useState } from 'react'

const SECTION_IDS = ['about', 'career', 'projects', 'skills', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export function useScrollSpy(): SectionId {
  const [active, setActive] = useState<SectionId>('about')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return active
}
