import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

import type { EventLocation } from './types'

interface LocationCardProps {
  location: EventLocation
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <li className="location-panorama relative isolate overflow-hidden">
      <img
        src={location.imageSrc}
        alt={location.imageAlt}
        loading="lazy"
        className="location-panorama__image absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div aria-hidden="true" className="location-panorama__shade absolute inset-0 -z-10" />

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
