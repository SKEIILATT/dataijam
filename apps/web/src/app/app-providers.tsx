import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactLenis } from 'lenis/react'
import { queryClient } from './query-client'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactLenis root options={{ autoRaf: true, anchors: false, respectReducedMotion: true }}>
        {children}
      </ReactLenis>
    </QueryClientProvider>
  )
}
