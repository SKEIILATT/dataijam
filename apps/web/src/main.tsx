import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { AppProviders } from '@/app/app-providers'
import { router } from '@/app/router'
import './index.css'

// Aplicado aquí (no solo en SiteHeader) para que el tema guardado se
// respete en cualquier ruta, incluida NotFoundPage, que no monta el header.
document.documentElement.dataset.theme =
  window.localStorage.getItem('dataijam-theme') === 'light' ? 'light' : 'dark'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
)
