import { X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { FaLinkedinIn } from 'react-icons/fa6'

import { usePrefersReducedMotion } from '@/components/ui/use-prefers-reduced-motion'
import type { Speaker } from './types'

type Frame = { x: number; y: number; width: number; height: number }

/** How the card looks right now, so the flying front face is indistinguishable from it. */
type CardLook = {
  card: CSSProperties
  portrait: CSSProperties
  info: CSSProperties
  edge: CSSProperties
  name: CSSProperties
  role: CSSProperties
  education: CSSProperties
}

const CLOSE_SECONDS = 0.5

interface SpeakerBioDialogProps {
  speaker: Speaker
  /** The card the dialog lifts out of and returns to. */
  origin: HTMLElement | null
  open: boolean
  onClosed: () => void
}

function panelSize() {
  const width = Math.min(880, window.innerWidth - 32)
  const height = Math.min(560, window.innerHeight * 0.86)
  return { width, height }
}

/**
 * Where the card sits, as an offset from the viewport center plus its size. The size comes from
 * layout, not the bounding box, so a hover tilt in progress doesn't skew it.
 */
function cardFrame(card: HTMLElement): Frame {
  const bounds = card.getBoundingClientRect()
  return {
    x: bounds.left + bounds.width / 2 - window.innerWidth / 2,
    y: bounds.top + bounds.height / 2 - window.innerHeight / 2,
    width: card.offsetWidth,
    height: card.offsetHeight,
  }
}

/**
 * Copies the few computed styles that make each card look the way it does. They depend on the
 * card's parity and on its section, neither of which reaches a dialog portaled to <body>.
 */
function cardLook(card: HTMLElement): CardLook {
  const style = (selector: string, pseudo?: string) => {
    const element = card.querySelector(selector)
    return element ? getComputedStyle(element, pseudo) : null
  }
  const self = getComputedStyle(card)
  const portrait = style('.speaker-editorial__portrait')
  const info = style('.speaker-editorial__info')
  const edge = style('.speaker-editorial__info', '::before')
  const name = style('.speaker-editorial__info h3')
  const role = style('.speaker-editorial__info p:nth-of-type(1)')
  const education = style('.speaker-editorial__info p:nth-of-type(2)')
  const portraitHeight = card.querySelector<HTMLElement>('.speaker-editorial__portrait')
  return {
    card: {
      borderRadius: self.borderRadius,
      border: self.border,
      boxShadow: self.boxShadow,
      background: self.background,
    },
    portrait: {
      height: `${((portraitHeight?.offsetHeight ?? 0) / card.offsetHeight) * 100}%`,
      background: portrait?.background,
    },
    info: { padding: info?.padding, background: info?.background, color: info?.color },
    edge: { height: edge?.height, background: edge?.background },
    name: { fontSize: name?.fontSize, color: name?.color },
    role: { fontSize: role?.fontSize, color: role?.color },
    education: { fontSize: education?.fontSize, color: education?.color },
  }
}

/**
 * The speaker card lifts out of the carousel, flips over while it travels to the center and
 * grows into a panel with the full bio; closing plays the same path back into the card.
 */
export function SpeakerBioDialog({ speaker, origin, open, onClosed }: SpeakerBioDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const lenis = useLenis()
  const reducedMotion = usePrefersReducedMotion()
  const [frames, setFrames] = useState<{ card: Frame; panel: Frame; look: CardLook } | null>(null)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog || dialog.open || !origin) return
    setFrames({
      card: cardFrame(origin),
      panel: { x: 0, y: 0, ...panelSize() },
      look: cardLook(origin),
    })
    setClosing(false)
    lenis?.stop()
    dialog.showModal()
  }, [open, origin, lenis])

  function requestClose() {
    if (!dialogRef.current?.open || closing) return
    // The page may have reflowed while the dialog was open, so aim at where the card is now.
    if (origin && frames) setFrames({ ...frames, card: cardFrame(origin) })
    setClosing(true)
  }

  // The front face lands as an exact copy of the card, so swapping the two in one frame is
  // invisible. The card is shown through the DOM first: waiting for React to re-render after
  // the dialog closes would leave a frame with neither on screen.
  function finishClose() {
    origin?.removeAttribute('data-lifted')
    dialogRef.current?.close()
    onClosed()
  }

  const target = frames && (closing ? frames.card : frames.panel)
  const flipped = !closing
  const face =
    'absolute inset-0 overflow-hidden rounded-[28px] border border-brand-cyan/30 shadow-2xl backface-hidden'
  const photo = speaker.imageSrc ? 'absolute inset-0 size-full object-cover' : null
  const focus = { objectPosition: speaker.imagePosition ?? 'center 20%' }

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="speaker-bio-dialog fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-transparent p-0"
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
      onClose={() => {
        setFrames(null)
        setClosing(false)
        lenis?.start()
      }}
    >
      {frames && target && (
        <>
          <motion.div
            className="absolute inset-0 bg-brand-navy/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: closing ? 0 : 1 }}
            transition={{ duration: reducedMotion ? 0.15 : closing ? CLOSE_SECONDS : 0.45 }}
            onClick={requestClose}
          />
          {/* Centered by inset + auto margins, so animating width/height keeps it centered;
              x/y carry it from the card's spot to the middle. */}
          <motion.div
            className="absolute inset-0 m-auto transform-3d"
            style={{ transformPerspective: 1600 }}
            initial={
              reducedMotion
                ? { opacity: 0, rotateY: 180, ...frames.panel }
                : { opacity: 1, rotateY: 0, ...frames.card }
            }
            animate={
              reducedMotion
                ? { opacity: closing ? 0 : 1, rotateY: 180, ...frames.panel }
                : { opacity: 1, rotateY: flipped ? 180 : 0, ...target }
            }
            transition={
              reducedMotion
                ? { duration: 0.15 }
                : closing
                  ? // A fixed-length flight home: a spring's long settle kept the copy parked on
                    // top of the card before the dialog could close.
                    { duration: CLOSE_SECONDS, ease: [0.4, 0, 0.2, 1] }
                  : { type: 'spring', stiffness: 120, damping: 20 }
            }
            onAnimationComplete={() => {
              if (closing) finishClose()
            }}
          >
            {/* Front: a copy of the card as it sits in the carousel, seen while it turns over. */}
            <div
              className="absolute inset-0 flex flex-col overflow-hidden backface-hidden"
              style={frames.look.card}
              aria-hidden
            >
              <div className="relative shrink-0" style={frames.look.portrait}>
                {photo && <img src={speaker.imageSrc} alt="" className={photo} style={focus} />}
              </div>
              <div className="relative flex flex-1 flex-col" style={frames.look.info}>
                <span className="absolute inset-x-0 top-0" style={frames.look.edge} />
                <p className="font-heading font-semibold" style={frames.look.name}>
                  {speaker.name}
                </p>
                <p className="mt-2 leading-5" style={frames.look.role}>
                  {speaker.role}
                </p>
                <p className="mt-1" style={frames.look.education}>
                  {speaker.education}
                </p>
                <div className="speaker-editorial__actions">
                  <span className="speaker-editorial__bio-toggle">Ver trayectoria</span>
                  <span className="speaker-editorial__social">
                    <FaLinkedinIn className="size-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Back: the full bio, readable at size. */}
            <div
              className={`${face} grid rotate-y-180 grid-rows-[160px_minmax(0,1fr)] bg-brand-navy text-brand-white sm:grid-cols-[2fr_3fr] sm:grid-rows-1`}
            >
              <div className="relative bg-brand-cyan/10">
                {photo && (
                  <img
                    src={speaker.imageSrc}
                    alt={speaker.imageAlt}
                    className={photo}
                    style={focus}
                  />
                )}
              </div>
              <div className="flex min-h-0 flex-col">
                <header className="flex items-start justify-between gap-4 border-b border-brand-cyan/20 px-5 pt-5 pb-4 sm:px-8 sm:pt-8">
                  <div>
                    <p className="text-xs font-medium tracking-[0.18em] text-brand-cyan uppercase">
                      Speaker · 16 de octubre
                    </p>
                    <h2 id={titleId} className="mt-2 font-heading text-h3 font-semibold">
                      {speaker.name}
                    </h2>
                    <p className="mt-2 text-[15px]">{speaker.role}</p>
                    <p className="text-sm text-brand-gray">{speaker.education}</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Cerrar trayectoria"
                    className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-brand-cyan/25 transition hover:rotate-90 hover:border-brand-cyan motion-reduce:hover:rotate-0"
                    onClick={requestClose}
                  >
                    <X aria-hidden="true" className="size-5" />
                  </button>
                </header>
                <div
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 text-[15px] leading-relaxed text-brand-gray focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-cyan sm:px-8 sm:py-5 sm:text-base"
                  data-lenis-prevent
                  tabIndex={0}
                >
                  <p>{speaker.bio}</p>
                </div>
                <footer className="border-t border-brand-cyan/20 px-5 pt-3 pb-5 sm:px-8 sm:pt-4 sm:pb-7">
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-brand-cyan/35 px-[18px] text-sm font-medium text-brand-cyan transition-colors hover:border-brand-cyan"
                  >
                    <FaLinkedinIn aria-hidden="true" className="size-4" />
                    Ver LinkedIn
                    <span className="sr-only"> de {speaker.name} (abre en otra pestaña)</span>
                  </a>
                </footer>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </dialog>,
    document.body,
  )
}
