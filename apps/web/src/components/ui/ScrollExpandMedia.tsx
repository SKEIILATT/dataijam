import { useLenis } from 'lenis/react'
import { ArrowDown } from 'lucide-react'
import { motion, useInView, useMotionTemplate, useScroll, useTransform } from 'motion/react'
import { useId, useRef } from 'react'
import type { CSSProperties, FocusEvent, ReactNode } from 'react'

import { Container } from './container'
import { usePrefersReducedMotion } from './use-prefers-reduced-motion'
import './scroll-expand-media.css'

const PANELS_PER_WALL = 6

type ScrollExpandMediaProps = {
  mediaSrc: string
  mediaAlt: string
  streamImages?: string[]
  eyebrow?: string
  titleStart: string
  titleEnd: string
  hint?: string
  className?: string
  children?: ReactNode
}

/** Pinned with position: sticky instead of hijacking wheel/touch, so Lenis, anchors and keys work. */
export function ScrollExpandMedia({
  mediaSrc,
  mediaAlt,
  streamImages = [],
  eyebrow,
  titleStart,
  titleEnd,
  hint,
  className = '',
  children,
}: ScrollExpandMediaProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingId = useId()
  const reducedMotion = usePrefersReducedMotion()
  const animated = !reducedMotion
  const streaming = useInView(sectionRef, { margin: '25% 0px' })
  const lenis = useLenis()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const expand = useTransform(scrollYProgress, [0.04, 0.72], [0, 1])
  const collapse = useTransform(expand, (value) => 1 - value)
  const clipPath = useMotionTemplate`inset(calc(var(--scroll-expand-inset-y) * ${collapse}) calc(var(--scroll-expand-inset-x) * ${collapse}) round calc(var(--scroll-expand-radius) * ${collapse}))`
  const mediaScale = useTransform(expand, [0, 1], [1.22, 1])
  const veilOpacity = useTransform(expand, [0, 1], [0.55, 0.12])
  const cameraZ = useTransform(scrollYProgress, [0, 0.72], [0, 440])
  const corridorOpacity = useTransform(expand, [0.45, 0.85], [1, 0])
  const titleStartX = useTransform(expand, [0, 1], ['0vw', '-58vw'])
  const titleEndX = useTransform(expand, [0, 1], ['0vw', '58vw'])
  const titleOpacity = useTransform(expand, [0.35, 0.8], [1, 0])
  const contentOpacity = useTransform(scrollYProgress, [0.76, 0.9], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.76, 0.9], [36, 0])
  const contentPointer = useTransform(contentOpacity, (value) => (value > 0.6 ? 'auto' : 'none'))

  // Tabbing into the still-hidden content scrolls to where it is revealed, like native focus would.
  function revealForKeyboard(event: FocusEvent<HTMLDivElement>) {
    const section = sectionRef.current
    if (!animated || !section || contentOpacity.get() >= 1) return
    if (!(event.target instanceof Element) || !event.target.matches(':focus-visible')) return
    const bounds = section.getBoundingClientRect()
    const top = window.scrollY + bounds.top + (bounds.height - window.innerHeight) * 0.96
    if (lenis) lenis.scrollTo(top, { immediate: true })
    else window.scrollTo({ top })
  }

  const panels =
    animated && streamImages.length > 0
      ? [-1, 1].flatMap((side) =>
          Array.from({ length: PANELS_PER_WALL }, (_, index) => ({
            side,
            index,
            src: streamImages[(index * 2 + (side > 0 ? 1 : 0)) % streamImages.length],
          })),
        )
      : []

  return (
    <section
      ref={sectionRef}
      aria-labelledby={headingId}
      className={`scroll-expand ${animated ? '' : 'scroll-expand--static'} ${streaming ? 'is-streaming' : ''} ${className}`}
    >
      <div className="scroll-expand__stage">
        {panels.length > 0 && (
          <motion.div
            aria-hidden="true"
            className="scroll-expand__corridor"
            style={{ opacity: corridorOpacity }}
          >
            <motion.div className="scroll-expand__track" style={{ z: cameraZ }}>
              {panels.map(({ side, index, src }) => (
                <div
                  key={`${side}-${index}`}
                  className="scroll-expand__panel"
                  style={{ '--side': side, '--index': index } as CSSProperties}
                >
                  <img src={src} alt="" loading="lazy" decoding="async" />
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}

        <motion.div className="scroll-expand__media" style={animated ? { clipPath } : undefined}>
          <motion.img
            src={mediaSrc}
            alt={mediaAlt}
            loading="lazy"
            decoding="async"
            style={animated ? { scale: mediaScale } : undefined}
          />
          <motion.div
            className="scroll-expand__veil"
            style={animated ? { opacity: veilOpacity } : undefined}
          />
          <motion.div
            className="scroll-expand__veil-end"
            style={animated ? { opacity: contentOpacity } : undefined}
          />
        </motion.div>

        <motion.div
          className="scroll-expand__headline"
          style={animated ? { opacity: titleOpacity } : undefined}
        >
          <Container className="flex flex-col gap-4">
            {eyebrow && (
              <motion.p
                className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase"
                style={animated ? { x: titleStartX } : undefined}
              >
                {eyebrow}
              </motion.p>
            )}
            <h2 id={headingId} className="text-h1 font-bold">
              <motion.span className="block" style={animated ? { x: titleStartX } : undefined}>
                {titleStart}
              </motion.span>{' '}
              <motion.span className="block" style={animated ? { x: titleEndX } : undefined}>
                {titleEnd}
              </motion.span>
            </h2>
            {hint && animated && (
              <motion.p
                aria-hidden="true"
                className="scroll-expand__hint text-sm font-medium tracking-[0.18em] uppercase"
                style={{ x: titleEndX }}
              >
                {hint}
                <ArrowDown className="scroll-expand__hint-icon size-4" />
              </motion.p>
            )}
          </Container>
        </motion.div>

        {children && (
          <motion.div
            className="scroll-expand__content"
            onFocus={revealForKeyboard}
            style={
              animated
                ? { opacity: contentOpacity, y: contentY, pointerEvents: contentPointer }
                : undefined
            }
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
