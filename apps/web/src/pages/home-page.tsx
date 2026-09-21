import aboutPlaceholder from '../assets/images/about/about-placeholder.svg'
import { ScrollReveal } from '../components/ui/scroll-reveal'
import { About } from '../features/landing/about/About'
import { BenefitsBand } from '../features/landing/benefits/BenefitsBand'
import { Faq } from '../features/landing/faq/Faq'
import { HackathonProcess } from '../features/landing/hackaton/HackathonProcess'
import { Hero } from '../features/landing/hero/Hero'
import { LocationsGrid } from '../features/landing/locations/LocationsGrid'
import { Registration } from '../features/landing/registration/Registration'
import { SpeakerGrid } from '../features/landing/speakers/SpeakerGrid'
import { Sponsors } from '../features/landing/sponsors/Sponsors'

export function HomePage() {
  return (
    <ScrollReveal>
      <Hero />
      <BenefitsBand />

      <div id="acerca">
        <About
          heading="DatAIJam conecta talento e ideas con impacto"
          description="Un espacio de aprendizaje y colaboración donde estudiantes, profesionales y comunidad tech se reúnen para construir soluciones con inteligencia artificial (texto de ejemplo)."
          ctaLabel="Conoce más"
          ctaHref="#hackathon"
          imageSrc={aboutPlaceholder}
          imageAlt="Imagen de ejemplo que representa la comunidad de DatAIJam, pendiente de reemplazo"
        />
      </div>
      <section id="sedes">
        <LocationsGrid
          heading="Un evento, una ciudad"
          subheading="DatAIJam se vive en Guayaquil, conectando a la comunidad tech para crear impacto en el país."
        />
      </section>
      <div id="hackathon">
        <HackathonProcess
          eyebrow="Hackathon"
          heading="De la idea a una solución con impacto"
          subheading="Conoce el recorrido para participar, colaborar y presentar tu proyecto durante DatAIJam."
        />
      </div>
      <div id="speakers">
        <SpeakerGrid
          eyebrow="Speakers"
          heading="Conoce a quienes comparten su experiencia"
          subheading="Expertos que nos acompañarán para inspirar nuevas ideas y conexiones."
        />
      </div>
      <Sponsors />
      <Faq />
      <Registration />
    </ScrollReveal>
  )
}
