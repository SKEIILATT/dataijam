import { Container } from '../components/ui/container'
import { HackathonProcess } from '../features/landing/hackaton/HackathonProcess'
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

      <section id="acerca" aria-label="Acerca de DatAIJam" />
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
