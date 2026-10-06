import { useEffect, useRef } from 'react'
import earthMap from '@/assets/images/hero/earth-map.webp'

export function RotatingGlobe() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const renderer = useRef<{ destroy: () => void } | null>(null)

  useEffect(() => {
    const still = window.matchMedia('(max-width: 639px), (prefers-reduced-motion: reduce)')
    let disposed = false
    let version = 0
    const update = () => {
      const currentVersion = ++version
      renderer.current?.destroy()
      renderer.current = null
      if (canvas.current && !still.matches) {
        void import('./globe-renderer')
          .then(({ createGlobeRenderer }) => {
            if (disposed || currentVersion !== version || !canvas.current || still.matches) return
            renderer.current = createGlobeRenderer(canvas.current, earthMap)
          })
          .catch((error: unknown) => {
            console.warn('Globe unavailable; using the static illustration.', error)
          })
      }
    }
    update()
    still.addEventListener('change', update)
    return () => {
      disposed = true
      version++
      still.removeEventListener('change', update)
      renderer.current?.destroy()
      renderer.current = null
    }
  }, [])

  return (
    <div className="hero-world">
      <canvas ref={canvas} className="hero-world__canvas" aria-hidden="true" />
      <picture className="hero-world__poster">
        <source media="(max-width: 639px)" srcSet="/hero/data-globe-mobile-v1.webp" />
        <img
          src="/hero/data-globe-v1.webp"
          alt=""
          width={1254}
          height={1254}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  )
}
