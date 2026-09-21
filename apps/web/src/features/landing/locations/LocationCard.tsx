import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { EventLocation } from './types'

interface LocationCardProps {
  location: EventLocation
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <li
      data-reveal
      className="ds-card ds-card--panorama ds-media-card group relative isolate flex min-h-80 flex-col justify-end overflow-hidden"
    >
      <img
        src={location.imageSrc}
        alt={location.imageAlt}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover ds-media-image"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-navy via-brand-navy/70 to-transparent"
      />

      <div className="p-6">
        <time className="text-xs font-medium uppercase tracking-[0.14em] text-brand-cyan">
          {location.date}
        </time>

        <h3 className="mt-2 ds-card-title text-brand-white">{location.city}</h3>

        <p className="mt-4 max-w-sm text-body text-brand-gray">{location.description}</p>

        <Button as="a" href={location.ctaHref} variant="secondary" className="mt-6">
          {location.ctaLabel}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
    </li>
  )
}

export default LocationCard
