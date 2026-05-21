import { cn } from '../../lib/cn'

type Props = {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, title, children, className }: Props) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-20 px-6 py-24 md:px-12 lg:px-24', className)}
    >
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
        {title}
      </h2>
      <div className="mt-12">{children}</div>
    </section>
  )
}
