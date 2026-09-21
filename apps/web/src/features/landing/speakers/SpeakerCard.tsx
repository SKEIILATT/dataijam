import { MapPin, Star } from 'lucide-react'

import type { Speaker } from './types'

interface SpeakerCardProps {
  speaker: Speaker
  featured?: boolean
  className?: string
}

export function SpeakerCard({ speaker, featured = false, className = '' }: SpeakerCardProps) {
  return (
    <li
      data-reveal
      className={`ds-card ds-media-card group relative isolate flex min-h-80 overflow-hidden ${
        featured ? 'ds-card--featured min-h-[32rem] lg:h-full' : ''
      } ${className}`}
    >
      <img
        src={speaker.imageSrc}
        alt={speaker.imageAlt}
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover ds-media-image"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-navy via-brand-navy/75 to-brand-navy/5"
      />

      <div className="flex w-full flex-col justify-end p-6">
        {featured ? (
          <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-brand-cyan px-3 py-1.5 text-xs font-medium tracking-[0.12em] text-brand-cyan uppercase">
            <Star aria-hidden="true" className="size-4" />
            Speaker destacado
          </span>
        ) : null}

        <span className="mb-3 w-fit rounded-full border border-brand-cyan/80 px-3 py-1 text-xs font-medium tracking-[0.1em] text-brand-cyan uppercase">
          Perfil pendiente
        </span>
        <h3 className="ds-card-title text-brand-white">{speaker.name}</h3>
        <p className="mt-1 text-sm text-brand-gray">{speaker.role}</p>

        {featured ? (
          <p className="mt-4 max-w-md text-body text-brand-gray">
            La trayectoria y biografía de este speaker se publicarán cuando estén confirmadas.
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="flex items-center gap-1.5 text-brand-gray">
            <MapPin aria-hidden="true" className="size-4 text-brand-cyan" />
            {speaker.location}
          </span>
        </div>
      </div>
    </li>
  )
}

export default SpeakerCard
