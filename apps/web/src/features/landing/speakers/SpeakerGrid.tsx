import { Container } from '@/components/ui/container'
import { CountUp } from '@/components/ui/CountUp'

import { SpeakerCarousel } from './SpeakerCarousel'
import { speakers, speakerTotal, upcomingSpeakers } from './speakers.data'

interface SpeakerGridProps {
  eyebrow: string
  heading: string
  subheading: string
}

export function SpeakerGrid({ eyebrow, heading, subheading }: SpeakerGridProps) {
  if (!speakerTotal) {
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
            <p className="speakers-count">
              <span className="speakers-count__number">
                <CountUp value={speakerTotal} />
              </span>
              <span className="speakers-count__label">speakers el 16 de octubre</span>
            </p>
            <p className="mt-3 text-body text-brand-gray">{subheading}</p>
          </div>
        </div>

        <SpeakerCarousel speakers={speakers} upcoming={upcomingSpeakers} />
      </Container>
    </section>
  )
}

export default SpeakerGrid
