import auditorium from '@/assets/images/editorial/auditorium.webp'
import connections from '@/assets/images/editorial/connections.webp'
import globalLinks from '@/assets/images/editorial/global.webp'
import guidance from '@/assets/images/editorial/guidance.webp'
import partnerships from '@/assets/images/editorial/partnerships.webp'
import teamwork from '@/assets/images/editorial/teamwork.webp'
import welcome from '@/assets/images/editorial/welcome.webp'
import type { ExperienceContent } from './types'

export const experienceContent: ExperienceContent = {
  eyebrow: '16 de octubre de 2026 · Guayaquil',
  titleStart: 'Datos, personas',
  titleEnd: 'y acción.',
  hint: 'Desliza para entrar',
  media: {
    src: auditorium,
    alt: 'Ilustración generada con IA de un auditorio durante una conferencia de tecnología',
  },
  stream: [welcome, teamwork, connections, partnerships, guidance, globalLinks],
  label: 'Conferencias + Hackathon',
  heading: 'Del escenario al prototipo.',
  description:
    'Conferencias con voces expertas y un hackathon de cuatro semanas para convertir ideas en soluciones con impacto.',
  cta: { label: 'Quiero asistir', href: '#registro' },
}
