import { useInView } from 'motion/react'
import { useRef } from 'react'
import type { ReactNode } from 'react'

/** Adapted from React Bits GradientText: https://github.com/DavidHDev/react-bits */
export function GradientText({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  // A CSS animation that only runs while visible, instead of a JS loop for the whole visit.
  const inView = useInView(ref)

  return (
    <span
      ref={ref}
      data-animating={inView}
      className="hero__accent hero__gradient-text block bg-clip-text text-transparent"
    >
      {children}
    </span>
  )
}
