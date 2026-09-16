import { ClipboardList, Users, Code2, Trophy } from 'lucide-react'

import type { HackathonStep } from './types'

export const steps: HackathonStep[] = [
  {
    eyebrow: '01',
    title: 'Inscríbete',
    description: 'Registra tu participación y prepárate para formar parte del Hackathon.',
    icon: ClipboardList,
    date: 'Fecha por confirmar',
  },
  {
    eyebrow: '02',
    title: 'Forma tu equipo',
    description:
      'Conecta con otros participantes y reúne las habilidades necesarias para desarrollar tu idea.',
    icon: Users,
    date: 'Fecha por confirmar',
  },
  {
    eyebrow: '03',
    title: 'Construye tu solución',
    description: 'Trabaja en equipo para crear una solución y convertir tu idea en un prototipo.',
    icon: Code2,
    date: 'Fecha por confirmar',
  },
  {
    eyebrow: '04',
    title: 'Presenta tu proyecto',
    description: 'Comparte tu propuesta y presenta el resultado de tu trabajo durante el evento.',
    icon: Trophy,
    date: 'Fecha por confirmar',
  },
]
