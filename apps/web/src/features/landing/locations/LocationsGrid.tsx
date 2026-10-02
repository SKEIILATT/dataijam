import { LocationCard } from './LocationCard'
import { locations } from './locations.data'
import type { LocationsGridProps } from './types'

export function LocationsGrid({ eyebrow, heading, subheading }: LocationsGridProps) {
  return (
    <section aria-labelledby="locations-heading" className="locations-section photo-surface">
      <div className="sr-only">
        {eyebrow && (
          <p className="text-sm font-medium tracking-[0.18em] text-brand-blue">{eyebrow}</p>
        )}

        <h2 id="locations-heading" className="mt-3 text-h2 font-semibold text-brand-white">
          {heading}
        </h2>

        <p className="mt-4 text-body text-brand-gray">{subheading}</p>
      </div>

      <ul aria-label="Sede del evento">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </ul>
    </section>
  )
}

export default LocationsGrid
