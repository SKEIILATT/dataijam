import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import type { DotLottieReactProps } from '@lottiefiles/dotlottie-react'
import { useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type Player = Parameters<NonNullable<DotLottieReactProps['dotLottieRefCallback']>>[0]

export function ConnectionOrbitPlayer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [player, setPlayer] = useState<Player>(null)

  // The loop keeps rendering offscreen otherwise, for the rest of the visit.
  useEffect(() => {
    if (!player) return
    if (inView) player.play()
    else player.pause()
  }, [player, inView])

  return (
    <div ref={ref} className="h-full w-full">
      <DotLottieReact
        src="/animations/connection-orbit.json"
        autoplay
        loop
        dotLottieRefCallback={setPlayer}
      />
    </div>
  )
}
