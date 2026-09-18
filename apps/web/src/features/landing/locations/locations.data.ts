import quitoPlaceholder from '@/assets/images/locations/quito-placeholder.svg'
import guayaquilPlaceholder from '@/assets/images/locations/guayaquil-placeholder.svg'

import type { EventLocation } from './types'

export const locations: EventLocation[] = [
  {
    id: 'quito',
    city: 'Quito',
    date: 'Fecha por confirmar',
    description:
      'Universidades, empresas y una comunidad que impulsa el cambio (texto de ejemplo).',
    ctaLabel: 'Ver agenda de Quito',
    ctaHref: '#agenda-quito',
    imageSrc: quitoPlaceholder,
    imageAlt: 'Imagen de ejemplo que representa la sede de Quito, pendiente de reemplazo',
  },
  {
    id: 'guayaquil',
    city: 'Guayaquil',
    date: 'Fecha por confirmar',
    description: 'Innovación, industria y talento conectados al mundo (texto de ejemplo).',
    ctaLabel: 'Ver agenda de Guayaquil',
    ctaHref: '#agenda-guayaquil',
    imageSrc: guayaquilPlaceholder,
    imageAlt: 'Imagen de ejemplo que representa la sede de Guayaquil, pendiente de reemplazo',
  },
]
