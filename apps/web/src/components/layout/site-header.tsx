import { Moon, Sun } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  const menuToggle = useRef<HTMLButtonElement>(null)
  const navListRef = useRef<HTMLUListElement>(null)
  const themeTransitionTimeout = useRef(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#inicio')
  const [navIndicator, setNavIndicator] = useState<{ left: number; width: number } | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return window.localStorage.getItem('dataijam-theme') === 'light' ? 'light' : 'dark'
  })

  useLayoutEffect(() => {
    const list = navListRef.current
    if (!list) return

    function measure() {
      const activeLink = list?.querySelector<HTMLAnchorElement>(`a[href="${activeHref}"]`)
      if (!activeLink) return
      setNavIndicator({ left: activeLink.offsetLeft, width: activeLink.offsetWidth })
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeHref])

  useLayoutEffect(() => {
    // Layout effect (not a plain effect) so the attribute flips in the same
    // frame the `.theme-transition` class is added, instead of racing it.
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('dataijam-theme', theme)
  }, [theme])

  function toggleTheme() {
    // Briefly lets every element transition its colors, instead of the
    // instant cut a `data-theme` flip would otherwise cause.
    document.documentElement.classList.add('theme-transition')
    window.clearTimeout(themeTransitionTimeout.current)
    themeTransitionTimeout.current = window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 950)
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

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

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isMenuOpen) {
          closeMenu()
          menuToggle.current?.focus()
        }
      }}
      className="site-header sticky top-0 z-50 bg-brand-navy/80 backdrop-blur-sm"
    >
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
            <ul ref={navListRef} className="relative flex items-center gap-5 xl:gap-6">
              <span
                aria-hidden="true"
                className="nav-indicator"
                style={
                  navIndicator
                    ? {
                        transform: `translateX(${navIndicator.left}px)`,
                        width: `${navIndicator.width}px`,
                        opacity: 1,
                      }
                    : { opacity: 0 }
                }
              />
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={activeHref === item.href ? 'true' : undefined}
                    className="motion-link relative py-2 text-sm font-medium text-brand-gray hover:text-brand-white"
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
                  className="transition-transform duration-[var(--motion-duration)] group-hover:translate-x-1 group-active:translate-x-0"
                >
                  &rarr;
                </span>
              </Button>
            </div>

            <button
              type="button"
              aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
              aria-pressed={theme === 'light'}
              className="theme-toggle inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-brand-white/25 text-brand-white transition-colors hover:border-brand-cyan hover:text-brand-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan"
              onClick={toggleTheme}
            >
              <span className="theme-toggle__icon theme-toggle__icon--sun">
                <Sun aria-hidden="true" className="size-5" />
              </span>
              <span className="theme-toggle__icon theme-toggle__icon--moon">
                <Moon aria-hidden="true" className="size-5" />
              </span>
            </button>

            <button
              type="button"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              ref={menuToggle}
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              className="inline-flex size-12 items-center justify-center rounded-full border border-brand-white/20 text-brand-white transition-colors hover:border-brand-lime hover:text-brand-lime lg:hidden"
              onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            >
              <span aria-hidden="true" className="menu-glyph">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          inert={!isMenuOpen}
          aria-hidden={!isMenuOpen}
          data-open={isMenuOpen}
          aria-label="Navegación móvil"
          className="mobile-navigation border-t border-brand-white/10 bg-brand-navy/95 py-5 lg:hidden"
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
                  className="transition-transform duration-[var(--motion-duration)] group-hover:translate-x-1 group-active:translate-x-0"
                >
                  &rarr;
                </span>
              </Button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}
