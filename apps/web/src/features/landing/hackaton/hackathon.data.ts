import { Code2, GraduationCap, Target, Trophy } from 'lucide-react'

import type { HackathonStep } from './types'

// Fuente: docs/Propuesta de Estructura - Hackathon 4 Semanas.pdf
export const steps: HackathonStep[] = [
  {
    title: 'Capacitación y nivelación',
    summary: 'Bootcamps y networking',
    description:
      'Bootcamps técnicos (stack del evento) y metodológicos (Design Thinking, Lean Startup). Sesiones de Speed Networking para fortalecer tu red de contactos.',
    deliverable: 'Formulario de registro de equipo e idea inicial',
    icon: GraduationCap,
  },
  {
    title: 'Validación y filtro',
    summary: 'Sprint eliminatorio de 3 días',
    description:
      'Sprint eliminatorio de 3 días: investigación de usuarios, prototipado rápido con mentores y pitch de eliminación. Solo avanzan los proyectos con mayor tracción.',
    deliverable: 'MVP de baja fidelidad y pitch deck preliminar',
    icon: Target,
  },
  {
    title: 'Desarrollo especializado',
    summary: 'Hackathon por tracks de 72 h',
    description:
      'Hackathon por tracks de 72 horas: los equipos clasificados se enfocan en código y experiencia de usuario, con mentoría técnica continua de expertos de cada vertical.',
    deliverable: 'Prototipo funcional (beta) por vertical',
    icon: Code2,
  },
  {
    title: 'Cierre y exposición',
    summary: 'Demo Day y Gran Final',
    description:
      'Refinamiento y comunicación del valor: clínica de pitch, Demo Day y Gran Final ante un jurado de inversionistas y líderes de la industria.',
    deliverable: 'Solución final, documentación y presentación en vivo',
    icon: Trophy,
  },
]
