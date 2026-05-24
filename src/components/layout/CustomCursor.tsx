import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CustomCursor() {
  const reduced = useReducedMotion()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [follower, setFollower] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [coarsePointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
  )

  useEffect(() => {
    if (reduced || coarsePointer) return

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)

    let raf = 0
    const loop = () => {
      setFollower((f) => ({
        x: f.x + (pos.x - f.x) * 0.15,
        y: f.y + (pos.y - f.y) * 0.15,
      }))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const interactives = document.querySelectorAll('a, button')
    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [reduced, coarsePointer, pos.x, pos.y])

  if (reduced || coarsePointer) {
    return null
  }

  const size = hovering ? 40 : 8

  return (
    <>
      <div
        className="pointer-events-none fixed z-100 rounded-full bg-white mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          left: pos.x - 4,
          top: pos.y - 4,
        }}
      />
      <div
        className="pointer-events-none fixed z-99 rounded-full border border-white/30 transition-[width,height] duration-200"
        style={{
          width: size,
          height: size,
          left: follower.x - size / 2,
          top: follower.y - size / 2,
        }}
      />
    </>
  )
}
