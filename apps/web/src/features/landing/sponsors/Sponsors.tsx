import { MoveUpRight, Sparkles } from 'lucide-react'
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components/ui/container'
import { usePrefersReducedMotion } from '@/components/ui/use-prefers-reduced-motion'
import { coOrganizers, leadOrganizers } from './organizers.data'
import type { Organizer } from './organizers.data'
import { sponsors } from './sponsors.data'
import type { Sponsor } from './sponsors.data'

function OrganizerLogo({ organizer }: { organizer: Organizer }) {
  if (!organizer.logo) {
    return <span className="organizer organizer__name">{organizer.name}</span>
  }
  return (
    <span className="organizer">
      <img
        src={organizer.logo}
        alt={organizer.name}
        className={organizer.logoLight ? 'organizer__logo--dark' : undefined}
      />
      {organizer.logoLight && (
        <img src={organizer.logoLight} alt={organizer.name} className="organizer__logo--light" />
      )}
    </span>
  )
}

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
  const track = useRef<HTMLDivElement>(null)
  const hasSponsors = sponsors.length > 0
  const itemCount = hasSponsors ? Math.ceil(6 / sponsors.length) * sponsors.length : 6
  const reducedMotion = usePrefersReducedMotion()
  // The ribbon reacts to scroll speed: it rushes, leans, and runs backwards when scrolling up.
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 })
  const skewX = useTransform(velocity, [-2500, 0, 2500], [7, 0, -7], { clamp: true })

  const ribbonInView = useInView(viewport, { margin: '20% 0px' })
  const drift = useRef<{ animation: Animation | null; rate: number }>({ animation: null, rate: 1 })

  // Only while the ribbon is visible, and only on real rate changes: touching a CSS
  // animation flushes style, which must not happen on every frame of the page scroll.
  useMotionValueEvent(velocity, 'change', (speed) => {
    if (reducedMotion || !ribbonInView) return
    const rate = Math.round(Math.min(6, Math.max(-4, 1 + speed / 280)) * 10) / 10
    if (rate === drift.current.rate) return
    const animation = drift.current.animation ?? track.current?.getAnimations()[0] ?? null
    drift.current = { animation, rate }
    if (animation) animation.playbackRate = rate
  })

  useEffect(() => {
    if (ribbonInView) return
    const { animation } = drift.current
    if (animation) animation.playbackRate = 1
    // Re-read next time: keyboard focus swaps the CSS animation for a new instance.
    drift.current = { animation: null, rate: 1 }
  }, [ribbonInView])

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
        <div data-reveal className="sponsors-editorial__heading">
          <div className="max-w-xl">
            <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">
              Patrocinadores
            </p>
            <h2 id="sponsors-heading" className="mt-3 text-h2 font-semibold text-brand-white">
              El futuro se construye en equipo.
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="mt-4 text-body text-brand-gray">
              {hasSponsors
                ? 'Las marcas que apoyan el talento, las ideas y las conexiones de DatAIJam.'
                : 'Estamos preparando las alianzas del evento. Pronto conocerás a las marcas que nos acompañarán.'}
            </p>
            <a
              href="mailto:registros@dataijam.com?subject=Alianzas%20DatAIJam"
              className="editorial-text-link mt-5"
            >
              Quiero sumar mi marca <MoveUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>

        {/* The organizers read as a fixed credit line, ruled off from the heading and the ribbon. */}
        <div data-reveal className="organizers" aria-label="Organizadores">
          <div className="organizers__group">
            <p className="organizers__label">Organiza</p>
            <ul className="organizers__list">
              {leadOrganizers.map((organizer) => (
                <li key={organizer.id}>
                  <OrganizerLogo organizer={organizer} />
                </li>
              ))}
            </ul>
          </div>
          <div className="organizers__group">
            <p className="organizers__label">Junto a</p>
            <ul className="organizers__list">
              {coOrganizers.map((organizer) => (
                <li key={organizer.id}>
                  <OrganizerLogo organizer={organizer} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="ds-content-gap">
        <div
          ref={viewport}
          className="sponsors-marquee"
          role="region"
          aria-label="Patrocinadores del evento"
        >
          <motion.div
            ref={track}
            className="sponsors-track"
            style={reducedMotion ? undefined : { skewX }}
          >
            {[0, 1].map((copy) => (
              <ul key={copy} className="sponsors-group" aria-hidden={copy === 1 ? true : undefined}>
                {Array.from({ length: itemCount }, (_, index) => {
                  const duplicate = copy === 1 || index >= (hasSponsors ? sponsors.length : 1)
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
                        <div
                          className="sponsor-placeholder sponsor-mystery"
                          data-variant={index % 3}
                        >
                          <span className="sponsor-mystery__logo" aria-hidden="true">
                            <span className="sponsor-mystery__mark" />
                            <span className="sponsor-mystery__word" />
                          </span>
                          <span className="sponsor-mystery__label">
                            <Sparkles aria-hidden="true" className="size-3.5" />
                            Pronto se revelará
                          </span>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            ))}
          </motion.div>
        </div>
        {hasSponsors && (
          <Container>
            <p className="mt-4 text-xs text-brand-gray">Alianzas que impulsan nuestra comunidad.</p>
          </Container>
        )}
      </div>
    </section>
  )
}
