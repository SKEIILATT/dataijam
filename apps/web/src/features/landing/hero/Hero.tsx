import { ArrowRight, CalendarDays, MapPin, Ticket } from 'lucide-react'
import { useEffect, useRef } from 'react'

import symbol from '@/assets/brand/symbol.webp'
import taglineAccent from '@/assets/brand/tagline-accent.webp'
import taglineMask from '@/assets/brand/tagline-mask.webp'
import { RotatingGlobe } from './RotatingGlobe'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { GradientText } from '@/components/ui/GradientText'
import { RevealWords } from '@/components/ui/RevealWords'
import { Wordmark } from '@/components/ui/Wordmark'

type HeroProps = {
  dateLabel?: string
  locationLabel?: string
}

export function Hero({
  dateLabel = '16 de octubre de 2026',
  locationLabel = 'Guayaquil, Ecuador',
}: HeroProps) {
  const brandRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const brand = brandRef.current
    if (!brand) return
    let cancelled = false
    const images = Array.from(brand.querySelectorAll('img'))
    void Promise.allSettled(images.map((image) => image.decode())).then(() => {
      if (!cancelled) brand.dataset.brandReady = 'true'
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="ds-hero-curve relative isolate overflow-hidden bg-brand-navy py-10 sm:py-14"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <RotatingGlobe />
        <div className="absolute inset-0 bg-linear-to-r from-brand-navy via-brand-navy/80 to-brand-blue/10" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="hero-copy">
            <h1 id="hero-heading" className="max-w-2xl text-h1 font-bold text-brand-white">
              <RevealWords text="El conocimiento viaja." />
              <GradientText>
                <RevealWords text="El talento nos conecta." delay={0.24} />
              </GradientText>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-brand-gray sm:text-lg sm:leading-8">
              Conferencias y un hackathon de cuatro semanas sobre datos e IA para aprender,
              colaborar y convertir ideas en soluciones con impacto.
            </p>

            <dl className="mt-8 flex flex-col gap-4 text-sm sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
              <div className="text-brand-white">
                <dt className="sr-only">Fecha</dt>
                <dd className="flex items-center gap-3">
                  <CalendarDays aria-hidden="true" className="size-5 text-brand-cyan" />
                  {dateLabel}
                </dd>
              </div>
              <div className="text-brand-white">
                <dt className="sr-only">Ubicación</dt>
                <dd className="flex items-center gap-3">
                  <MapPin aria-hidden="true" className="size-5 text-brand-cyan" />
                  {locationLabel}
                </dd>
              </div>
              <div className="text-brand-white">
                <dt className="sr-only">Costo</dt>
                <dd className="flex items-center gap-3">
                  <Ticket aria-hidden="true" className="size-5 text-brand-cyan" />
                  Entrada gratuita
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button as="a" href="#registro" variant="primary" className="group hero-cta-shine">
                Quiero asistir
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </Button>
              <Button as="a" href="#acerca" variant="secondary">
                Conoce más
              </Button>
            </div>
          </div>
          <div ref={brandRef} data-brand-ready="false" className="hero-brand-lockup hidden lg:flex">
            <div className="hero-brand-lockup__arrival">
              <span className="hero-brand-lockup__orbit" aria-hidden="true" />
              <img
                src={symbol}
                alt=""
                width={704}
                height={504}
                className="hero-brand-lockup__symbol"
              />
            </div>
            <Wordmark className="hero-brand-lockup__wordmark" imageClassName="h-auto w-full" />
            <span
              role="img"
              aria-label="Datos, personas, acción"
              className="hero-brand-lockup__tagline"
            >
              <span
                className="hero-brand-lockup__tagline-text"
                style={{ maskImage: `url(${taglineMask})` }}
              />
              <img
                src={taglineAccent}
                alt=""
                width={1185}
                height={45}
                className="hero-brand-lockup__tagline-accent"
              />
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
