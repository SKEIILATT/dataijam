import guayaquilPlaceholder from '@/assets/images/locations/guayaquil-placeholder.svg'

import type { EventLocation } from './types'

export const locations: EventLocation[] = [
  {
    id: 'guayaquil',
    city: 'Guayaquil',
    date: '16 de octubre de 2026',
    description: 'Innovación, industria y talento conectados al mundo (texto de ejemplo).',
    ctaLabel: 'Ver agenda de Guayaquil',
    ctaHref: '#agenda-guayaquil',
    imageSrc: guayaquilPlaceholder,
    imageAlt: 'Imagen de ejemplo que representa la sede de Guayaquil, pendiente de reemplazo',
  },
]
