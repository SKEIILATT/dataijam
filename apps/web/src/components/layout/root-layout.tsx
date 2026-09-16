import { Outlet } from 'react-router'

export function RootLayout() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Outlet />
    </main>
  )
}
