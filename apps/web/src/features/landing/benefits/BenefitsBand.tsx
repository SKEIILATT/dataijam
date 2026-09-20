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
      className="bg-brand-white py-8 text-brand-navy sm:py-10"
    >
      <Container>
        <ul className="grid divide-y divide-brand-navy/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="flex items-center gap-4 px-1 py-5 first:pt-0 last:pb-0 sm:px-6 sm:py-2 sm:first:pl-0 sm:last:pr-0 lg:block lg:text-center"
            >
              <Icon
                aria-hidden="true"
                className="size-8 shrink-0 text-brand-blue lg:mx-auto lg:size-9"
              />
              <div className="lg:mt-3">
                <h2 className="text-h4 font-medium text-brand-navy">{title}</h2>
                <p className="mt-1 text-sm text-brand-navy/65">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
