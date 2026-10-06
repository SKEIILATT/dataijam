import { ArrowUpRight, CalendarDays, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { GridPulse } from '@/components/ui/GridPulse'
import { HackathonWeeks } from './HackathonWeeks'

interface HackathonProcessProps {
  eyebrow: string
  heading: string
  subheading: string
}

export function HackathonProcess({ eyebrow, heading, subheading }: HackathonProcessProps) {
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
      </Container>
    </section>
  )
}

export default HackathonProcess
