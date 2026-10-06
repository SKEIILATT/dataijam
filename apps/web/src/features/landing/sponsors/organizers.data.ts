import aefcshLogo from '@/assets/images/organizers/aefcsh.svg'
import aefcshLightLogo from '@/assets/images/organizers/aefcsh-light.png'
import bootcampsLogo from '@/assets/images/organizers/bootcamps.png'
import bootcampsLightLogo from '@/assets/images/organizers/bootcamps-light.png'
import espolLogo from '@/assets/images/organizers/espol.webp'
import espolLightLogo from '@/assets/images/organizers/espol-light.png'
import tawsLogo from '@/assets/images/organizers/taws.svg'

export interface Organizer {
  id: string
  name: string
  /** Transparent logo for the dark theme; without one the name stands in for it. */
  logo?: string
  /** Variant with dark ink for the light theme, when the main logo is light. */
  logoLight?: string
}

export const leadOrganizers: Organizer[] = [
  {
    id: 'bootcamps',
    name: 'Coding Bootcamps ESPOL',
    logo: bootcampsLogo,
    logoLight: bootcampsLightLogo,
  },
  { id: 'espol', name: 'ESPOL', logo: espolLogo, logoLight: espolLightLogo },
]

export const coOrganizers: Organizer[] = [
  { id: 'taws', name: 'TAWS', logo: tawsLogo },
  {
    id: 'aefcsh',
    name: 'Asociación de Estudiantes FCSH',
    logo: aefcshLogo,
    logoLight: aefcshLightLogo,
  },
]
