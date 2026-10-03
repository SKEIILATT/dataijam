import { Code2, GraduationCap, Target, Trophy } from 'lucide-react'

import type { HackathonStep, Rubric } from './types'

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

export const rubrics: Rubric[] = [
  {
    title: 'Rúbrica eliminatoria',
    stage: 'Semana 2',
    summary: 'Prioriza la identificación del problema y la cohesión del equipo.',
    criteria: [
      {
        name: 'Identificación del problema',
        description: 'Claridad en el dolor del usuario y relevancia social/económica.',
        weight: 30,
      },
      {
        name: 'Originalidad',
        description: 'Diferenciación respecto a soluciones existentes.',
        weight: 25,
      },
      {
        name: 'Capacidad de ejecución',
        description: 'Perfiles técnicos y de negocio balanceados dentro del equipo.',
        weight: 25,
      },
      {
        name: 'Validación temprana',
        description: 'Evidencia de investigación o entrevistas con usuarios potenciales.',
        weight: 20,
      },
    ],
  },
  {
    title: 'Rúbrica final',
    stage: 'Semana 4',
    summary: 'La usa el jurado experto para determinar a los ganadores globales.',
    criteria: [
      {
        name: 'Calidad técnica',
        description: 'Robustez del código, arquitectura y uso eficiente de herramientas.',
        weight: 30,
      },
      {
        name: 'Impacto y escalabilidad',
        description: 'Potencial de crecimiento y capacidad de generar un cambio real.',
        weight: 25,
      },
      {
        name: 'Experiencia de usuario',
        description: 'Diseño intuitivo, estética y facilidad de navegación del prototipo.',
        weight: 20,
      },
      {
        name: 'Modelo de negocio',
        description: 'Viabilidad financiera y estrategia de implementación a corto plazo.',
        weight: 15,
      },
      {
        name: 'Presentación (pitch)',
        description: 'Capacidad de persuasión, manejo de preguntas y calidad visual.',
        weight: 10,
      },
    ],
  },
]
