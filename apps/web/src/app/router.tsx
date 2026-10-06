import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/components/layout/root-layout'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'terminos',
        lazy: async () => ({ Component: (await import('@/pages/terms-page')).TermsPage }),
      },
      {
        path: 'privacidad',
        lazy: async () => ({ Component: (await import('@/pages/privacy-page')).PrivacyPage }),
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
])
