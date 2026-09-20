import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import wordmark from '../../assets/brand/wordmark.png'
import { Button } from '../ui/button'
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

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#inicio')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return window.localStorage.getItem('dataijam-theme') === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('dataijam-theme', theme)
  }, [theme])

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) return

    // Cuenta como "activa" la sección que cruza una franja horizontal cerca
    // del tope del viewport, para que la barra siga al scroll y no solo al click.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return

        const topMost = visible.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top ? entry : closest,
        )
        setActiveHref(`#${topMost.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-brand-navy/80 backdrop-blur-sm">
      <Container>
        <div className="grid min-h-24 grid-cols-[auto_1fr_auto] items-center gap-6 py-4">
          <a
            href="#inicio"
            aria-label="Ir al inicio de DatAIJam"
            className="shrink-0"
            onClick={closeMenu}
          >
            <span className="relative block">
              <img
                src={wordmark}
                alt="DatAIJam"
                className="site-header__wordmark h-8 w-auto sm:h-9"
              />
              <img
                src={wordmark}
                alt=""
                aria-hidden="true"
                className="site-header__wordmark-accent pointer-events-none absolute inset-0 h-8 w-auto sm:h-9"
              />
            </span>
          </a>

          <nav aria-label="Navegación principal" className="hidden justify-center lg:flex">
            <ul className="flex items-center gap-5 xl:gap-6">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={activeHref === item.href ? 'true' : undefined}
                    className={`relative py-2 text-sm font-medium text-brand-white/80 transition-colors hover:text-brand-white after:absolute after:bottom-0 after:left-0 after:h-px after:bg-brand-lime after:transition-all ${
                      activeHref === item.href
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

          <div className="col-start-3 flex items-center gap-3 justify-self-end">
            <div className="hidden lg:block">
              <Button as="a" href="#registro" variant="primary" className="group">
                Inscribete{' '}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-0"
                >
                  &rarr;
                </span>
              </Button>
            </div>

            <button
              type="button"
              aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
              aria-pressed={theme === 'light'}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-white/25 text-brand-white transition-colors hover:border-brand-cyan hover:text-brand-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan"
              onClick={() =>
                setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
              }
            >
              {theme === 'dark' ? (
                <Sun aria-hidden="true" className="size-5" />
              ) : (
                <Moon aria-hidden="true" className="size-5" />
              )}
            </button>

            <button
              type="button"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              className="inline-flex size-11 items-center justify-center rounded-full border border-brand-white/20 text-brand-white transition-colors hover:border-brand-lime hover:text-brand-lime lg:hidden"
              onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            >
              {isMenuOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
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
                    aria-current={activeHref === item.href ? 'true' : undefined}
                    className={`block text-base font-medium transition-colors hover:text-brand-lime ${
                      activeHref === item.href ? 'text-brand-lime' : 'text-brand-white'
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}

              <li className="pt-2">
                <Button
                  as="a"
                  href="#registro"
                  variant="primary"
                  fullWidth
                  className="group"
                  onClick={closeMenu}
                >
                  Inscribete{' '}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-0"
                  >
                    &rarr;
                  </span>
                </Button>
              </li>
            </ul>
          </nav>
        ) : null}
      </Container>
    </header>
  )
}
