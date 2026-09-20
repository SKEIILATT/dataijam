import { ArrowRight } from 'lucide-react'

import type { EventLocation } from './types'

interface LocationCardProps {
  location: EventLocation
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <li className="group relative isolate flex min-h-80 flex-col justify-end overflow-hidden rounded-2xl">
      <img
        src={location.imageSrc}
        alt={location.imageAlt}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-navy via-brand-navy/70 to-transparent"
      />

      <div className="p-6 sm:p-8">
        <time className="text-xs font-medium uppercase tracking-[0.14em] text-brand-cyan">
          {location.date}
        </time>

        <h3 className="mt-2 text-h3 font-semibold text-brand-white">{location.city}</h3>

        <p className="mt-3 max-w-sm text-body text-brand-white/85">{location.description}</p>

        <a
          href={location.ctaHref}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-white/30 px-5 py-2.5 text-sm font-medium text-brand-white transition-colors duration-200 hover:border-brand-white hover:bg-brand-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
        >
          {location.ctaLabel}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </li>
  )
}

export default LocationCard
