import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../../lib/cn'

type Props = {
  text: string
}

export function CareerDescription({ text }: Props) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)
  const descriptionId = useId()

  useEffect(() => {
    if (expanded) return

    const el = ref.current
    if (!el) return

    const checkOverflow = () => {
      setOverflows(el.scrollHeight > el.clientHeight + 1)
    }

    checkOverflow()

    const observer = new ResizeObserver(checkOverflow)
    observer.observe(el)
    return () => observer.disconnect()
  }, [expanded])

  const showToggle = overflows || expanded

  return (
    <div className="mt-3 min-w-0">
      <p
        ref={ref}
        id={descriptionId}
        className={cn('text-sm leading-relaxed text-(--text-muted)', !expanded && 'line-clamp-3')}
      >
        {text}
      </p>
      {showToggle ? (
        <button
          type="button"
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-(--text-muted) transition duration-200 hover:text-(--text-primary)"
          aria-expanded={expanded}
          aria-controls={descriptionId}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? t('career.showLess') : t('career.showMore')}
        </button>
      ) : null}
    </div>
  )
}
