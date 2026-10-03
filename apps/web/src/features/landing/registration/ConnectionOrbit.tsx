import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/components/ui/use-prefers-reduced-motion'

const ConnectionOrbitPlayer = lazy(() =>
  import('./ConnectionOrbitPlayer').then((module) => ({ default: module.ConnectionOrbitPlayer })),
)

export function ConnectionOrbit() {
  const reducedMotion = usePrefersReducedMotion()
  const container = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const element = container.current
    if (!element || reducedMotion) return
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
  }, [reducedMotion])

  return (
    <div ref={container} className="registration-connection-orbit" aria-hidden="true">
      {near && !reducedMotion ? (
        <Suspense fallback={<span className="registration-connection-orbit__static" />}>
          <ConnectionOrbitPlayer />
        </Suspense>
      ) : (
        <span className="registration-connection-orbit__static" />
      )}
    </div>
  )
}
