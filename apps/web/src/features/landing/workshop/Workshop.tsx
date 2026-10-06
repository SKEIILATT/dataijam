import { ArrowRight, CalendarDays, Clock, Wrench } from 'lucide-react'
import { FaLinkedinIn } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { workshop } from './workshop.data'
import './workshop.css'

export function Workshop() {
  const { instructor, schedule, price, cta } = workshop

  return (
    <section id="taller" aria-labelledby="workshop-heading" className="ds-section workshop-section">
      <Container>
        <div className="workshop-card">
          <div data-reveal className="workshop-card__body">
            <p className="workshop-card__eyebrow">{workshop.eyebrow}</p>
            <h2 id="workshop-heading" className="workshop-card__title mt-3">
              {workshop.title}
            </h2>
            <p className="workshop-card__text mt-4 max-w-md text-body">{workshop.description}</p>

            <ul className="workshop-card__meta">
              <li>
                <Clock aria-hidden="true" className="size-4" />
                <time dateTime={`2026-10-16T${schedule.start}`}>{schedule.start}</time>
                {' – '}
                <time dateTime={`2026-10-16T${schedule.end}`}>{schedule.end}</time>
              </li>
              <li>
                <CalendarDays aria-hidden="true" className="size-4" />
                {schedule.label}
              </li>
            </ul>

            <div className="workshop-card__price">
              <p className="workshop-card__amount">
                <Wrench aria-hidden="true" className="size-5" />
                <span>{price.amount}</span>
              </p>
              <p className="workshop-card__note text-xs leading-5">{price.note}</p>
            </div>

            <Button as="a" href={cta.href} className="group mt-8 w-full sm:w-auto">
              {cta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </div>

          <figure data-reveal className="workshop-instructor">
            <div className="workshop-instructor__portrait">
              <img
                src={instructor.imageSrc}
                alt={instructor.imageAlt}
                width={400}
                height={400}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="workshop-instructor__info">
              <p className="workshop-instructor__label">Instructor</p>
              <h3 className="font-heading text-lg font-semibold">{instructor.name}</h3>
              <p className="mt-1 text-sm leading-5">{instructor.role}</p>
              <a
                href={instructor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn de ${instructor.name} (abre en otra pestaña)`}
                className="speaker-editorial__social mt-4"
              >
                <FaLinkedinIn aria-hidden="true" className="size-4" />
              </a>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}

export default Workshop
