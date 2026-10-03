import communityImage from '../assets/images/about/community.jpg'
import { ScrollReveal } from '../components/ui/scroll-reveal'
import { About } from '../features/landing/about/About'
import { Experience } from '../features/landing/experience/Experience'
import { Faq } from '../features/landing/faq/Faq'
import { HackathonProcess } from '../features/landing/hackaton/HackathonProcess'
import { Hero } from '../features/landing/hero/Hero'
import { LocationsGrid } from '../features/landing/locations/LocationsGrid'
import { Registration } from '../features/landing/registration/Registration'
import { SpeakerGrid } from '../features/landing/speakers/SpeakerGrid'
import { Sponsors } from '../features/landing/sponsors/Sponsors'

export function HomePage() {
  return (
    <ScrollReveal className="landing-flow landing-home">
      <Hero />
      <div className="landing-editorial">
        <Experience />

        <div id="acerca">
          <About
            eyebrow="SOBRE DATAIJAM"
            heading="Una comunidad que conecta Ecuador con el mundo"
            description="Estudiantes, profesionales y comunidad tech se reúnen para compartir conocimiento y construir soluciones con datos e inteligencia artificial. Una mirada global, un impacto local."
            ctaLabel="Conoce más"
            ctaHref="#hackathon"
            imageSrc={communityImage}
            imageAlt="Ilustración generada con IA de una asistente en una conferencia de tecnología"
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
            subheading="Un hackathon de cuatro semanas: te capacitas, validas tu idea, construyes un prototipo y lo presentas en la Gran Final."
          />
        </div>
        <div id="speakers">
          <SpeakerGrid
            eyebrow="Speakers"
            heading="Voces que inspiran un futuro posible"
            subheading="Expertos que nos acompañarán para inspirar nuevas ideas y conexiones."
          />
        </div>
        <Sponsors />
        <Faq />
        <Registration />
      </div>
    </ScrollReveal>
  )
}
