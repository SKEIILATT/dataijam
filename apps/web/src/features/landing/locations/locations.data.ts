import guayaquilPhoto from '@/assets/images/locations/guayaquil-aerial.jpg'

import type { EventLocation } from './types'

export const locations: EventLocation[] = [
  {
    id: 'guayaquil',
    city: 'Guayaquil',
    venue: 'Auditorio de ESPAE · Campus ESPOL Peñas',
    date: '16 de octubre de 2026',
    description:
      'Innovación, industria y talento. Nos encontramos para compartir ideas y construir lo que viene.',
    ctaLabel: 'Quiero asistir',
    ctaHref: '#registro',
    imageSrc: guayaquilPhoto,
    imageAlt: 'Vista aérea de Puerto Santa Ana y el cerro Santa Ana en Guayaquil al atardecer',
  },
]
