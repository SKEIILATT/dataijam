import { Container } from '@/components/ui/container'

import { LocationCard } from './LocationCard'
import { locations, locationsContentNote } from './locations.data'
import type { LocationsGridProps } from './types'

export function LocationsGrid({ eyebrow, heading, subheading }: LocationsGridProps) {
  return (
    <section aria-labelledby="locations-heading" className="bg-brand-white py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand-blue">{eyebrow}</p>

          <h2
            id="locations-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl"
          >
            {heading}
          </h2>

          <p className="mt-5 text-base leading-7 text-brand-navy/70 sm:text-lg">{subheading}</p>
        </div>

        <ul className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-2" aria-label="Sedes del evento">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </ul>

        <p className="mt-6 text-xs text-brand-navy/60">{locationsContentNote}</p>
      </Container>
    </section>
  )
}

export default LocationsGrid
