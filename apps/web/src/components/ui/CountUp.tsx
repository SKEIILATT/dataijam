import { animate, motion, useInView, useMotionValue, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from './use-prefers-reduced-motion'

export function CountUp({ value, duration = 1.6 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reducedMotion = usePrefersReducedMotion()
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    if (!inView || reducedMotion) return
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, reducedMotion, value, duration, count])

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden="true">{reducedMotion ? value : rounded}</motion.span>
    </span>
  )
}
