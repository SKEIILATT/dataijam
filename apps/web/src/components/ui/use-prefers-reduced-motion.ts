import { useSyncExternalStore } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function subscribe(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches
}

/** Read the OS preference and update if it changes while the page is open. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true)
}
