export type AnalyticsConsentChoice = 'accepted' | 'rejected'

const consentKey = 'dataijam-analytics-consent-v1'
const preferencesEvent = 'dataijam:analytics-preferences'
const rawMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? ''

// A missing or malformed ID keeps the integration completely inactive.
export const measurementId = /^G-[A-Z0-9]+$/.test(rawMeasurementId) ? rawMeasurementId : null

type GoogleTagWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

let started = false
let active = false
let lastPagePath = ''

function setDisabled(disabled: boolean) {
  if (!measurementId) return
  Reflect.set(window, `ga-disable-${measurementId}`, disabled)
}

function gtag(...args: unknown[]) {
  const browser = window as GoogleTagWindow
  browser.gtag?.(...args)
}

export function readAnalyticsConsent(): AnalyticsConsentChoice | null {
  try {
    const choice = window.localStorage.getItem(consentKey)
    return choice === 'accepted' || choice === 'rejected' ? choice : null
  } catch {
    return null
  }
}

export function saveAnalyticsConsent(choice: AnalyticsConsentChoice) {
  try {
    window.localStorage.setItem(consentKey, choice)
  } catch {
    // The choice still applies for this visit if browser storage is unavailable.
  }
}

export function openAnalyticsPreferences() {
  window.dispatchEvent(new Event(preferencesEvent))
}

export function listenForAnalyticsPreferences(callback: () => void) {
  window.addEventListener(preferencesEvent, callback)
  return () => window.removeEventListener(preferencesEvent, callback)
}

export function startAnalytics() {
  if (!measurementId) return
  active = true
  setDisabled(false)
  if (started) {
    gtag('consent', 'update', { analytics_storage: 'granted' })
    return
  }

  const browser = window as GoogleTagWindow
  browser.dataLayer ??= []
  // gtag.js only processes Arguments objects; plain arrays are silently ignored.
  browser.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    browser.dataLayer?.push(arguments)
  }

  // Nothing is requested from Google until the visitor explicitly accepts.
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  gtag('js', new Date())
  gtag('consent', 'update', { analytics_storage: 'granted' })
  gtag('config', measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.append(script)
  started = true
}

function clearAnalyticsCookies() {
  const domains: (string | undefined)[] = [undefined]
  const parts = window.location.hostname.split('.')
  for (let index = 0; index < parts.length - 1; index += 1) {
    domains.push(`.${parts.slice(index).join('.')}`)
  }
  document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain ? `; Domain=${domain}` : ''}`
      })
    })
}

export function stopAnalytics() {
  if (!measurementId || !started) return
  active = false
  setDisabled(true)
  gtag('consent', 'update', { analytics_storage: 'denied' })
  clearAnalyticsCookies()
  lastPagePath = ''
}

export function trackPageView(pathname: string) {
  if (!measurementId || !active || pathname === lastPagePath) return
  const previousPage = lastPagePath
  lastPagePath = pathname
  const title =
    pathname === '/terminos'
      ? 'Términos y condiciones · DatAIJam'
      : pathname === '/privacidad'
        ? 'Política de privacidad · DatAIJam'
        : pathname === '/'
          ? 'DatAIJam · Conferencias + Hackathon de datos e IA'
          : 'Página no encontrada · DatAIJam'
  gtag('event', 'page_view', {
    page_location: `${window.location.origin}${pathname}`,
    page_title: title,
    page_referrer: previousPage ? `${window.location.origin}${previousPage}` : document.referrer,
  })
}

export function trackRegistrationFormOpen() {
  if (!active) return
  gtag('event', 'registration_form_open')
}
