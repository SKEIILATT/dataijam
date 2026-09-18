import { ArrowRight } from 'lucide-react'

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
    <section aria-labelledby="about-heading" className="bg-brand-navy py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand-cyan">{eyebrow}</p>

            <h2
              id="about-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-brand-white sm:text-4xl"
            >
              {heading}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-brand-gray sm:text-lg">
              {description}
            </p>

            <a
              href={ctaHref}
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-cyan px-6 py-3 text-sm font-semibold text-brand-navy transition-colors duration-200 hover:bg-brand-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
            >
              {ctaLabel}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>

          <figure className="aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/10]">
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
