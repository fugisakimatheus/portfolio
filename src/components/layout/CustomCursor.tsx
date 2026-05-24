import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, label[for], [data-cursor="pointer"]'

const DOT_LERP = 0.45
const RING_LERP = 0.12
const SIZE_LERP = 0.16
const RING_REST = 32
const RING_HOVER = 52
const RING_PRESS = 22

export function CustomCursor() {
  const reduced = useReducedMotion()
  const coarsePointer = useRef(
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
  )

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const target = useRef({ x: 0, y: 0 })
  const dot = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const ringSize = useRef(RING_REST)
  const hovering = useRef(false)
  const pressing = useRef(false)
  const visible = useRef(false)
  const ringHoverClass = useRef(false)

  useEffect(() => {
    if (reduced || coarsePointer.current) return

    const root = document.documentElement
    root.classList.add('custom-cursor')

    const goalRingSize = () => {
      if (pressing.current) return RING_PRESS
      if (hovering.current) return RING_HOVER
      return RING_REST
    }

    const syncRingState = () => {
      const ringEl = ringRef.current
      if (!ringEl) return

      const isHover = hovering.current
      if (isHover !== ringHoverClass.current) {
        ringHoverClass.current = isHover
        ringEl.classList.toggle('custom-cursor-ring--hover', isHover)
      }
      ringEl.classList.toggle('custom-cursor-ring--press', pressing.current)
    }

    const loop = () => {
      const { x: tx, y: ty } = target.current

      dot.current.x += (tx - dot.current.x) * DOT_LERP
      dot.current.y += (ty - dot.current.y) * DOT_LERP
      ring.current.x += (tx - ring.current.x) * RING_LERP
      ring.current.y += (ty - ring.current.y) * RING_LERP

      const goal = goalRingSize()
      ringSize.current += (goal - ringSize.current) * SIZE_LERP

      const opacity = visible.current ? '1' : '0'
      const dotScale = pressing.current ? 0.85 : 1

      const dotEl = dotRef.current
      if (dotEl) {
        dotEl.style.opacity = opacity
        dotEl.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%) scale(${dotScale})`
      }

      const ringEl = ringRef.current
      if (ringEl) {
        const size = ringSize.current
        ringEl.style.opacity = opacity
        ringEl.style.width = `${size}px`
        ringEl.style.height = `${size}px`
        ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`
      }

      syncRingState()
    }

    let raf = 0
    const tick = () => {
      loop()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }

      if (!visible.current) {
        visible.current = true
        dot.current = { x: e.clientX, y: e.clientY }
        ring.current = { x: e.clientX, y: e.clientY }
      }
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target
      if (!(el instanceof Element)) return
      hovering.current = Boolean(el.closest(INTERACTIVE_SELECTOR))
    }

    const onDown = () => {
      pressing.current = true
    }

    const onUp = () => {
      pressing.current = false
    }

    const onWindowLeave = () => {
      visible.current = false
    }

    const onWindowEnter = () => {
      if (target.current.x || target.current.y) visible.current = true
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onWindowLeave)
    document.documentElement.addEventListener('mouseenter', onWindowEnter)

    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onWindowLeave)
      document.documentElement.removeEventListener('mouseenter', onWindowEnter)
    }
  }, [reduced])

  if (reduced || coarsePointer.current) {
    return null
  }

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden />
    </>
  )
}
