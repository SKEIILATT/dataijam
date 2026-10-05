import { ArrowRight, MapPin } from 'lucide-react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { usePrefersReducedMotion } from '@/components/ui/use-prefers-reduced-motion'

import type { EventLocation } from './types'

interface LocationCardProps {
  location: EventLocation
}

export function LocationCard({ location }: LocationCardProps) {
  const spotlightX = useSpring(0, { stiffness: 170, damping: 26 })
  const spotlightY = useSpring(0, { stiffness: 170, damping: 26 })
  const panoramaRef = useRef<HTMLLIElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  // Camera pan over the city, with the outlined name drifting the opposite way.
  const { scrollYProgress } = useScroll({
    target: panoramaRef,
    offset: ['start end', 'end start'],
  })
  const imageX = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.22, 1.1, 1.04])
  const ghostX = useTransform(scrollYProgress, [0, 1], ['22%', '-42%'])

  return (
    <li
      ref={panoramaRef}
      className="location-panorama relative isolate overflow-hidden"
      onPointerMove={(event) => {
        if (
          event.pointerType !== 'mouse' ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        )
          return
        const bounds = event.currentTarget.getBoundingClientRect()
        spotlightX.set((event.clientX - bounds.left - bounds.width / 2) * 0.16)
        spotlightY.set((event.clientY - bounds.top - bounds.height / 2) * 0.16)
      }}
      onPointerLeave={() => {
        spotlightX.set(0)
        spotlightY.set(0)
      }}
    >
      <motion.img
        src={location.imageSrc}
        alt={location.imageAlt}
        loading="lazy"
        className="location-panorama__image absolute inset-0 -z-20 h-full w-full object-cover"
        style={reducedMotion ? undefined : { x: imageX, scale: imageScale }}
      />

      <div aria-hidden="true" className="location-panorama__shade absolute inset-0 -z-10" />
      {!reducedMotion && (
        <motion.span aria-hidden="true" className="location-panorama__ghost" style={{ x: ghostX }}>
          {location.city}
        </motion.span>
      )}
      <motion.div
        aria-hidden="true"
        className="location-panorama__spotlight"
        style={{ x: spotlightX, y: spotlightY }}
      />

      <Container className="location-panorama__content">
        <div data-reveal className="location-panorama__copy">
          <p className="mb-8 text-xs font-medium tracking-[0.2em] text-brand-cyan uppercase">
            Un punto de encuentro. Infinitas conexiones.
          </p>
          <time
            dateTime="2026-10-16"
            className="text-sm font-medium uppercase tracking-[0.14em] text-brand-white"
          >
            {location.date}
          </time>

          <h3 className="location-panorama__city">
            {location.city}
            <span className="text-brand-cyan">.</span>
          </h3>

          <p className="mt-3 flex items-center gap-2 text-sm font-medium text-brand-white">
            <MapPin aria-hidden="true" className="size-4 shrink-0 text-brand-cyan" />
            {location.venue}
          </p>

          <p className="mt-4 max-w-sm text-body text-brand-gray">{location.description}</p>

          <Button as="a" href={location.ctaHref} variant="secondary" className="mt-6">
            {location.ctaLabel}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
        <div className="location-panorama__signature" aria-hidden="true">
          <span>De aquí,</span>
          <br />
          para el mundo.
        </div>
        <p className="location-panorama__credit">
          Foto:{' '}
          <a href="https://unsplash.com/photos/49_PpVFXbGg" target="_blank" rel="noreferrer">
            Andres Medina / Unsplash
          </a>{' '}
          ·{' '}
          <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">
            Licencia Unsplash
          </a>{' '}
          · Recorte y superposición de color
        </p>
      </Container>
    </li>
  )
}

export default LocationCard
