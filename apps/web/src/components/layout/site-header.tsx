import { useState } from 'react'
import wordmark from '../../assets/brand/wordmark.png'
import { Container } from '../ui/container'

const navigationItems = [
  { label: 'Inicio', href: '#inicio', isActive: true },
  { label: 'Acerca', href: '#acerca', isActive: false },
  { label: 'Conferencias', href: '#sedes', isActive: false },
  { label: 'Hackathon', href: '#hackathon', isActive: false },
  { label: 'Speakers', href: '#speakers', isActive: false },
  { label: 'Patrocinadores', href: '#patrocinadores', isActive: false },
  { label: 'FAQ', href: '#faq', isActive: false },
]

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-brand-navy/80 backdrop-blur-sm">
      <Container>
        <div className="flex min-h-24 items-center justify-between gap-6 py-4">
          <a
            href="#inicio"
            aria-label="Ir al inicio de DatAIJam"
            className="shrink-0"
            onClick={closeMenu}
          >
            <img src={wordmark} alt="DatAIJam" className="h-10 w-auto sm:h-12" />
          </a>

          <nav aria-label="Navegación principal" className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-6">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative py-2 text-sm font-medium text-brand-white/80 transition-colors hover:text-brand-white after:absolute after:bottom-0 after:left-0 after:h-px after:bg-brand-lime after:transition-all ${
                      item.isActive
                        ? 'text-brand-white after:w-full'
                        : 'after:w-0 hover:after:w-full'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#registro"
            className="group hidden items-center gap-2 rounded-full bg-linear-to-r from-brand-lime to-brand-yellow px-7 py-3 text-sm font-bold text-brand-navy shadow-lg shadow-brand-lime/10 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl hover:shadow-brand-lime/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-lime active:translate-y-0 active:scale-100 lg:inline-flex"
          >
            Inscribete{' '}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-0"
            >
              &rarr;
            </span>
          </a>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            className="inline-flex size-11 items-center justify-center rounded-full border border-brand-white/20 text-brand-white transition-colors hover:border-brand-lime hover:text-brand-lime lg:hidden"
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          >
            <span className="text-2xl leading-none" aria-hidden="true">
              {isMenuOpen ? '×' : '☰'}
            </span>
          </button>
        </div>

        {isMenuOpen ? (
          <nav
            aria-label="Navegación móvil"
            className="border-t border-brand-white/10 bg-brand-navy/95 py-5 lg:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block text-base font-medium text-brand-white transition-colors hover:text-brand-lime"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}

              <li className="pt-2">
                <a
                  href="#registro"
                  className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-lime to-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-navy transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-lime/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-lime active:translate-y-0"
                  onClick={closeMenu}
                >
                  Inscribete{' '}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-0"
                  >
                    &rarr;
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        ) : null}
      </Container>
    </header>
  )
}
