import type { LucideIcon } from 'lucide-react'

import { Container } from './container'

interface ComingSoonBlock {
  id: string
  icon: LucideIcon
  title: string
  description: string
}

interface ComingSoonSectionProps {
  blocks: ComingSoonBlock[]
}

export function ComingSoonSection({ blocks }: ComingSoonSectionProps) {
  return (
    <section aria-label="Contenido en preparación" className="ds-section ds-section--quiet">
      <Container>
        <ul className={`grid gap-6 ${blocks.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {blocks.map(({ id, icon: Icon, title, description }) => (
            <li key={id} data-reveal id={id} className="ds-card ds-card--quiet scroll-mt-24 p-6">
              <div
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan"
              >
                <Icon aria-hidden="true" className="size-6" />
              </div>
              <h2 className="mt-4 ds-card-title text-brand-white">{title}</h2>
              <p className="mt-2 text-body text-brand-gray">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default ComingSoonSection
