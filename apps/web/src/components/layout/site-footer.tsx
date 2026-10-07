import { FaInstagram } from 'react-icons/fa6'
import { Link } from 'react-router'
import { measurementId, openAnalyticsPreferences } from '@/features/analytics/analytics'
import symbol from '../../assets/brand/symbol.webp'
import taglineAccent from '../../assets/brand/tagline-accent.webp'
import taglineMask from '../../assets/brand/tagline-mask.webp'
import { ScrollReveal } from '../ui/scroll-reveal'
import { Container } from '../ui/container'
import { Wordmark } from '../ui/Wordmark'
import { SectionLink } from './section-link'

const navigationItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Acerca', href: '#acerca' },
  { label: 'Conferencias', href: '#sedes' },
  { label: 'Hackathon', href: '#hackathon' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Taller', href: '#taller' },
  { label: 'Patrocinadores', href: '#patrocinadores' },
  { label: 'FAQ', href: '#faq' },
] as const

const socialNetworks = [
  {
    label: 'Instagram',
    handle: '@dataijam',
    href: 'https://www.instagram.com/dataijam/',
    Icon: FaInstagram,
  },
]

export function SiteFooter() {
  return (
    <footer className="site-footer-editorial bg-footer-surface py-12 text-footer-ink sm:py-16">
      <ScrollReveal className="footer-motion">
        <Container>
          <div data-reveal="fade" className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Compact lockup with the hero's official tagline art, colored "+" included. */}
            <div className="footer-brand">
              <img src={symbol} alt="" width={704} height={504} className="w-20" />
              <Wordmark className="footer-brand__wordmark" imageClassName="h-auto w-full" />
              <span
                role="img"
                aria-label="Datos, personas, acción"
                className="footer-brand__tagline"
              >
                <span
                  className="footer-brand__tagline-text"
                  style={{ maskImage: `url(${taglineMask})` }}
                />
                <img
                  src={taglineAccent}
                  alt=""
                  width={1185}
                  height={45}
                  className="footer-brand__tagline-accent"
                />
              </span>
            </div>

            <div className="lg:border-l lg:border-brand-gray/35 lg:pl-8">
              <h2 className="ds-card-title text-footer-ink">Explora</h2>
              <ul className="mt-4 space-y-3">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <SectionLink
                      href={item.href}
                      className="text-sm text-footer-ink/70 transition-colors hover:text-footer-accent"
                    >
                      {item.label}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:border-l lg:border-brand-gray/35 lg:pl-8">
              <h2 className="ds-card-title text-footer-ink">Redes</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {socialNetworks.map(({ label, handle, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-sm text-footer-ink/70 transition-colors hover:text-footer-accent"
                    >
                      <span className="inline-flex size-12 items-center justify-center rounded-full border border-footer-ink/20 text-footer-ink transition-colors group-hover:border-footer-accent group-hover:text-footer-accent">
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      {handle}
                      <span className="sr-only"> en {label} (abre en otra pestaña)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:border-l lg:border-brand-gray/35 lg:pl-8">
              <h2 className="ds-card-title text-footer-ink">Conversemos</h2>
              <a
                href="mailto:registros@dataijam.com"
                className="mt-4 block text-sm text-footer-ink/70 transition-colors hover:text-footer-accent"
              >
                registros@dataijam.com
              </a>
              <p className="mt-2 text-sm text-footer-ink/70">Guayaquil, Ecuador</p>

              <p className="mt-8 max-w-40 text-sm font-medium uppercase leading-6 tracking-[0.18em] text-footer-ink/55">
                Una comunidad global con raíces en Ecuador
              </p>
              <div className="mt-4 h-1 w-24 rounded-full bg-linear-to-r from-brand-cyan to-brand-yellow" />
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-footer-ink/10 pt-6 text-xs text-footer-ink/55 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 DatAIJam. Todos los derechos reservados.</p>

            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              <Link to="/terminos" className="transition-colors hover:text-footer-accent">
                Términos y condiciones
              </Link>
              <Link to="/privacidad" className="transition-colors hover:text-footer-accent">
                Política de privacidad
              </Link>
              {measurementId && (
                <button
                  type="button"
                  onClick={openAnalyticsPreferences}
                  className="text-left transition-colors hover:text-footer-accent"
                >
                  Preferencias de analítica
                </button>
              )}
            </nav>
          </div>
        </Container>
      </ScrollReveal>
    </footer>
  )
}
