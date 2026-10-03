import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { ScrollExpandMedia } from '@/components/ui/ScrollExpandMedia'
import { AgendaDialog } from '../agenda/AgendaDialog'
import { experienceContent as content } from './experience.data'

export function Experience() {
  return (
    <ScrollExpandMedia
      mediaSrc={content.media.src}
      mediaAlt={content.media.alt}
      streamImages={content.stream}
      eyebrow={content.eyebrow}
      titleStart={content.titleStart}
      titleEnd={content.titleEnd}
      hint={content.hint}
      className="theme-dark"
    >
      <Container>
        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">
            {content.label}
          </p>
          <h3 className="mt-4 text-h3 font-semibold text-brand-white">{content.heading}</h3>
          <p className="mt-4 text-base leading-7 text-brand-gray sm:text-lg sm:leading-8">
            {content.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href={content.cta.href} variant="primary" className="group">
              {content.cta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Button>
            <AgendaDialog />
          </div>
        </div>
      </Container>
    </ScrollExpandMedia>
  )
}
