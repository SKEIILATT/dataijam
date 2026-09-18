import { Users, Mic, Calendar, Sparkles } from 'lucide-react'

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
    value: '—',
    label: 'Speakers invitados',
    icon: Mic,
  },
  {
    id: 'semanas-hackathon',
    value: '—',
    label: 'Semanas de hackathon',
    icon: Calendar,
  },
  {
    id: 'oportunidades',
    value: '—',
    label: 'Oportunidades de impacto',
    icon: Sparkles,
  },
]
