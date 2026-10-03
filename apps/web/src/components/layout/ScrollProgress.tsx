import { motion, useScroll, useSpring } from 'motion/react'
import { usePrefersReducedMotion } from '../ui/use-prefers-reduced-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const easedProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: 0.35 })
  const reducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      className="site-scroll-progress"
      style={{ scaleX: reducedMotion ? scrollYProgress : easedProgress }}
    />
  )
}
