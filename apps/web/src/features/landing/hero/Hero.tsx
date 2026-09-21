import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { useEffect, useRef } from 'react'

import symbol from '@/assets/brand/symbol.svg'
import tagline from '@/assets/brand/tagline-light.svg'
import wordmark from '@/assets/brand/wordmark.png'
import { RotatingGlobe } from './RotatingGlobe'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

type HeroProps = {
  eventLabel?: string
  dateLabel?: string
  locationLabel?: string
}

export function Hero({
  eventLabel = 'Conferencias + Hackathon',
  dateLabel = 'Fecha por confirmar',
  locationLabel = 'Ciudad por confirmar',
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
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">
              {eventLabel}
            </p>
            <h1 id="hero-heading" className="mt-4 max-w-2xl text-h1 font-bold text-brand-white">
              El conocimiento viaja.
              <span className="hero__accent block bg-clip-text text-transparent">
                El talento nos conecta.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-brand-gray sm:text-lg sm:leading-8">
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button as="a" href="#registro" variant="primary" className="group">
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
              <img src={symbol} alt="" className="hero-brand-lockup__symbol" />
            </div>
            <img
              src={wordmark}
              alt="DatAIJam"
              className="hero-brand-lockup__wordmark site-header__wordmark"
            />
            <span
              role="img"
              aria-label="Datos, personas, acción"
              className="hero-brand-lockup__tagline"
              style={{ maskImage: `url(${tagline})` }}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
