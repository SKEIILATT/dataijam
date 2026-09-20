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
    <section
      aria-label="Contenido en preparación"
      className="border-t border-brand-cyan/20 bg-brand-white/5 py-16 sm:py-24"
    >
      <Container>
        <ul className="grid gap-6 md:grid-cols-3">
          {blocks.map(({ id, icon: Icon, title, description }) => (
            <li
              key={id}
              id={id}
              className="scroll-mt-24 rounded-2xl border border-brand-cyan/15 bg-brand-white/5 p-6"
            >
              <div
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan"
              >
                <Icon aria-hidden="true" className="size-5" />
              </div>
              <h2 className="mt-4 text-h4 font-semibold text-brand-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-brand-gray">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default ComingSoonSection
