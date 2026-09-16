import { Container } from '../components/ui/container'

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
            La landing esta en construccion. Cada seccion sera integrada por el equipo desde
            features/landing.
          </p>
        </Container>
      </section>

      <section id="acerca" aria-label="Acerca de DatAIJam" />
      <section id="conferencias" aria-label="Conferencias" />
      <section id="hackathon" aria-label="Hackathon" />
      <section id="speakers" aria-label="Speakers" />
      <section id="patrocinadores" aria-label="Patrocinadores" />
      <section id="faq" aria-label="Preguntas frecuentes" />
      <section id="registro" aria-label="Registro" />
    </>
  )
}
