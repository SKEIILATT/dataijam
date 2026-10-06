export interface FaqItem {
  category: 'evento' | 'hackathon' | 'inscripcion'
  question: string
  answer: string
}

// Contenido ilustrativo para poder mostrar la sección ya armada. Las
// respuestas evitan inventar datos que todavía no están definidos (premios): esos se marcan como pendientes en vez de fabricar una cifra falsa.
export const faqItems: FaqItem[] = [
  {
    question: '¿Qué es DatAIJam?',
    category: 'evento',
    answer:
      'Es un evento de conferencias y hackathon que reúne a estudiantes, profesionales y comunidad tech alrededor de datos e inteligencia artificial, con el objetivo de aprender, conectar y construir soluciones con impacto real.',
  },
  {
    question: '¿Quién puede participar?',
    category: 'evento',
    answer:
      'Cualquier persona interesada en tecnología, datos o IA: estudiantes, profesionales y curiosos por igual. Las conferencias son abiertas a todo nivel; el hackathon también recibe equipos mixtos de distintas experiencias.',
  },
  {
    question: '¿Necesito experiencia previa en programación o IA?',
    category: 'evento',
    answer: 'No es obligatorio. Habrá contenido pensado para distintos niveles.',
  },
  {
    question: '¿Puedo inscribirme al hackathon sin equipo?',
    category: 'hackathon',
    answer:
      'No. Para inscribirte al hackathon necesitas tener tu equipo armado, de 3 a 4 integrantes.',
  },
  {
    question: '¿De cuántas personas son los equipos?',
    category: 'hackathon',
    answer: 'Los equipos son de 3 a 4 integrantes.',
  },
  {
    question: '¿Cuánto dura el hackathon?',
    category: 'hackathon',
    answer:
      'Cuatro semanas: capacitación y nivelación, sprint eliminatorio, desarrollo por tracks y Gran Final con Demo Day. Los proyectos con mayor tracción avanzan en cada etapa.',
  },
  {
    question: '¿Dónde será el evento?',
    category: 'evento',
    answer: 'En el auditorio de ESPAE, campus ESPOL Peñas, en Guayaquil, Ecuador.',
  },
  {
    question: '¿Cuándo es el evento?',
    category: 'evento',
    answer: 'El evento será el 16 de octubre de 2026.',
  },
  {
    question: '¿Cuánto cuesta participar?',
    category: 'inscripcion',
    answer:
      'Las conferencias son gratuitas: solo necesitas inscribirte en el formulario oficial para reservar tu lugar. El taller de Claude Cowork (13:30 a 15:30) tiene un valor de $30 y su pago se completa en el mismo formulario.',
  },
  {
    question: '¿Habrá certificados o premios?',
    category: 'hackathon',
    answer:
      'Estamos cerrando los reconocimientos y premios del hackathon; los anunciaremos antes del evento.',
  },
  {
    question: '¿Cómo me inscribo?',
    category: 'inscripcion',
    answer:
      'Usa el botón de la sección "Registro" un poco más abajo en esta misma página, que te lleva al formulario oficial, o escríbenos directamente a registros@dataijam.com.',
  },
]
