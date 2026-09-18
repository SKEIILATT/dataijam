import aboutPlaceholder from '../assets/images/about/about-placeholder.svg'
import { Container } from '../components/ui/container'
import { About } from '../features/landing/about/About'
import { HackathonProcess } from '../features/landing/hackaton/HackathonProcess'
import { LocationsGrid } from '../features/landing/locations/LocationsGrid'
import { SpeakerGrid } from '../features/landing/speakers/SpeakerGrid'

export function HomePage() {
  return (
    <>
      <section id="inicio" className="min-h-96 py-20 sm:py-28">
        <Container>
          <p className="text-sm font-semibold tracking-[0.18em] text-brand-cyan">DATAIJAM 2026</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            El conocimiento viaja. El talento nos conecta.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-gray">
            Aquí ya va lo de ustedes :)
          </p>
        </Container>
      </section>

      <div id="acerca">
        <About
          eyebrow="Acerca de"
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
          eyebrow="Sedes"
          heading="Un evento, dos ciudades"
          subheading="DatAIJam se vive en Quito y Guayaquil, acercando la comunidad tech a más personas en el país."
        />
      </section>
      <section id="conferencias" aria-label="Conferencias" />
      <div id="hackathon">
        <HackathonProcess
          eyebrow="Hackathon"
          heading="De la idea a una soluciÃ³n con impacto"
          subheading="Conoce el recorrido para participar, colaborar y presentar tu proyecto durante DatAIJam."
        />
      </div>
      <div id="speakers">
        <SpeakerGrid
          eyebrow="Speakers"
          heading="Conoce a quienes comparten su experiencia"
          subheading="Expertos que nos acompaÃ±arÃ¡n para inspirar nuevas ideas y conexiones."
        />
      </div>
      <section id="patrocinadores" aria-label="Patrocinadores" />
      <section id="faq" aria-label="Preguntas frecuentes" />
      <section id="registro" aria-label="Registro" />
    </>
  )
}
