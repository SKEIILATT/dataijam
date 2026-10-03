import { Users, Mic, Calendar, Sparkles } from 'lucide-react'

import { speakerTotal } from '../speakers/speakers.data'
import type { ImpactMetric } from './types'

export const impactMetrics: ImpactMetric[] = [
  {
    id: 'asistentes',
    value: '—',
    label: 'Asistentes estimados',
    icon: Users,
  },
  {
    id: 'speakers',
    value: String(speakerTotal),
    label: 'Speakers invitados',
    icon: Mic,
  },
  {
    id: 'semanas-hackathon',
    value: '4',
    label: 'Semanas de hackathon',
    icon: Calendar,
  },
  {
    id: 'oportunidades',
    value: '∞',
    label: 'Oportunidades de impacto',
    icon: Sparkles,
  },
]
