import { ArrowUpRight, MapPin, Star } from 'lucide-react'

import type { Speaker } from './types'

interface SpeakerCardProps {
  speaker: Speaker
  featured?: boolean
  className?: string
}

export function SpeakerCard({ speaker, featured = false, className = '' }: SpeakerCardProps) {
  return (
    <li
      className={`group relative isolate flex min-h-80 overflow-hidden rounded-2xl border border-brand-cyan/75 bg-brand-white/5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-cyan hover:shadow-[0_1rem_3rem_rgba(8,205,239,0.16)] ${
        featured ? 'min-h-[32rem] sm:min-h-[40rem]' : ''
      } ${className}`}
    >
      <img
        src={speaker.imageSrc}
        alt={speaker.imageAlt}
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-navy via-brand-navy/75 to-brand-navy/5"
      />

      <div className="flex w-full flex-col justify-end p-6 sm:p-7">
        {featured ? (
          <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-brand-cyan px-3 py-1.5 text-xs font-medium tracking-[0.12em] text-brand-cyan uppercase sm:left-7 sm:top-7">
            <Star aria-hidden="true" className="size-3.5 fill-current" />
            Speaker destacado
          </span>
        ) : null}

        <span className="mb-3 w-fit rounded-full border border-brand-cyan/80 px-3 py-1 text-xs font-medium tracking-[0.1em] text-brand-cyan uppercase">
          Perfil pendiente
        </span>
        <h3 className="text-h3 font-semibold text-brand-white">{speaker.name}</h3>
        <p className="mt-1 text-sm text-brand-white/70">{speaker.role}</p>

        {featured ? (
          <p className="mt-5 max-w-md text-body text-brand-white/75">
            La trayectoria y biografía de este speaker se publicarán cuando estén confirmadas.
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="flex items-center gap-1.5 text-brand-white/65">
            <MapPin aria-hidden="true" className="size-4 text-brand-cyan" />
            {speaker.location}
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-brand-cyan">
            Perfil pendiente
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </span>
        </div>
      </div>
    </li>
  )
}

export default SpeakerCard
