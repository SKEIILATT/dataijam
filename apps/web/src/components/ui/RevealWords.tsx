import { motion } from 'motion/react'
import { usePrefersReducedMotion } from './use-prefers-reduced-motion'

interface RevealWordsProps {
  text: string
  delay?: number
}

/** Word entrance inspired by 21st.dev's Text Reveal, adapted for the hero headline. */
export function RevealWords({ text, delay = 0 }: RevealWordsProps) {
  const reducedMotion = usePrefersReducedMotion()
  const words = text.split(' ')

  if (reducedMotion) return <span className="hero-reveal-line">{text}</span>

  return (
    <span className="hero-reveal-line">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span className="hero-reveal-word" key={`${word}-${index}`}>
            <motion.span
              className="hero-reveal-word__inner"
              initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: delay + index * 0.085,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  )
}
