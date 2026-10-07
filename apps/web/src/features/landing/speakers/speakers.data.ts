import fabricioLayedraPhoto from '@/assets/images/speakers/fabricio-layedra.jpg'
import georgeGuerreroPhoto from '@/assets/images/speakers/george-guerrero.jpg'
import josueDavalosPhoto from '@/assets/images/speakers/josue-davalos.jpg'

import type { Speaker, UpcomingSpeaker } from './types'

export const speakers: Speaker[] = [
  {
    name: 'Fabricio Layedra',
    role: 'Gerente Regional de Inversiones Inteligentes en Rappi Turbo',
    education: 'Máster en Marketing Digital y Comercio Electrónico · Universidad de Barcelona',
    bio: 'Graduado en Ciencias de la Computación por ESPOL y máster en Marketing Digital y Comercio Electrónico por la Universidad de Barcelona. Fue Microsoft Research Intern en Simon Fraser University, Canadá, y es alumni de Google Summer of Code. Ha liderado proyectos de adopción digital y nuevos productos en Ecuador y más de siete países de Latinoamérica con multinacionales de retail y logística de última milla. Integra procesos, personas y tecnología para resolver problemas empresariales complejos. Ha trabajado para Inmobiliaria del Sol, Anheuser Busch Inbev y Rappi Latinoamérica.',
    linkedin: 'https://www.linkedin.com/in/fabriciolayedra/',
    imageSrc: fabricioLayedraPhoto,
    imageAlt: 'Retrato de Fabricio Layedra',
    imagePosition: '65% 20%',
  },
  {
    name: 'Josué Dávalos',
    role: 'Lead Computer Vision Engineer en Adaviv',
    education: 'Ing. Ciencias Computacionales',
    bio: 'Comencé mi carrera en acuicultura, trabajando primero con camarones (Ecuador) y luego con salmones (Chile), analizando y prediciendo patrones de crecimiento con series de tiempo y clustering. Luego di el salto a la agricultura, el campo donde más me desenvuelvo. Hoy soy Computer Vision Lead Engineer en Adaviv, donde desarrollo sistemas de IA móviles para salud de plantas y calidad de cosecha, desde la captura de datos en campo hasta su ejecución en tiempo real en el dispositivo.',
    linkedin: 'https://www.linkedin.com/in/josuedavalosc/',
    imageSrc: josueDavalosPhoto,
    imageAlt: 'Retrato de Josué Dávalos',
  },
  {
    name: 'George Alejandro Guerrero Cáceres',
    role: 'Especialista de Analítica de Datos en Claro',
    education: 'Economía · ESPOL',
    bio: 'Economista graduado de ESPOL en 2024, con experiencia en investigación, inteligencia de negocios, análisis financiero y analítica de datos. Inició su carrera como Asistente de Investigación en ESPAE y posteriormente se desempeñó como Analista de Inteligencia de Negocios en una importante empresa del sector de alimentos. Su trayectoria continuó en Claro, donde trabajó en Análisis y Planeación Financiera y donde actualmente es Especialista de Analítica de Datos, combinando el análisis cuantitativo y el uso de herramientas de datos para generar información que contribuya a la toma de decisiones y al desarrollo de iniciativas de negocio.',
    linkedin: 'https://ec.linkedin.com/in/gguerrero-ec',
    imageSrc: georgeGuerreroPhoto,
    imageAlt: 'Retrato de George Alejandro Guerrero Cáceres',
  },
]

export const upcomingSpeakers: UpcomingSpeaker[] = []

export const speakerTotal = speakers.length + upcomingSpeakers.length
