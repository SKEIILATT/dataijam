import { useEffect, useRef } from 'react'

/** A CSS grid that lights up near the pointer without canvas or React re-renders. */
export function GridPulse() {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    const section = layer?.parentElement
    if (!layer || !section) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let frame = 0
    let x = 0
    let y = 0

    const paint = () => {
      const bounds = section.getBoundingClientRect()
      layer.style.setProperty('--pulse-x', `${x - bounds.left}px`)
      layer.style.setProperty('--pulse-y', `${y - bounds.top}px`)
      layer.dataset.active = 'true'
      frame = 0
    }
    const onMove = (event: MouseEvent) => {
      if (!window.matchMedia('(hover: hover)').matches || reducedMotion.matches) return
      x = event.clientX
      y = event.clientY
      if (!frame) frame = window.requestAnimationFrame(paint)
    }
    const onLeave = () => {
      layer.dataset.active = 'false'
      window.cancelAnimationFrame(frame)
      frame = 0
    }
    const onMotionChange = () => {
      if (reducedMotion.matches) onLeave()
    }

    section.addEventListener('mousemove', onMove, { passive: true })
    section.addEventListener('mouseleave', onLeave)
    reducedMotion.addEventListener('change', onMotionChange)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      reducedMotion.removeEventListener('change', onMotionChange)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={layerRef} className="hackathon-grid-pulse" aria-hidden="true" />
}
