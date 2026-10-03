import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { ScrollWords } from '@/components/ui/ScrollWords'
import { usePrefersReducedMotion } from '@/components/ui/use-prefers-reduced-motion'

import { ImpactMetrics } from './ImpactMetrics'
import type { AboutProps } from './types'

export function About({
  eyebrow,
  heading,
  description,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  // A diagonal curtain opens the photo from the right while the section arrives.
  const edge = useTransform(scrollYProgress, [0.08, 0.42], [100, -24])
  const clipPath = useMotionTemplate`polygon(${edge}% 0%, 100% 0%, 100% 100%, calc(${edge}% - 24%) 100%)`
  const photoY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="ds-section community-section photo-surface"
    >
      <motion.figure className="community-photo" style={reducedMotion ? undefined : { clipPath }}>
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          className="h-full w-full object-cover"
          style={reducedMotion ? undefined : { y: photoY, scale: 1.16 }}
        />
      </motion.figure>
      <Container>
        <div className="community-layout">
          <div data-reveal>
            {eyebrow && (
              <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan">{eyebrow}</p>
            )}

            <h2 id="about-heading" className="mt-3 text-h2 font-semibold text-brand-white">
              <ScrollWords text={heading} />
            </h2>

            <p className="mt-4 max-w-xl text-body text-brand-gray">
              <ScrollWords text={description} dim={0.28} />
            </p>

            <Button as="a" href={ctaHref} variant="secondary" className="mt-8">
              {ctaLabel}
            </Button>
          </div>

          <div data-reveal="side" className="community-photo__caption">
            Talento en movimiento
            <span aria-hidden="true" />
          </div>
        </div>

        <ImpactMetrics />
      </Container>
    </section>
  )
}

export default About
