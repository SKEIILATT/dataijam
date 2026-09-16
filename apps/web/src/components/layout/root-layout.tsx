import { Outlet } from 'react-router'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-brand-navy text-brand-white">
      <SiteHeader />

      <main>
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  )
}
