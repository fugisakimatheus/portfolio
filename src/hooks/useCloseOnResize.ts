import { useEffect } from 'react'

/** Invokes `onClose` when the window is resized while `active` is true. */
export function useCloseOnResize(active: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!active) return
    window.addEventListener('resize', onClose)
    return () => window.removeEventListener('resize', onClose)
  }, [active, onClose])
}
