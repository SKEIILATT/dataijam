export interface FaqItem {
  question: string
  answer: string
}

// Contenido ilustrativo para poder mostrar la sección ya armada. Las
// respuestas evitan inventar datos que todavía no están definidos (fecha
// exacta, costo, premios): esos se marcan como pendientes en vez de
// fabricar una cifra o fecha falsa.
export const faqItems: FaqItem[] = [
  {
    question: '¿Qué es DatAIJam?',
    answer:
      'Es un evento de conferencias y hackathon que reúne a estudiantes, profesionales y comunidad tech alrededor de datos e inteligencia artificial, con el objetivo de aprender, conectar y construir soluciones con impacto real.',
  },
  {
    question: '¿Quién puede participar?',
    answer:
      'Cualquier persona interesada en tecnología, datos o IA: estudiantes, profesionales y curiosos por igual. Las conferencias son abiertas a todo nivel; el hackathon también recibe equipos mixtos de distintas experiencias.',
  },
  {
    question: '¿Necesito experiencia previa en programación o IA?',
    answer:
      'No es obligatorio. Habrá contenido pensado para distintos niveles, y en el hackathon podrás sumarte a un equipo que complemente tus habilidades.',
  },
  {
    question: '¿Puedo inscribirme al hackathon sin tener equipo?',
    answer:
      'Sí. Puedes inscribirte solo y te ayudamos a conectarte con otros participantes para formar equipo, o llegar con tu equipo ya armado.',
  },
  {
    question: '¿Dónde será el evento?',
    answer: 'DatAIJam se vive en Guayaquil, Ecuador.',
  },
  {
    question: '¿Cuándo es el evento?',
    answer:
      'Todavía estamos confirmando la fecha exacta. Regístrate para que te avisemos apenas esté definida.',
  },
  {
    question: '¿Cuánto cuesta participar?',
    answer:
      'Estamos definiendo los detalles de inscripción. Te lo comunicaremos con anticipación antes de abrir el registro definitivo.',
  },
  {
    question: '¿Habrá certificados o premios?',
    answer:
      'Estamos cerrando los reconocimientos y premios del hackathon; los anunciaremos antes del evento.',
  },
  {
    question: '¿Cómo me inscribo?',
    answer:
      'Usa el formulario de la sección "Registro" un poco más abajo en esta misma página, o escríbenos directamente a hola@dataijam.com.',
  },
]
