import { AudioLines } from 'lucide-react'

import speakerPlaceholder from '@/assets/images/speakers/speaker-placeholder.svg'
import type { Speaker } from './types'

interface SpeakerCardProps {
  speaker: Speaker
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const pending = speaker.imageSrc === speakerPlaceholder

  return (
    <li className="speaker-editorial">
      <div className="speaker-editorial__portrait">
        {pending ? (
          <>
            <span className="speaker-editorial__orbit" aria-hidden="true" />
            <span className="speaker-editorial__monogram" aria-hidden="true">
              <AudioLines strokeWidth={1} className="size-20" />
            </span>
            <span className="speaker-editorial__label">Próximamente</span>
          </>
        ) : (
          <img
            src={speaker.imageSrc}
            alt={speaker.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="speaker-editorial__info">
        <h3 className="font-heading text-base font-semibold">{speaker.name}</h3>
        <p className="mt-2 text-sm leading-5">{speaker.role}</p>
        {!pending && <p className="mt-3 text-xs">{speaker.location}</p>}
      </div>
    </li>
  )
}

export default SpeakerCard
