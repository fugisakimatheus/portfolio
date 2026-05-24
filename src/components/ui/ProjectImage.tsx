import { useState } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  src: string
  alt: string
  fallbackInitials: string
  className?: string
  /** Centered placeholder vs subtle corner watermark */
  fallback?: 'cover' | 'watermark'
  objectPosition?: string
}

export function ProjectImage({
  src,
  alt,
  fallbackInitials,
  className,
  fallback = 'cover',
  objectPosition = 'center',
}: Props) {
  const [error, setError] = useState(false)

  if (error) {
    if (fallback === 'watermark') {
      return (
        <div
          className={cn(
            'absolute inset-0 bg-linear-to-br from-(--bg-elevated) via-(--bg-base) to-(--bg-base)',
            className,
          )}
          aria-hidden
        >
          <span className="absolute bottom-3 right-4 font-display text-5xl font-semibold text-(--text-muted)/15 sm:text-6xl">
            {fallbackInitials}
          </span>
        </div>
      )
    }

    return (
      <div
        className={cn(
          'flex h-full w-full items-center justify-center bg-linear-to-br from-(--bg-elevated) via-(--bg-base) to-(--bg-base)',
          'font-display text-2xl font-semibold text-(--text-muted) sm:text-3xl',
          className,
        )}
        aria-hidden
      >
        {fallbackInitials}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={cn('h-full w-full object-cover', className)}
      style={{ objectPosition }}
    />
  )
}
