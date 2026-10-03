import { motion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { Fragment, useRef } from 'react'

import { usePrefersReducedMotion } from './use-prefers-reduced-motion'

type WordProps = {
  word: string
  progress: MotionValue<number>
  range: [number, number]
  dim: number
}

function Word({ word, progress, range, dim }: WordProps) {
  const opacity = useTransform(progress, range, [dim, 1])
  return <motion.span style={{ opacity }}>{word}</motion.span>
}

/** Words light up one by one as the text crosses the viewport. */
export function ScrollWords({ text, dim = 0.2 }: { text: string; dim?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] })
  const words = text.split(' ')

  return (
    <span ref={ref}>
      {reducedMotion
        ? text
        : words.map((word, index) => (
            <Fragment key={index}>
              <Word
                word={word}
                progress={scrollYProgress}
                range={[index / words.length, (index + 1) / words.length]}
                dim={dim}
              />
              {index < words.length - 1 && ' '}
            </Fragment>
          ))}
    </span>
  )
}
