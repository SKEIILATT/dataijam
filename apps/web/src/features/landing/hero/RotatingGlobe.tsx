import { useEffect, useRef } from 'react'
import poster from '@/assets/images/hero/data-globe.png'
import earthMap from '@/assets/images/hero/earth-map.png'
import { createGlobeRenderer } from './globe-renderer'

export function RotatingGlobe() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const renderer = useRef<ReturnType<typeof createGlobeRenderer>>(null)

  useEffect(() => {
    if (!canvas.current) return
    renderer.current = createGlobeRenderer(canvas.current, earthMap)
    return () => {
      renderer.current?.destroy()
      renderer.current = null
    }
  }, [])

  return (
    <div className="hero-world">
      <canvas ref={canvas} className="hero-world__canvas" aria-hidden="true" />
      <img
        src={poster}
        alt=""
        width={1254}
        height={1254}
        className="hero-world__poster"
        decoding="async"
      />
    </div>
  )
}
