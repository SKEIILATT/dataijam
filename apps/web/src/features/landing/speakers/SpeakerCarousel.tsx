import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useScroll } from 'motion/react'
import { useCallback, useRef, useState, useSyncExternalStore } from 'react'

import { SpeakerCard } from './SpeakerCard'
import { SpeakerMysteryCard } from './SpeakerMysteryCard'
import type { Speaker, UpcomingSpeaker } from './types'

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

export function SpeakerCarousel({
  speakers,
  upcoming,
}: {
  speakers: Speaker[]
  upcoming: UpcomingSpeaker[]
}) {
  const viewport = useRef<HTMLUListElement>(null)
  const { scrollYProgress: deal } = useScroll({
    target: viewport,
    offset: ['start 0.85', 'start 0.3'],
  })
  const columns = useSyncExternalStore(subscribeLayout, getColumns, () => 4)
  const reducedMotion = useSyncExternalStore(
    subscribeLayout,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true,
  )
  const [page, setPage] = useState(0)
  const total = speakers.length + upcoming.length
  const pageCount = Math.ceil(total / columns)
  const activePage = Math.min(page, pageCount - 1)
  // A single short page is centered, so the deal fans out from the cards actually shown.
  const dealt = Math.min(columns, total)

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

  return (
    <div
      className="speaker-carousel ds-content-gap"
      role="region"
      aria-roledescription={pageCount > 1 ? 'carrusel' : undefined}
      aria-label="Speakers del evento"
    >
      <ul
        ref={viewport}
        id="speaker-carousel-slides"
        className="speaker-carousel__viewport"
        data-centered={pageCount === 1 ? true : undefined}
        aria-label="Ponentes"
        tabIndex={pageCount > 1 ? 0 : undefined}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
          event.preventDefault()
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
          <SpeakerCard
            key={speaker.name}
            speaker={speaker}
            index={index}
            columns={dealt}
            deal={deal}
          />
        ))}
        {upcoming.map((speaker, index) => (
          <SpeakerMysteryCard
            key={speaker.name}
            name={speaker.name}
            role={speaker.role}
            index={speakers.length + index}
            columns={dealt}
            deal={deal}
          />
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
                onClick={() => goTo(index)}
              >
                <span />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="speaker-carousel__button"
              aria-label="Ponentes anteriores"
              aria-controls="speaker-carousel-slides"
              onClick={() => goTo(activePage - 1)}
            >
              <ArrowLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              className="speaker-carousel__button"
              aria-label="Siguientes ponentes"
              aria-controls="speaker-carousel-slides"
              onClick={() => goTo(activePage + 1)}
            >
              <ArrowRight aria-hidden="true" className="size-5" />
            </button>
          </div>
          <span className="sr-only" aria-live="polite" aria-atomic="true">
            Página {activePage + 1} de {pageCount}
          </span>
        </div>
      )}
    </div>
  )
}
