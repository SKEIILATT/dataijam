import { ArrowRight, CalendarClock, Flag, Mic, UtensilsCrossed, Wrench, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { useId, useRef } from 'react'
import type { AnimationEvent, CSSProperties } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/components/ui/button'
import { usePrefersReducedMotion } from '@/components/ui/use-prefers-reduced-motion'
import { speakers } from '../speakers/speakers.data'
import { agenda, agendaDate } from './agenda.data'
import type { AgendaItem } from './types'
import './agenda-dialog.css'

const icons = { opening: Flag, talk: Mic, break: UtensilsCrossed, workshop: Wrench, closing: Flag }

function AgendaRow({ item, index }: { item: AgendaItem; index: number }) {
  const Icon = icons[item.kind]
  const role = speakers.find((speaker) => speaker.name === item.title)?.role
  const detail = item.detail ?? (item.kind === 'talk' ? role : undefined)

  return (
    <li className="agenda-item" data-kind={item.kind} style={{ '--i': index } as CSSProperties}>
      <p className="agenda-item__time">
        <time dateTime={`2026-10-16T${item.start}`}>{item.start}</time>
      </p>
      <span className="agenda-item__dot" aria-hidden="true">
        <Icon className="size-3.5" />
      </span>
      <div className="min-w-0">
        <p className="agenda-item__title">{item.title}</p>
        {detail && <p className="agenda-item__detail">{detail}</p>}
      </div>
    </li>
  )
}

export function AgendaDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const lenis = useLenis()
  const reducedMotion = usePrefersReducedMotion()

  function open() {
    lenis?.stop()
    dialogRef.current?.showModal()
  }

  function requestClose() {
    const dialog = dialogRef.current
    if (!dialog?.open) return
    if (reducedMotion) dialog.close()
    else dialog.dataset.closing = 'true'
  }

  function onAnimationEnd(event: AnimationEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget && event.animationName === 'agenda-dialog-out') {
      event.currentTarget.close()
    }
  }

  // Lenis must be running before the anchor click reaches the page's scroll handler.
  function goToRegistration() {
    lenis?.start()
    dialogRef.current?.close()
  }

  return (
    <>
      <Button type="button" variant="secondary" aria-haspopup="dialog" onClick={open}>
        Ver agenda
        <CalendarClock aria-hidden="true" className="size-4" />
      </Button>
      {createPortal(
        <dialog
          ref={dialogRef}
          aria-labelledby={titleId}
          className="agenda-dialog"
          onCancel={(event) => {
            event.preventDefault()
            requestClose()
          }}
          onClose={(event) => {
            delete event.currentTarget.dataset.closing
            lenis?.start()
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) requestClose()
          }}
          onAnimationEnd={onAnimationEnd}
        >
          <div className="agenda-dialog__panel">
            <header className="agenda-dialog__header">
              <div>
                <p className="text-xs font-medium tracking-[0.18em] text-brand-cyan uppercase">
                  {agendaDate} · Campus Peñas, Auditorio ESPAE · Guayaquil
                </p>
                <h2 id={titleId} className="mt-2 text-h3 font-semibold text-brand-white">
                  Agenda del evento
                </h2>
                <p className="mt-2 text-sm text-brand-gray">
                  Conferencias, almuerzo y taller en un día de ideas y conexiones.
                </p>
              </div>
              <button
                type="button"
                aria-label="Cerrar agenda"
                className="agenda-dialog__close"
                onClick={requestClose}
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </header>
            <ol
              className="agenda-dialog__list"
              data-lenis-prevent
              tabIndex={0}
              aria-label="Horario del 16 de octubre"
            >
              {agenda.map((item, index) => (
                <AgendaRow key={item.start} item={item} index={index} />
              ))}
            </ol>
            <footer className="agenda-dialog__footer">
              <Button as="a" href="#registro" className="group" onClick={goToRegistration}>
                Quiero asistir
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </footer>
          </div>
        </dialog>,
        document.body,
      )}
    </>
  )
}
