import { Container } from '@/components/ui/container'

import { SpeakerCard } from './SpeakerCard'
import { speakers } from './speakers.data'

interface SpeakerGridProps {
  eyebrow: string
  heading: string
  subheading: string
}

export function SpeakerGrid({ eyebrow, heading, subheading }: SpeakerGridProps) {
  const [featuredSpeaker, ...otherSpeakers] = speakers

  if (!featuredSpeaker) {
    return null
  }

  return (
    <section
      aria-labelledby="speaker-grid-heading"
      className="relative overflow-hidden border-t border-brand-cyan/30 bg-brand-blue/10 py-16 sm:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-12 size-96 rounded-full border border-brand-cyan/20" />
        <div className="absolute -right-32 bottom-[-16rem] size-[34rem] rounded-full bg-brand-blue/15 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="max-w-4xl">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">
            {eyebrow}
          </p>
          <h2
            id="speaker-grid-heading"
            className="mt-3 max-w-3xl text-h2 font-semibold text-brand-white"
          >
            {heading}
          </h2>
          <p className="mt-5 max-w-3xl text-body text-brand-white/70">{subheading}</p>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)]">
          <ul aria-label="Speaker destacado">
            <SpeakerCard speaker={featuredSpeaker} featured />
          </ul>

          <ul className="grid gap-4 sm:grid-cols-2" aria-label="Más speakers del evento">
            {otherSpeakers.map((speaker, index) => (
              <SpeakerCard
                key={`${speaker.name}-${index}`}
                speaker={speaker}
                className={index === otherSpeakers.length - 1 ? 'sm:col-span-2' : ''}
              />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

export default SpeakerGrid
