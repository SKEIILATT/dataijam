import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

import { ImpactMetrics } from './ImpactMetrics'
import type { AboutProps } from './types'

export function About({
  eyebrow,
  heading,
  description,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: AboutProps) {
  return (
    <section aria-labelledby="about-heading" className="ds-section ds-section--accented">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div data-reveal>
            {eyebrow && (
              <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan">{eyebrow}</p>
            )}

            <h2 id="about-heading" className="mt-3 text-h2 font-semibold text-brand-white">
              {heading}
            </h2>

            <p className="mt-4 max-w-xl text-body text-brand-gray">{description}</p>

            <Button as="a" href={ctaHref} variant="secondary" className="mt-8">
              {ctaLabel}
            </Button>
          </div>

          <figure data-reveal="side" className="ds-image-frame aspect-[4/3] overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>

        <ImpactMetrics />
      </Container>
    </section>
  )
}

export default About
