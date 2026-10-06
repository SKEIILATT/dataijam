import { lazy, Suspense, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { usePrefersReducedMotion } from '@/components/ui/use-prefers-reduced-motion'

const animatedViewport = '(min-width: 768px)'

function subscribeViewport(callback: () => void) {
  const media = window.matchMedia(animatedViewport)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

const ConnectionOrbitPlayer = lazy(() =>
  import('./ConnectionOrbitPlayer').then((module) => ({ default: module.ConnectionOrbitPlayer })),
)

export function ConnectionOrbit() {
  const reducedMotion = usePrefersReducedMotion()
  const wideViewport = useSyncExternalStore(
    subscribeViewport,
    () => window.matchMedia(animatedViewport).matches,
    () => false,
  )
  const container = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const element = container.current
    if (!element || reducedMotion || !wideViewport) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion, wideViewport])

  return (
    <div ref={container} className="registration-connection-orbit" aria-hidden="true">
      {near && !reducedMotion && wideViewport ? (
        <Suspense fallback={<span className="registration-connection-orbit__static" />}>
          <ConnectionOrbitPlayer />
        </Suspense>
      ) : (
        <span className="registration-connection-orbit__static" />
      )}
    </div>
  )
}
