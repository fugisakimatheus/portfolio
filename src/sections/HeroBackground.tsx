import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function HeroBackground() {
  const reduced = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 45, damping: 26 })
  const springY = useSpring(mouseY, { stiffness: 45, damping: 26 })

  useEffect(() => {
    if (reduced) return
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseX.set(x * 20)
      mouseY.set(y * 14)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, mouseX, mouseY])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-(--bg-base)" />
      <div className="absolute inset-0 bg-linear-to-b from-[#111116] via-(--bg-base) to-(--bg-base)" />

      {/* Mesh gradients — soft focal wash */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 100% 75% at 50% -8%, rgba(129, 140, 248, 0.12), transparent 58%)',
            'radial-gradient(ellipse 50% 42% at 12% 38%, rgba(99, 102, 241, 0.08), transparent 52%)',
            'radial-gradient(ellipse 42% 38% at 92% 22%, rgba(165, 180, 252, 0.05), transparent 48%)',
            'radial-gradient(ellipse 70% 45% at 72% 78%, rgba(99, 102, 241, 0.04), transparent 50%)',
            'radial-gradient(ellipse 90% 55% at 50% 105%, rgba(0, 0, 0, 0.45), transparent 58%)',
          ].join(', '),
        }}
      />

      {/* Soft horizon line */}
      <div
        className="absolute inset-x-0 top-[38%] h-px opacity-[0.06]"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(165, 180, 252, 0.9) 50%, transparent)',
        }}
      />

      {/* Parallax orbs */}
      <motion.div
        className="absolute inset-0"
        style={{ x: reduced ? 0 : springX, y: reduced ? 0 : springY }}
      >
        <div className="hero-orb hero-orb--a absolute left-[-6%] top-[6%] h-[min(520px,58vw)] w-[min(520px,58vw)] rounded-full bg-(--accent) opacity-[0.1] blur-[120px]" />
        <div className="hero-orb hero-orb--b absolute right-[-2%] top-[14%] h-[min(400px,48vw)] w-[min(400px,48vw)] rounded-full bg-indigo-300/40 opacity-[0.07] blur-[105px]" />
        <div className="hero-orb hero-orb--c absolute bottom-[10%] left-[32%] h-[min(340px,40vw)] w-[min(340px,40vw)] rounded-full bg-(--accent-glow) opacity-[0.06] blur-[95px]" />
      </motion.div>

      {!reduced && (
        <div
          className="absolute inset-0 opacity-[0.028] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
      )}

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(var(--text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 38%, black 15%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 65% at 50% 38%, black 15%, transparent 72%)',
        }}
      />

      {/* Vignette + bottom fade into page */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--bg-base)_88%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-(--bg-base) via-(--bg-base)/80 to-transparent" />
    </div>
  )
}
