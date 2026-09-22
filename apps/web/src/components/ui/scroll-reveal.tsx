import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/** One observer per scope; content is visible before enhancement and on keyboard focus. */
export function ScrollReveal({
  children,
  className = 'landing-flow',
}: {
  children: ReactNode
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scope = root.current
    if (!scope || !('IntersectionObserver' in window)) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const elements = Array.from(scope.querySelectorAll<HTMLElement>('[data-reveal]'))
    const seen = new Set<Element>()
    const animations = new Map<Element, Animation>()
    const tokens = getComputedStyle(scope)
    const duration = parseFloat(tokens.getPropertyValue('--motion-reveal')) || 720
    const stagger = parseFloat(tokens.getPropertyValue('--motion-stagger')) || 100
    const easing = tokens.getPropertyValue('--motion-easing').trim() || 'ease-out'

    let destination: HTMLElement | null = null
    let arrivalTimer = 0
    let scrollFrame = 0

    // Deliberately ignores prefers-reduced-motion, at the site owner's request:
    // this navbar scroll animation should always play, unlike the rest of the
    // motion in this file which still respects that preference.
    const scrollDuration = 900
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    // Native anchors give this smoothing "for free" via CSS `scroll-behavior`,
    // but its speed isn't adjustable and reads as an abrupt jump — so anchor
    // clicks animate the scroll manually instead, for a slower, deliberate descent.
    function scrollToSection(section: HTMLElement) {
      const scrollMarginTop = parseFloat(getComputedStyle(section).scrollMarginTop) || 0
      const targetY = section.getBoundingClientRect().top + window.scrollY - scrollMarginTop
      if (!scrollDuration) {
        window.scrollTo(0, targetY)
        return
      }
      const startY = window.scrollY
      const distance = targetY - startY
      const startTime = performance.now()
      window.cancelAnimationFrame(scrollFrame)
      function step(now: number) {
        const progress = Math.min((now - startTime) / scrollDuration, 1)
        window.scrollTo(0, startY + distance * easeInOutCubic(progress))
        if (progress < 1) scrollFrame = window.requestAnimationFrame(step)
      }
      scrollFrame = window.requestAnimationFrame(step)
    }

    function show(element: HTMLElement) {
      element.removeAttribute('data-reveal-pending')
      seen.add(element)
      observer.unobserve(element)
    }

    function reveal(element: HTMLElement, index = 0, alreadyVisible = false) {
      show(element)
      animations.get(element)?.cancel()
      if (element.matches(':focus-within')) return
      const distance = window.matchMedia('(max-width: 639px)').matches ? '28px' : '44px'
      const from =
        media.matches || element.dataset.reveal === 'fade'
          ? '0 0'
          : element.dataset.reveal === 'side'
            ? `${distance} 0`
            : `0 ${distance}`
      const animation = element.animate(
        [
          { opacity: alreadyVisible ? 0.55 : 0, translate: from },
          { opacity: 1, translate: '0 0' },
        ],
        {
          duration: media.matches ? 220 : duration,
          delay: media.matches ? 0 : Math.min(index, 3) * stagger,
          easing,
          fill: 'backwards',
        },
      )
      animations.set(element, animation)
      animation.onfinish = () => animations.delete(element)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const groups = new Map<Element, number>()
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting || destination?.contains(target)) return
          const element = target as HTMLElement
          const group = element.closest('[data-stagger]')
          const index = group ? (groups.get(group) ?? 0) : 0
          if (group) groups.set(group, index + 1)
          reveal(element, index)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    // Anchor navigation gets an arrival reveal, instead of spending the whole
    // animation while the destination is still moving through the viewport.
    function arrive() {
      window.clearTimeout(arrivalTimer)
      const section = destination
      destination = null
      if (!section) return
      const items = elements.filter((element) => section.contains(element))
      const positions = items.map((element) => element.getBoundingClientRect())
      let index = 0
      items.forEach((element, i) => {
        const rect = positions[i]
        if (rect.top < window.innerHeight - 24 && rect.bottom > 96) {
          reveal(element, index++, !element.hasAttribute('data-reveal-pending'))
        } else if (element.hasAttribute('data-reveal-pending')) {
          observer.observe(element)
        }
      })
    }

    function onAnchor(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      )
        return
      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return
      const section = document.getElementById(link.hash.slice(1))
      if (!section || !scope?.contains(section)) return
      event.preventDefault()
      arrive()
      destination = section
      const items = elements.filter((element) => section.contains(element))
      const positions = items.map((element) => element.getBoundingClientRect())
      items.forEach((element, i) => {
        animations.get(element)?.cancel()
        observer.unobserve(element)
        if (positions[i].top >= window.innerHeight || positions[i].bottom <= 0) {
          seen.delete(element)
          element.setAttribute('data-reveal-pending', '')
        }
      })
      history.pushState(null, '', link.hash)
      scrollToSection(section)
      // Move focus the way native fragment navigation would, so keyboard/screen
      // reader users land on the destination too.
      if (!section.hasAttribute('tabindex')) section.setAttribute('tabindex', '-1')
      section.focus({ preventScroll: true })
      // Fallback also handles same-position links and browsers without scrollend.
      arrivalTimer = window.setTimeout(arrive, scrollDuration + 300)
    }

    function configure() {
      arrive()
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
      animations.clear()
      // Read geometry together before changing attributes.
      const positions = elements.map((element) => element.getBoundingClientRect().top)
      elements.forEach((element, index) => {
        element.removeAttribute('data-reveal-pending')
        if (positions[index] < window.innerHeight || seen.has(element)) {
          seen.add(element)
          return
        }
        element.setAttribute('data-reveal-pending', '')
        observer.observe(element)
      })
    }

    function onFocus(event: FocusEvent) {
      if (!(event.target instanceof Element)) return
      elements
        .filter((element) => element.contains(event.target as Node))
        .forEach((element) => {
          show(element)
          animations.get(element)?.cancel()
          animations.delete(element)
        })
    }

    // Only a genuine user gesture should cut the animated scroll short — the
    // 'scrollend' event also fires between our own scrollTo() frames, so it
    // must not cancel scrollFrame itself or the animation stops after one tick.
    function interruptScroll() {
      window.cancelAnimationFrame(scrollFrame)
      arrive()
    }

    configure()
    media.addEventListener('change', configure)
    scope.addEventListener('focusin', onFocus)
    document.addEventListener('click', onAnchor)
    document.addEventListener('scrollend', arrive)
    window.addEventListener('wheel', interruptScroll, { passive: true })
    window.addEventListener('touchstart', interruptScroll, { passive: true })
    return () => {
      window.clearTimeout(arrivalTimer)
      window.cancelAnimationFrame(scrollFrame)
      document.removeEventListener('click', onAnchor)
      document.removeEventListener('scrollend', arrive)
      window.removeEventListener('wheel', interruptScroll)
      window.removeEventListener('touchstart', interruptScroll)
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
      media.removeEventListener('change', configure)
      scope.removeEventListener('focusin', onFocus)
      elements.forEach((element) => element.removeAttribute('data-reveal-pending'))
    }
  }, [])

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  )
}
