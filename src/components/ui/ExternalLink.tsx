import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/cn'

type Props = {
  href: string
  children: React.ReactNode
  className?: string
}

export function ExternalLink({ href, children, className }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('transition hover:text-(--text-primary)', className)}
    >
      {children}
      <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" aria-hidden />
    </a>
  )
}
