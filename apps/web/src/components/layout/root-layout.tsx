import { Outlet, ScrollRestoration } from 'react-router'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'
import { ScrollProgress } from './ScrollProgress'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-brand-navy text-brand-white">
      <ScrollProgress />
      <SiteHeader />

      <main>
        <Outlet />
      </main>

      <SiteFooter />
      <ScrollRestoration />
    </div>
  )
}
