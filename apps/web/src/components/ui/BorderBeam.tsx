import { useInView } from 'motion/react'
import { useRef } from 'react'

import { usePrefersReducedMotion } from './use-prefers-reduced-motion'

/** Adapted from Magic UI Border Beam: https://github.com/magicuidesign/magicui */
export function BorderBeam() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const reducedMotion = usePrefersReducedMotion()
  if (reducedMotion) return null

  return (
    <div ref={ref} className="border-beam" data-animating={inView} aria-hidden="true">
      <span className="border-beam__light" />
    </div>
  )
}
