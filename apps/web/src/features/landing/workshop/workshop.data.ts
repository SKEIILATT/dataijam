import kevinBaquePhoto from '@/assets/images/workshop/kevin-baque-chernez.jpg'

import type { WorkshopContent } from './types'

// El pago y la confirmación del cupo se hacen dentro del formulario de inscripción:
// aquí no van datos bancarios.
export const workshop: WorkshopContent = {
  eyebrow: 'Taller',
  title: 'Claude Cowork',
  description:
    'Después del almuerzo, un taller práctico para quienes quieren seguir de cerca lo que vieron en las conferencias. Los cupos son limitados.',
  schedule: { start: '13:30', end: '15:30', label: '16 de octubre · Auditorio ESPAE' },
  price: {
    amount: '$30',
    note: 'Las conferencias son gratuitas; el taller tiene un valor de $30. El pago se completa en el formulario de inscripción.',
  },
  instructor: {
    name: 'Kevin Baque Chernez',
    role: 'Analista de Inteligencia Artificial · Pycca',
    linkedin: 'https://www.linkedin.com/in/kevin-baque-chernez/',
    imageSrc: kevinBaquePhoto,
    imageAlt: 'Retrato de Kevin Baque Chernez',
  },
  cta: { label: 'Inscribirme al taller', href: '#registro' },
}
