import { Container } from '@/components/ui/container'

import { SpeakerCarousel } from './SpeakerCarousel'
import { speakers } from './speakers.data'

interface SpeakerGridProps {
  eyebrow: string
  heading: string
  subheading: string
}

export function SpeakerGrid({ eyebrow, heading, subheading }: SpeakerGridProps) {
  if (!speakers.length) {
    return null
  }

  return (
    <section
      aria-labelledby="speaker-grid-heading"
      className="ds-section speakers-section relative overflow-hidden"
    >
      <Container className="relative">
        <div data-reveal className="speakers-heading">
          <div className="max-w-xl">
            <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">
              {eyebrow}
            </p>
            <h2
              id="speaker-grid-heading"
              className="mt-3 max-w-2xl text-h2 font-semibold text-brand-white"
            >
              {heading}
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="mt-4 max-w-2xl text-body text-brand-gray">{subheading}</p>
            <p className="mt-4 text-xs font-medium tracking-[0.12em] text-brand-cyan uppercase">
              Próximamente · Voces 2026
            </p>
          </div>
        </div>

        <SpeakerCarousel speakers={speakers} />
      </Container>
    </section>
  )
}

export default SpeakerGrid
