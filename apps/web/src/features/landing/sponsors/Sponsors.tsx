import { MoveUpRight, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { sponsors } from './sponsors.data'
import type { Sponsor } from './sponsors.data'

function SponsorLogo({ sponsor, decorative = false }: { sponsor: Sponsor; decorative?: boolean }) {
  const [failed, setFailed] = useState(false)
  const content = failed ? (
    <span className="font-semibold text-footer-ink">{sponsor.name}</span>
  ) : (
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      loading="lazy"
      width={180}
      height={72}
      onError={() => setFailed(true)}
    />
  )

  return sponsor.website && !decorative ? (
    <a
      className="sponsor-logo"
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${sponsor.name} (abre en otra pestaña)`}
    >
      {content}
      <MoveUpRight aria-hidden="true" className="sponsor-logo__arrow size-4" />
    </a>
  ) : (
    <div className="sponsor-logo">{content}</div>
  )
}

export function Sponsors() {
  const viewport = useRef<HTMLDivElement>(null)
  const hasSponsors = sponsors.length > 0
  const itemCount = hasSponsors ? Math.ceil(6 / sponsors.length) * sponsors.length : 6

  useEffect(() => {
    const element = viewport.current
    if (!element) return
    let visible = true
    const update = () => {
      element.dataset.running = String(visible && !document.hidden)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    })
    observer.observe(element)
    document.addEventListener('visibilitychange', update)
    update()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return (
    <section
      id="patrocinadores"
      aria-labelledby="sponsors-heading"
      className="ds-section sponsors-section"
    >
      <Container>
        <div data-reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">
              Patrocinadores
            </p>
            <h2 id="sponsors-heading" className="mt-3 text-h2 font-semibold text-brand-white">
              Juntos hacemos posible lo que viene
            </h2>
            <p className="mt-4 text-body text-brand-gray">
              {hasSponsors
                ? 'Las marcas que apoyan el talento, las ideas y las conexiones de DatAIJam.'
                : 'Estamos preparando las alianzas del evento. Pronto conocerás a las marcas que nos acompañarán.'}
            </p>
          </div>
          <Button
            as="a"
            href="mailto:hola@dataijam.com?subject=Quiero%20patrocinar%20DatAIJam"
            variant="secondary"
            className="self-start shrink-0 lg:self-auto"
          >
            Quiero ser patrocinador <MoveUpRight aria-hidden="true" className="size-4" />
          </Button>
        </div>

        <div className="ds-content-gap">
          <div
            ref={viewport}
            className="sponsors-marquee"
            role="region"
            aria-label="Patrocinadores del evento"
          >
            <div className="sponsors-track">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  className="sponsors-group"
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {Array.from({ length: itemCount }, (_, index) => {
                    const duplicate = copy === 1 || (hasSponsors && index >= sponsors.length)
                    return (
                      <li
                        key={index}
                        className="sponsors-slide"
                        aria-hidden={duplicate ? true : undefined}
                      >
                        {hasSponsors ? (
                          <SponsorLogo
                            sponsor={sponsors[index % sponsors.length]}
                            decorative={duplicate}
                          />
                        ) : (
                          <div className="sponsor-placeholder">
                            <span className="sponsor-placeholder__number">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <Plus aria-hidden="true" className="size-7" />
                            <span className="text-sm font-medium">Tu marca aquí</span>
                            <span className="text-xs text-brand-gray">Espacio disponible</span>
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-brand-gray">
            {hasSponsors
              ? 'Alianzas que impulsan nuestra comunidad.'
              : 'Patrocinadores por confirmar · Espacios ilustrativos'}
          </p>
        </div>
      </Container>
    </section>
  )
}
