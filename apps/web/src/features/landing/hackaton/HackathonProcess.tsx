import { Container } from '@/components/ui/container'

import { HackathonStep } from './HackathonStep'
import { steps } from './hackathon.data'

interface HackathonProcessProps {
  eyebrow: string
  heading: string
  subheading: string
}

export function HackathonProcess({ eyebrow, heading, subheading }: HackathonProcessProps) {
  return (
    <section aria-labelledby="hackathon-process-heading" className="ds-section ds-section--quiet">
      <Container>
        <div data-reveal className="mx-auto max-w-2xl text-center">
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
        </div>

        <ol
          className="ds-content-gap grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Pasos del hackathon"
        >
          {steps.map((step, index) => (
            <HackathonStep key={step.title} step={step} index={index} />
          ))}
        </ol>
      </Container>
    </section>
  )
}

export default HackathonProcess
