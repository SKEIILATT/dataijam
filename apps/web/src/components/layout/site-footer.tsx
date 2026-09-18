import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa6'
import logoFull from '../../assets/brand/logo-full.svg'
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
    <footer className="bg-brand-white py-14 text-brand-navy sm:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex justify-center">
            <img src={logoFull} alt="DatAIJam" className="w-56 sm:w-64" />
          </div>

          <div className="lg:border-l lg:border-brand-gray/35 lg:pl-8">
            <h2 className="text-sm font-bold">Navegacion</h2>
            <ul className="mt-5 space-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-brand-navy/70 transition-colors hover:text-brand-blue"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-brand-gray/35 lg:pl-8">
            <h2 className="text-sm font-bold">Siguenos</h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {socialNetworks.map(({ label, Icon }) => (
                <li key={label}>
                  <span
                    aria-label={label}
                    title={label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-brand-navy/15 text-brand-navy transition-colors hover:border-brand-blue hover:text-brand-blue"
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-brand-gray/35 lg:pl-8">
            <h2 className="text-sm font-bold">Contactanos</h2>
            <a
              href="mailto:hola@dataijam.com"
              className="mt-5 block text-sm text-brand-navy/70 transition-colors hover:text-brand-blue"
            >
              hola@dataijam.com
            </a>
            <p className="mt-2 text-sm text-brand-navy/70">Quito, Ecuador</p>

            <p className="mt-8 max-w-40 text-sm font-semibold uppercase leading-6 tracking-[0.18em] text-brand-navy/55">
              Una comunidad global con raices en Ecuador
            </p>
            <div className="mt-4 h-1 w-24 rounded-full bg-linear-to-r from-brand-cyan to-brand-yellow" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-brand-navy/10 pt-6 text-xs text-brand-navy/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 DatAIJam. Todos los derechos reservados.</p>

          <div className="flex gap-5">
            <a href="#terminos" className="transition-colors hover:text-brand-blue">
              Terminos
            </a>
            <a href="#privacidad" className="transition-colors hover:text-brand-blue">
              Privacidad
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
