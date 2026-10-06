import type { AgendaItem } from './types'

export const agendaDate = '16 de octubre de 2026'

export const agenda: AgendaItem[] = [
  { start: '09:00', kind: 'opening', title: 'Bienvenida' },
  {
    start: '10:00',
    kind: 'talk',
    title: 'Fabricio Layedra',
    detail: 'Gerente Regional de Inversiones Inteligentes · Rappi Turbo',
  },
  { start: '10:40', kind: 'talk', title: 'Josué Dávalos' },
  {
    start: '11:20',
    kind: 'talk',
    title: 'George Guerrero',
    detail: 'Data Scientist · CLARO',
  },
  { start: '12:00', kind: 'break', title: 'Almuerzo' },
  {
    start: '13:30',
    kind: 'workshop',
    title: 'Taller: Claude Cowork',
    detail: 'Kevin Baque Chernez · Analista de IA en Pycca · $30',
  },
  { start: '15:30', kind: 'closing', title: 'Cierre y lanzamiento de próximo evento' },
]
