import { motion, type Variants } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/cn'
import { fadeUp, staggerContainer } from './variants'

type BlockTag = 'div' | 'ol' | 'li' | 'article'

type AnimatedInViewProps = {
  children: React.ReactNode
  className?: string
  as?: BlockTag
  viewportMargin?: string
  stagger?: boolean
}

export function AnimatedInView({
  children,
  className,
  as = 'div',
  viewportMargin = '-40px',
  stagger = true,
}: AnimatedInViewProps) {
  const reduced = useReducedMotion()
  const Component = motion[as]
  const variants: Variants | undefined = reduced ? undefined : stagger ? staggerContainer : fadeUp

  return (
    <Component
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
    >
      {children}
    </Component>
  )
}

type AnimatedItemProps = {
  children: React.ReactNode
  className?: string
  as?: BlockTag
  custom?: number
}

export function AnimatedItem({ children, className, as = 'div', custom }: AnimatedItemProps) {
  const reduced = useReducedMotion()
  const Component = motion[as]

  return (
    <Component className={cn(className)} variants={reduced ? undefined : fadeUp} custom={custom}>
      {children}
    </Component>
  )
}

type AnimatedLinkProps = {
  children: React.ReactNode
  className?: string
  href: string
  target?: string
  rel?: string
  'aria-label'?: string
}

export function AnimatedLink({
  children,
  className,
  href,
  target,
  rel,
  'aria-label': ariaLabel,
}: AnimatedLinkProps) {
  const reduced = useReducedMotion()

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={cn(className)}
      variants={reduced ? undefined : fadeUp}
    >
      {children}
    </motion.a>
  )
}
