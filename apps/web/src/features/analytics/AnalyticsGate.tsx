import { lazy, Suspense } from 'react'
import { measurementId } from './analytics'

const AnalyticsConsent = lazy(() =>
  import('./AnalyticsConsent').then((module) => ({ default: module.AnalyticsConsent })),
)

export function AnalyticsGate() {
  if (!measurementId) return null
  return (
    <Suspense fallback={null}>
      <AnalyticsConsent />
    </Suspense>
  )
}
