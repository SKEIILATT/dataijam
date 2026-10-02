import { Globe2, Lightbulb, Sparkles, UsersRound } from 'lucide-react'

import { Container } from '@/components/ui/container'

const benefits = [
  { icon: UsersRound, title: 'Personas', description: 'Talento que inspira' },
  { icon: Lightbulb, title: 'Ideas', description: 'Conocimiento sin fronteras' },
  { icon: Sparkles, title: 'Soluciones', description: 'Retos reales, impacto tangible' },
  { icon: Globe2, title: 'Ecuador', description: 'Una comunidad global' },
]

export function BenefitsBand() {
  return (
    <section
      aria-label="Valores de DatAIJam"
      className="benefits-editorial py-8 text-brand-white sm:py-10"
    >
      <Container>
        <ul data-stagger className="benefits-editorial__grid">
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <li key={title} data-reveal className="benefits-editorial__item">
              <span className="benefits-editorial__number" aria-hidden="true">
                0{index + 1}
              </span>
              <Icon aria-hidden="true" className="size-6 shrink-0 text-brand-cyan" />
              <div>
                <h2 className="ds-card-title text-brand-white">{title}</h2>
                <p className="mt-1 text-sm text-brand-gray">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
