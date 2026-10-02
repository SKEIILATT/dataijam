import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { SpeakerCard } from './SpeakerCard'
import type { Speaker } from './types'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function subscribeLayout(callback: () => void) {
  const queries = ['(min-width: 640px)', '(min-width: 1024px)', reducedMotionQuery].map((query) =>
    window.matchMedia(query),
  )
  queries.forEach((query) => query.addEventListener('change', callback))
  return () => queries.forEach((query) => query.removeEventListener('change', callback))
}

function getColumns() {
  return window.matchMedia('(min-width: 1024px)').matches
    ? 4
    : window.matchMedia('(min-width: 640px)').matches
      ? 2
      : 1
}

export function SpeakerCarousel({ speakers }: { speakers: Speaker[] }) {
  const viewport = useRef<HTMLUListElement>(null)
  const columns = useSyncExternalStore(subscribeLayout, getColumns, () => 4)
  const reducedMotion = useSyncExternalStore(
    subscribeLayout,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true,
  )
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(() => document.hidden)
  const pageCount = Math.ceil(speakers.length / columns)
  const activePage = Math.min(page, pageCount - 1)
  const rotating =
    pageCount > 1 && !paused && !hovered && !focused && visible && !hidden && !reducedMotion

  const goTo = useCallback(
    (nextPage: number) => {
      const list = viewport.current
      if (!list) return
      const next = (nextPage + pageCount) % pageCount
      const card = list.children[next * columns] as HTMLElement | undefined
      if (!card) return
      list.scrollTo({
        left: card.offsetLeft - (list.firstElementChild as HTMLElement).offsetLeft,
        behavior: reducedMotion ? 'instant' : 'smooth',
      })
    },
    [columns, pageCount, reducedMotion],
  )

  useEffect(() => {
    const list = viewport.current
    if (!list) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.5,
    })
    observer.observe(list)
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!rotating) return
    const timer = window.setInterval(() => goTo(activePage + 1), 6000)
    return () => window.clearInterval(timer)
  }, [rotating, activePage, goTo])

  return (
    <div
      className="speaker-carousel ds-content-gap"
      role="region"
      aria-roledescription={pageCount > 1 ? 'carrusel' : undefined}
      aria-label="Speakers del evento"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
    >
      <ul
        ref={viewport}
        id="speaker-carousel-slides"
        className="speaker-carousel__viewport"
        aria-label="Ponentes"
        tabIndex={pageCount > 1 ? 0 : undefined}
        onPointerDown={() => setPaused(true)}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
          event.preventDefault()
          setPaused(true)
          goTo(activePage + (event.key === 'ArrowLeft' ? -1 : 1))
        }}
        onScroll={() => {
          const list = viewport.current
          if (!list || !list.children.length) return
          const first = list.children[0] as HTMLElement
          const gap = parseFloat(getComputedStyle(list).columnGap) || 0
          const stride = (first.offsetWidth + gap) * columns
          const atEnd = list.scrollLeft >= list.scrollWidth - list.clientWidth - 2
          setPage(atEnd ? pageCount - 1 : Math.round(list.scrollLeft / stride))
        }}
      >
        {speakers.map((speaker, index) => (
          <SpeakerCard key={`${speaker.name}-${index}`} speaker={speaker} />
        ))}
      </ul>

      {pageCount > 1 && (
        <div className="speaker-carousel__controls">
          <div className="speaker-carousel__pages" aria-label="Páginas de ponentes">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ver página ${index + 1} de ${pageCount}`}
                aria-current={index === activePage ? 'true' : undefined}
                aria-controls="speaker-carousel-slides"
                onClick={() => {
                  setPaused(true)
                  goTo(index)
                }}
              >
                <span />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {!reducedMotion && (
              <button
                type="button"
                className="speaker-carousel__button"
                aria-label={paused ? 'Activar rotación automática' : 'Pausar rotación automática'}
                aria-pressed={paused}
                onClick={() => setPaused(!paused)}
              >
                {paused ? (
                  <Play aria-hidden="true" className="size-4" />
                ) : (
                  <Pause aria-hidden="true" className="size-4" />
                )}
              </button>
            )}
            <button
              type="button"
              className="speaker-carousel__button"
              aria-label="Ponentes anteriores"
              aria-controls="speaker-carousel-slides"
              onClick={() => {
                setPaused(true)
                goTo(activePage - 1)
              }}
            >
              <ArrowLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              className="speaker-carousel__button"
              aria-label="Siguientes ponentes"
              aria-controls="speaker-carousel-slides"
              onClick={() => {
                setPaused(true)
                goTo(activePage + 1)
              }}
            >
              <ArrowRight aria-hidden="true" className="size-5" />
            </button>
          </div>
          <span className="sr-only" aria-live={rotating ? 'off' : 'polite'} aria-atomic="true">
            Página {activePage + 1} de {pageCount}
          </span>
        </div>
      )}
    </div>
  )
}
