import { motion, useReducedMotion as useFramerReduced, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/cn'
import { fadeUp, reducedFade } from './variants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = {
  children: React.ReactNode
  className?: string
  as?: 'section' | 'div'
}

export function MotionSection({ children, className, as = 'section' }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const framerReduced = useFramerReduced()
  const Component = as === 'section' ? motion.section : motion.div
  const variants = reduced || framerReduced ? reducedFade : fadeUp

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: reduced ? 0.2 : 0.5, ease: 'easeOut' }}
      className={cn(className)}
    >
      {children}
    </Component>
  )
}
