import { useEffect, useState } from 'react'

import { router } from '@/app/router'
import { Button } from '@/components/ui/button'
import {
  listenForAnalyticsPreferences,
  measurementId,
  readAnalyticsConsent,
  saveAnalyticsConsent,
  startAnalytics,
  stopAnalytics,
  trackPageView,
} from './analytics'
import type { AnalyticsConsentChoice } from './analytics'

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<AnalyticsConsentChoice | null>(readAnalyticsConsent)
  const [open, setOpen] = useState(() => readAnalyticsConsent() === null)

  useEffect(() => listenForAnalyticsPreferences(() => setOpen(true)), [])

  useEffect(() => {
    if (!measurementId || choice !== 'accepted') return
    startAnalytics()
    trackPageView(router.state.location.pathname)
    return router.subscribe((state) => {
      if (state.navigation.state === 'idle') trackPageView(state.location.pathname)
    })
  }, [choice])

  if (!measurementId || !open) return null

  function decide(nextChoice: AnalyticsConsentChoice) {
    if (nextChoice === 'rejected') stopAnalytics()
    saveAnalyticsConsent(nextChoice)
    setChoice(nextChoice)
    setOpen(false)
  }

  return (
    <aside
      aria-labelledby="analytics-consent-heading"
      className="fixed inset-x-4 bottom-4 z-[120] mx-auto max-h-[calc(100dvh-2rem)] max-w-3xl overflow-y-auto rounded-3xl border border-brand-cyan/30 bg-surface-card p-5 text-brand-white shadow-2xl sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-brand-cyan uppercase">
            Tu privacidad
          </p>
          <h2 id="analytics-consent-heading" className="mt-1 font-heading text-lg font-semibold">
            ¿Aceptas la analítica del sitio?
          </h2>
        </div>
        {choice && (
          <button
            type="button"
            aria-label="Cerrar preferencias de analítica"
            onClick={() => setOpen(false)}
            className="rounded-full px-2 text-2xl leading-none text-brand-gray hover:text-brand-white"
          >
            ×
          </button>
        )}
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-gray">
        Solo si aceptas, usaremos Google Analytics 4 para medir visitas y clics al formulario. No le
        enviamos lo que escribes allí. Cambia tu decisión desde el pie de página.{' '}
        <a href="/privacidad" className="font-medium text-brand-cyan underline underline-offset-4">
          Política de privacidad
        </a>
        .
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={() => decide('rejected')}>
          Rechazar
        </Button>
        <Button onClick={() => decide('accepted')}>Aceptar analítica</Button>
      </div>
    </aside>
  )
}
