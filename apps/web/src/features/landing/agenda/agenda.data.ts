import type { AgendaItem } from './types'

export const agendaDate = '16 de octubre de 2026'

export const agenda: AgendaItem[] = [
  {
    start: '09:00',
    end: '09:10',
    duration: '10 min',
    kind: 'opening',
    title: 'Apertura',
    detail: 'Bienvenida e introducción',
  },
  { start: '09:10', end: '09:45', duration: '35 min', kind: 'talk' },
  { start: '09:45', end: '10:20', duration: '35 min', kind: 'talk', title: 'Pablo Estrada' },
  { start: '10:20', end: '10:55', duration: '35 min', kind: 'talk' },
  {
    start: '10:55',
    end: '11:25',
    duration: '30 min',
    kind: 'break',
    title: 'Break',
    detail: 'Pausa',
  },
  { start: '11:25', end: '12:00', duration: '35 min', kind: 'talk' },
  { start: '12:00', end: '12:35', duration: '35 min', kind: 'talk' },
  { start: '12:35', end: '13:10', duration: '35 min', kind: 'talk' },
  { start: '13:10', end: '13:45', duration: '35 min', kind: 'talk' },
  {
    start: '13:45',
    end: '13:55',
    duration: '10 min',
    kind: 'closing',
    title: 'Cierre',
    detail: 'Agradecimientos y cierre',
  },
]
