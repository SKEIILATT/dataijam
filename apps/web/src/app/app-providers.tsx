import type { PropsWithChildren } from 'react'
import { ReactLenis } from 'lenis/react'

// Lenis only smooths wheel scrolling. On touch screens scrolling is already native, and its
// per-scroll-event handler was the largest JavaScript cost while flinging on phones.
const smoothWheelScroll = window.matchMedia('(hover: hover) and (pointer: fine)').matches

export function AppProviders({ children }: PropsWithChildren) {
  return smoothWheelScroll ? (
    <ReactLenis root options={{ autoRaf: true, anchors: false, respectReducedMotion: true }}>
      {children}
    </ReactLenis>
  ) : (
    children
  )
}
