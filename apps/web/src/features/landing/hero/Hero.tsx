import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'

import logoFull from '@/assets/brand/logo-full.svg'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

type HeroProps = {
  eventLabel?: string
  dateLabel?: string
  locationLabel?: string
  logoSrc?: string
  logoAlt?: string
}

export function Hero({
  eventLabel = 'Conferencias + Hackathon',
  dateLabel = 'Fecha por confirmar',
  locationLabel = 'Ciudad por confirmar',
  logoSrc = logoFull,
  logoAlt = 'DatAIJam',
}: HeroProps) {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-brand-navy py-18 sm:py-24 lg:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-32 top-4 size-96 rounded-full border border-brand-cyan/25 sm:right-0 sm:size-[34rem]" />
        <div className="absolute -right-16 top-20 size-72 rounded-full border-[18px] border-brand-blue/15 sm:right-20 sm:size-96" />
        <div className="absolute right-[8%] top-[17%] size-28 rounded-full bg-brand-lime/20 blur-2xl" />
        <div className="absolute -bottom-36 right-[-10%] h-96 w-[46rem] rounded-[50%] border border-brand-cyan/25 bg-[radial-gradient(ellipse_at_center,_rgba(8,205,239,0.16),_transparent_62%)]" />
        <div className="absolute inset-0 bg-linear-to-r from-brand-navy via-brand-navy/80 to-brand-blue/10" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(16rem,2fr)]">
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">
              {eventLabel}
            </p>
            <h1 id="hero-heading" className="mt-5 max-w-2xl text-h1 font-bold text-brand-white">
              El conocimiento viaja.
              <span className="hero__accent block bg-clip-text text-transparent">
                El talento nos conecta.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-brand-white/75 sm:text-lg sm:leading-8">
              Un encuentro para aprender, colaborar y convertir ideas en soluciones con impacto.
            </p>

            <dl className="mt-8 flex flex-col gap-4 text-sm sm:flex-row sm:gap-8">
              <div className="flex items-center gap-3 text-brand-white">
                <CalendarDays aria-hidden="true" className="size-5 text-brand-cyan" />
                <div>
                  <dt className="sr-only">Fecha</dt>
                  <dd>{dateLabel}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3 text-brand-white">
                <MapPin aria-hidden="true" className="size-5 text-brand-cyan" />
                <div>
                  <dt className="sr-only">Ubicación</dt>
                  <dd>{locationLabel}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button as="a" href="#registro" variant="primary" className="group min-h-12">
                Quiero asistir
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </Button>
              <Button as="a" href="#acerca" variant="secondary" className="min-h-12">
                Conoce más
              </Button>
            </div>
          </div>
          <img
            src={logoSrc}
            alt={logoAlt}
            className="mx-auto hidden w-full max-w-xs drop-shadow-[0_0_2rem_rgba(8,205,239,0.3)] lg:block"
          />
        </div>
      </Container>
    </section>
  )
}
