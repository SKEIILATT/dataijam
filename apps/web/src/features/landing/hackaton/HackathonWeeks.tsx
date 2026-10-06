import { useLenis } from 'lenis/react'
import { FileCheck2, MousePointer2 } from 'lucide-react'
import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import type { KeyboardEvent } from 'react'

import { usePrefersReducedMotion } from '@/components/ui/use-prefers-reduced-motion'
import { steps } from './hackathon.data'

const ease = [0.22, 1, 0.36, 1] as const
const pinnedViewport = '(min-width: 768px) and (min-height: 700px)'

const weekLabel = (index: number) => String(index + 1).padStart(2, '0')

function subscribeViewport(callback: () => void) {
  const media = window.matchMedia(pinnedViewport)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

export function HackathonWeeks() {
  const [[active, direction], setActive] = useState<[number, number]>([0, 0])
  const activeRef = useRef(0)
  const selectedScroll = useRef<{ target: number; token: number } | null>(null)
  const selectedScrollTimer = useRef(0)
  const selectionToken = useRef(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)
  const railInView = useInView(railRef, { once: true, margin: '0px 0px -15% 0px' })
  const reducedMotion = usePrefersReducedMotion()
  const canPin = useSyncExternalStore(
    subscribeViewport,
    () => window.matchMedia(pinnedViewport).matches,
    () => false,
  )
  // Keep the scroll-driven stage on wide screens; phone-sized stages nearly fill the viewport.
  const pinned = !reducedMotion && canPin
  const lenis = useLenis()
  const baseId = useId()
  const step = steps[active]
  const last = steps.length - 1
  const shift = reducedMotion ? 0 : 24

  const { scrollYProgress } = useScroll({
    target: scrollerRef,
    offset: ['start start', 'end end'],
  })
  const railProgress = useTransform(
    scrollYProgress,
    [0.5 / steps.length, 1 - 0.5 / steps.length],
    [0, 1],
  )

  // The sticky offset centers the stage using its live height (see .hackathon-weeks-scroller__stage).
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !pinned) return
    const observer = new ResizeObserver(([entry]) => {
      stage.style.setProperty('--stage-h', `${entry.borderBoxSize[0].blockSize}px`)
    })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [pinned])

  useEffect(() => {
    if (!pinned) return
    const interrupt = () => {
      selectedScroll.current = null
      window.clearTimeout(selectedScrollTimer.current)
    }
    window.addEventListener('wheel', interrupt, { passive: true })
    window.addEventListener('touchstart', interrupt, { passive: true })
    return () => {
      window.removeEventListener('wheel', interrupt)
      window.removeEventListener('touchstart', interrupt)
      interrupt()
    }
  }, [pinned])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!pinned) return
    const next = Math.min(last, Math.floor(progress * steps.length))
    if (selectedScroll.current) {
      if (next !== selectedScroll.current.target) return
      selectedScroll.current = null
      window.clearTimeout(selectedScrollTimer.current)
    }
    if (next === activeRef.current) return
    const previous = activeRef.current
    activeRef.current = next
    setActive([next, next > previous ? 1 : -1])
  })

  function select(index: number, focus = false) {
    const changed = index !== activeRef.current
    if (index !== activeRef.current) {
      const previous = activeRef.current
      activeRef.current = index
      setActive([index, index > previous ? 1 : -1])
    }
    if (focus) tabs.current[index]?.focus({ preventScroll: true })
    const scroller = scrollerRef.current
    if (!pinned || !scroller || !changed) return
    const bounds = scroller.getBoundingClientRect()
    const travel = bounds.height - window.innerHeight
    const top = window.scrollY + bounds.top + ((index + 0.5) / steps.length) * travel
    const token = ++selectionToken.current
    selectedScroll.current = { target: index, token }
    const finish = () => {
      if (selectedScroll.current?.token !== token) return
      selectedScroll.current = null
      window.clearTimeout(selectedScrollTimer.current)
    }
    window.clearTimeout(selectedScrollTimer.current)
    selectedScrollTimer.current = window.setTimeout(finish, 1200)
    if (lenis) lenis.scrollTo(top, { duration: 0.7, onComplete: finish })
    else {
      window.addEventListener('scrollend', finish, { once: true })
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const targets: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }
    if (!(event.key in targets)) return
    event.preventDefault()
    select(targets[event.key], true)
  }

  return (
    <div ref={scrollerRef} className="hackathon-weeks-scroller" data-pinned={pinned}>
      <div ref={stageRef} className="hackathon-weeks-scroller__stage">
        <div data-reveal className="hackathon-weeks">
          <div className="hackathon-weeks__track">
            <span ref={railRef} className="hackathon-weeks__rail" aria-hidden="true">
              {pinned ? (
                <motion.span
                  className="hackathon-weeks__progress"
                  style={{ scaleX: railProgress }}
                />
              ) : (
                <motion.span
                  className="hackathon-weeks__progress"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: railInView ? active / last : 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.6, ease }}
                />
              )}
            </span>
            <div
              role="tablist"
              aria-label="Semanas del hackathon"
              className="hackathon-weeks__tabs"
            >
              {steps.map((item, index) => {
                const Icon = item.icon
                const selected = index === active
                return (
                  <button
                    key={item.title}
                    ref={(element) => {
                      tabs.current[index] = element
                    }}
                    id={`${baseId}-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(index)}
                    onKeyDown={onKeyDown}
                    className="hackathon-week"
                  >
                    <span className="hackathon-week__marker" aria-hidden="true">
                      <span className="hackathon-week__glow" />
                      <Icon className="relative size-5" />
                    </span>
                    <span className="hackathon-week__label">Semana {weekLabel(index)}</span>
                    <span className="hackathon-week__title">{item.title}</span>
                    <span className="hackathon-week__summary">{item.summary}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            className="hackathon-week-detail"
          >
            <motion.div
              key={active}
              initial={reducedMotion ? false : { opacity: 0.55, x: direction * shift }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.24, ease }}
              className="hackathon-week-detail__body"
            >
              <span className="hackathon-week-detail__number" aria-hidden="true">
                {weekLabel(active)}
              </span>
              <div>
                <h3 className="text-h4 font-semibold text-brand-white">{step.title}</h3>
                <p className="mt-3 text-body text-brand-gray">{step.description}</p>
              </div>
              <div className="hackathon-week-detail__deliverable">
                <FileCheck2 aria-hidden="true" className="size-5 shrink-0 text-brand-cyan" />
                <div>
                  <p className="text-xs font-medium tracking-[0.14em] text-brand-cyan uppercase">
                    Entregable
                  </p>
                  <p className="mt-1 text-sm leading-6 text-brand-white">{step.deliverable}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {pinned && (
          <p className="hackathon-weeks__hint" aria-hidden="true">
            <MousePointer2 className="size-3.5" />
            Desliza para recorrer las 4 semanas
          </p>
        )}
      </div>
    </div>
  )
}
