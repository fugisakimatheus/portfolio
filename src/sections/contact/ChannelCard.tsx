import { ArrowUpRight } from 'lucide-react'
import { AnimatedLink } from '../../components/motion/AnimatedInView'
import { cn } from '../../lib/cn'

export type ContactChannel = {
  id: string
  label: string
  href: string
  display: string
  external?: boolean
  icon: React.ReactNode
}

type Props = {
  channel: ContactChannel
}

export function ChannelCard({ channel }: Props) {
  return (
    <AnimatedLink
      href={channel.href}
      target={channel.external ? '_blank' : undefined}
      rel={channel.external ? 'noopener noreferrer' : undefined}
      className={cn(
        'group flex min-h-15 w-full items-center gap-3 rounded-2xl border border-(--border-subtle)',
        'bg-(--bg-elevated) p-3.5 transition duration-200 sm:gap-4 sm:p-4',
        'hover:border-(--text-muted)/30 hover:bg-white/2',
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-(--border-subtle) bg-(--bg-base) text-(--text-muted)">
        {channel.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-(--text-muted)">
          {channel.label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-medium text-(--text-primary)">
          {channel.display}
        </span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-(--text-muted) opacity-40 transition group-hover:opacity-80" />
    </AnimatedLink>
  )
}
