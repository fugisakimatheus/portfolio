import { useEffect, useState } from 'react'

const DEFAULT_ASPECT = 16 / 10

export function useImageAspectRatio(src: string | undefined, fallback = DEFAULT_ASPECT) {
  const [aspect, setAspect] = useState(fallback)

  useEffect(() => {
    if (!src) {
      setAspect(fallback)
      return
    }

    let cancelled = false
    const img = new Image()

    img.onload = () => {
      if (cancelled || !img.naturalWidth || !img.naturalHeight) return
      setAspect(img.naturalWidth / img.naturalHeight)
    }

    img.onerror = () => {
      if (!cancelled) setAspect(fallback)
    }

    img.src = src

    return () => {
      cancelled = true
    }
  }, [src, fallback])

  return aspect
}
