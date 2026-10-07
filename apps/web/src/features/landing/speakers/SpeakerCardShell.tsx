import { motion, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { useLayoutEffect, useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'

import { usePrefersReducedMotion } from '@/components/ui/use-prefers-reduced-motion'

type SpeakerCardShellProps = {
  index: number
  columns: number
  deal: MotionValue<number>
  className?: string
  /** Hides the card while its bio dialog shows it lifted out of the carousel. */
  lifted?: boolean
  children: ReactNode
}

function settleTilt(card: HTMLElement) {
  card.style.setProperty('--tilt', '0deg')
  delete card.dataset.tilting
}

/** Cards of the first page start stacked at the center and are dealt into place by scroll. */
export function SpeakerCardShell({
  index,
  columns,
  deal,
  className = '',
  lifted = false,
  children,
}: SpeakerCardShellProps) {
  const reducedMotion = usePrefersReducedMotion()
  const offset = index < columns ? (columns - 1) / 2 - index : 0
  const x = useTransform(deal, [0, 1], [`${offset * 106}%`, '0%'])
  const rotate = useTransform(deal, [0, 1], [offset * -8, 0])
  const scale = useTransform(deal, [0, 1], [0.86, 1])
  const cardRef = useRef<HTMLLIElement>(null)

  // Level the card as it lifts, so it comes back straight when its dialog closes. A layout
  // effect runs before the dialog measures the card.
  useLayoutEffect(() => {
    if (lifted && cardRef.current) settleTilt(cardRef.current)
  }, [lifted])

  function tilt(event: PointerEvent<HTMLLIElement>) {
    if (event.pointerType !== 'mouse' || reducedMotion) return
    const card = event.currentTarget
    // The bio dialog is portaled out of the card but still bubbles through it in React;
    // only the pointer over the card itself may tilt it.
    if (!card.contains(event.target as Node)) return
    const bounds = card.getBoundingClientRect()
    const dx = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
    const dy = ((event.clientY - bounds.top) / bounds.height) * 2 - 1
    card.style.setProperty('--tilt-x', String(-dy))
    card.style.setProperty('--tilt-y', String(dx))
    card.style.setProperty('--tilt', `${Math.hypot(dx, dy) * 7}deg`)
    card.style.setProperty('--glare-x', `${(dx + 1) * 50}%`)
    card.style.setProperty('--glare-y', `${(dy + 1) * 50}%`)
    card.dataset.tilting = 'true'
  }

  function resetTilt(event: PointerEvent<HTMLLIElement>) {
    settleTilt(event.currentTarget)
  }

  return (
    <motion.li
      ref={cardRef}
      className={`speaker-editorial ${className}`}
      data-lifted={lifted ? true : undefined}
      style={
        reducedMotion
          ? undefined
          : { x, rotate, scale, zIndex: Math.round((columns - Math.abs(offset)) * 2) }
      }
      onPointerMove={tilt}
      onPointerLeave={resetTilt}
    >
      {children}
    </motion.li>
  )
}
