import { cn } from '../../lib/cn'
import {
  layoutInner,
  layoutOuter,
  scrollMtSection,
  sectionContentMt,
  sectionPy,
  sectionTitle,
} from '../../lib/layout'

type Props = {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, title, children, className }: Props) {
  return (
    <section id={id} className={cn(scrollMtSection, sectionPy, layoutOuter, className)}>
      <div className={layoutInner}>
        <div>
          <h2 className={sectionTitle}>{title}</h2>
          <div
            aria-hidden
            className="mt-4 h-px w-10 bg-linear-to-r from-(--text-muted)/50 to-transparent sm:w-14"
          />
        </div>
        <div className={sectionContentMt}>{children}</div>
      </div>
    </section>
  )
}
