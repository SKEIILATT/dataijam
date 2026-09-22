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
      className="ds-band ds-contrast py-8 text-brand-white sm:py-12"
    >
      <Container>
        <ul
          data-stagger
          className="grid divide-y divide-brand-white/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
        >
          {benefits.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              data-reveal
              className="flex items-center gap-4 px-0 py-6 first:pt-0 last:pb-0 sm:px-6 sm:py-2 sm:first:pl-0 sm:last:pr-0 lg:block lg:text-center"
            >
              <Icon aria-hidden="true" className="size-6 shrink-0 text-brand-cyan lg:mx-auto" />
              <div className="lg:mt-3">
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
