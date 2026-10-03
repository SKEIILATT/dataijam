import josueDavalosPhoto from '@/assets/images/speakers/josue-davalos.jpg'
import pabloEstradaPhoto from '@/assets/images/speakers/pablo-estrada.jpg'

import type { Speaker, UpcomingSpeaker } from './types'

export const speakers: Speaker[] = [
  {
    name: 'Josue Davalos',
    role: 'Lead Computer Vision Engineer en Adaviv',
    education: 'Ing. Ciencias Computacionales',
    bio: 'Comencé mi carrera en acuicultura, trabajando primero con camarones (Ecuador) y luego con salmones (Chile), analizando y prediciendo patrones de crecimiento con series de tiempo y clustering. Luego di el salto a la agricultura, el campo donde más me desenvuelvo. Hoy soy Computer Vision Lead Engineer en Adaviv, donde desarrollo sistemas de IA móviles para salud de plantas y calidad de cosecha, desde la captura de datos en campo hasta su ejecución en tiempo real en el dispositivo.',
    linkedin: 'https://www.linkedin.com/in/josuedavalosc/',
    imageSrc: josueDavalosPhoto,
    imageAlt: 'Retrato de Josue Davalos',
  },
  {
    name: 'Pablo Estrada',
    role: 'Quantitative Modeler en Capital One',
    education: 'Ph.D. en Economía',
    bio: 'Economista enfocado en inferencia causal, machine learning y econometría aplicada. Realizó pasantías en la unidad de investigación del Banco Mundial y en Google Summer of Code, donde desarrolló un paquete open source en Python para estimar efectos de derrame (spillover). Ha publicado investigación sobre efectos de pares, análisis de redes, brechas salariales y contagio financiero. Hoy en Capital One desarrolla modelos econométricos y de machine learning para pronosticar riesgo crediticio.',
    linkedin: 'https://www.linkedin.com/in/pabloestradac',
    imageSrc: pabloEstradaPhoto,
    imageAlt: 'Retrato de Pablo Estrada',
  },
]

// Seven talks in the agenda: names stay hidden until each speaker is announced.
export const upcomingSpeakers: UpcomingSpeaker[] = [{ name: 'Fabricio Layedra' }, {}, {}, {}, {}]

export const speakerTotal = speakers.length + upcomingSpeakers.length
