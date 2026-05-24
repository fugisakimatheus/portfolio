import { useEffect, useState } from 'react'

/** True when `window.scrollY` exceeds `threshold` (px). */
export function useScrollThreshold(threshold = 32): boolean {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const onScroll = () => setPassed(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return passed
}
