import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/** Content stays visible without JS, with reduced motion, and while navigating by keyboard. */
export function ScrollReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const elements = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? [])
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            target.removeAttribute('data-reveal-pending')
            observer.unobserve(target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -24px 0px' },
    )

    function configure() {
      observer.disconnect()
      elements.forEach((element) => {
        element.removeAttribute('data-reveal-pending')
        if (!media.matches && element.getBoundingClientRect().top >= window.innerHeight) {
          element.setAttribute('data-reveal-pending', '')
          observer.observe(element)
        }
      })
    }

    configure()
    media.addEventListener('change', configure)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', configure)
      elements.forEach((element) => element.removeAttribute('data-reveal-pending'))
    }
  }, [])

  return (
    <div ref={root} className="landing-flow">
      {children}
    </div>
  )
}
