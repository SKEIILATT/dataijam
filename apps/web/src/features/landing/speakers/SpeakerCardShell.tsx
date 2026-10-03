import { motion, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

import { usePrefersReducedMotion } from '@/components/ui/use-prefers-reduced-motion'

type SpeakerCardShellProps = {
  index: number
  columns: number
  deal: MotionValue<number>
  className?: string
  children: ReactNode
}

/** Cards of the first page start stacked at the center and are dealt into place by scroll. */
export function SpeakerCardShell({
  index,
  columns,
  deal,
  className = '',
  children,
}: SpeakerCardShellProps) {
  const reducedMotion = usePrefersReducedMotion()
  const offset = index < columns ? (columns - 1) / 2 - index : 0
  const x = useTransform(deal, [0, 1], [`${offset * 106}%`, '0%'])
  const rotate = useTransform(deal, [0, 1], [offset * -8, 0])
  const scale = useTransform(deal, [0, 1], [0.86, 1])

  function tilt(event: PointerEvent<HTMLLIElement>) {
    if (event.pointerType !== 'mouse' || reducedMotion) return
    const card = event.currentTarget
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
    event.currentTarget.style.setProperty('--tilt', '0deg')
    delete event.currentTarget.dataset.tilting
  }

  return (
    <motion.li
      className={`speaker-editorial ${className}`}
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
