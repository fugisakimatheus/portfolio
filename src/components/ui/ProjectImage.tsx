import { useState } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  src: string
  alt: string
  fallbackInitials: string
  className?: string
}

export function ProjectImage({ src, alt, fallbackInitials, className }: Props) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={cn(
          'flex aspect-video w-full items-center justify-center rounded-xl bg-[var(--bg-elevated)] text-2xl font-bold text-[var(--accent)]',
          className,
        )}
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
      className={cn('aspect-video w-full rounded-xl object-cover', className)}
    />
  )
}
