import { ArrowUpRight, CalendarDays, ChevronDown, Users } from 'lucide-react'
import { useId, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { GridPulse } from '@/components/ui/GridPulse'

import { HackathonEvaluation } from './HackathonEvaluation'
import { HackathonWeeks } from './HackathonWeeks'

interface HackathonProcessProps {
  eyebrow: string
  heading: string
  subheading: string
}

export function HackathonProcess({ eyebrow, heading, subheading }: HackathonProcessProps) {
  const [rubricsOpen, setRubricsOpen] = useState(false)
  const rubricsId = useId()

  return (
    <section aria-labelledby="hackathon-process-heading" className="ds-section hackathon-section">
      <GridPulse />
      <Container className="hackathon-section__content">
        <div data-reveal className="hackathon-intro max-w-2xl">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">
            {eyebrow}
          </p>
          <h2
            id="hackathon-process-heading"
            className="mt-3 text-h2 font-semibold text-brand-white"
          >
            {heading}
          </h2>
          <p className="mt-4 text-body text-brand-gray">{subheading}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-brand-white">
              <li className="inline-flex items-center gap-2">
                <CalendarDays aria-hidden="true" className="size-4 text-brand-cyan" />4 semanas
              </li>
              <li className="inline-flex items-center gap-2">
                <Users aria-hidden="true" className="size-4 text-brand-cyan" />
                Equipos de 3 a 4 personas
              </li>
            </ul>
            <Button as="a" href="#registro" variant="secondary">
              Quiero ser parte <ArrowUpRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </div>

        <HackathonWeeks />

        <section
          data-reveal
          className="hackathon-evaluation"
          data-open={rubricsOpen}
          aria-labelledby="evaluation-heading"
        >
          <header className="hackathon-evaluation__heading">
            <div>
              <h3 id="evaluation-heading" className="text-brand-white">
                ¿Cómo se evalúan los proyectos?
              </h3>
              <p className="mt-2 text-sm text-brand-gray">
                Dos rúbricas: una eliminatoria en la semana 2 y la final del jurado en la semana 4.
              </p>
            </div>
            <button
              type="button"
              aria-expanded={rubricsOpen}
              aria-controls={rubricsId}
              onClick={() => setRubricsOpen((open) => !open)}
              className="ds-button ds-button--secondary hackathon-evaluation__toggle"
            >
              {rubricsOpen ? 'Ocultar criterios' : 'Ver criterios'}
              <ChevronDown aria-hidden="true" className="size-4" />
            </button>
          </header>
          <div id={rubricsId} hidden={!rubricsOpen} className="hackathon-evaluation__reveal">
            <HackathonEvaluation />
          </div>
        </section>
      </Container>
    </section>
  )
}

export default HackathonProcess
