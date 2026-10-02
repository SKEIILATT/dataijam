import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa6'
import symbol from '../../assets/brand/symbol.svg'
import wordmark from '../../assets/brand/wordmark.png'
import { ScrollReveal } from '../ui/scroll-reveal'
import { Container } from '../ui/container'

const navigationItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Acerca', href: '#acerca' },
  { label: 'Conferencias', href: '#sedes' },
  { label: 'Hackathon', href: '#hackathon' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Patrocinadores', href: '#patrocinadores' },
  { label: 'FAQ', href: '#faq' },
]

const socialNetworks = [
  { label: 'LinkedIn', Icon: FaLinkedinIn },
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'YouTube', Icon: FaYoutube },
  { label: 'TikTok', Icon: FaTiktok },
]

export function SiteFooter() {
  return (
    <footer className="site-footer-editorial bg-footer-surface py-12 text-footer-ink sm:py-16">
      <ScrollReveal className="footer-motion">
        <Container>
          <div data-reveal="fade" className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="footer-brand">
              <img src={symbol} alt="" className="w-20" />
              <img src={wordmark} alt="DatAIJam" className="footer-brand__wordmark" />
              <p className="text-xs tracking-[0.12em] text-footer-ink/70">
                DATOS · PERSONAS · ACCIÓN
              </p>
            </div>

            <div className="lg:border-l lg:border-brand-gray/35 lg:pl-8">
              <h2 className="ds-card-title text-footer-ink">Explora</h2>
              <ul className="mt-4 space-y-3">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-footer-ink/70 transition-colors hover:text-footer-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:border-l lg:border-brand-gray/35 lg:pl-8">
              <h2 className="ds-card-title text-footer-ink">Redes</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {socialNetworks.map(({ label, Icon }) => (
                  <li key={label}>
                    <span
                      aria-label={label}
                      title={`${label}: enlace pendiente`}
                      className="inline-flex size-12 items-center justify-center rounded-full border border-footer-ink/20 text-footer-ink "
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-footer-ink/60">Canales oficiales próximamente.</p>
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

            <div className="flex gap-5">
              <span title="Contenido pendiente de publicación">Términos (próximamente)</span>
              <span title="Contenido pendiente de publicación">Privacidad (próximamente)</span>
            </div>
          </div>
        </Container>
      </ScrollReveal>
    </footer>
  )
}
