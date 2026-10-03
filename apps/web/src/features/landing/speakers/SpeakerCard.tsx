import type { MotionValue } from 'motion/react'
import { useId, useState } from 'react'
import { FaLinkedinIn } from 'react-icons/fa6'

import { SpeakerCardShell } from './SpeakerCardShell'
import type { Speaker } from './types'

interface SpeakerCardProps {
  speaker: Speaker
  index: number
  columns: number
  deal: MotionValue<number>
}

export function SpeakerCard({ speaker, index, columns, deal }: SpeakerCardProps) {
  const [bioOpen, setBioOpen] = useState(false)
  const bioId = useId()

  return (
    <SpeakerCardShell index={index} columns={columns} deal={deal}>
      <div className="speaker-editorial__portrait">
        <img
          src={speaker.imageSrc}
          alt={speaker.imageAlt}
          loading="lazy"
          decoding="async"
          className="speaker-editorial__photo"
        />
        <div id={bioId} className="speaker-editorial__bio" data-open={bioOpen}>
          <p>{speaker.bio}</p>
        </div>
      </div>
      <div className="speaker-editorial__info">
        <h3 className="font-heading text-base font-semibold">{speaker.name}</h3>
        <p className="mt-2 text-sm leading-5">{speaker.role}</p>
        <p className="mt-1 text-xs">{speaker.education}</p>
        <div className="speaker-editorial__actions">
          <button
            type="button"
            aria-expanded={bioOpen}
            aria-controls={bioId}
            onClick={() => setBioOpen((open) => !open)}
            className="speaker-editorial__bio-toggle"
          >
            {bioOpen ? 'Cerrar trayectoria' : 'Ver trayectoria'}
          </button>
          <a
            href={speaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn de ${speaker.name} (abre en otra pestaña)`}
            className="speaker-editorial__social"
          >
            <FaLinkedinIn aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </SpeakerCardShell>
  )
}

export default SpeakerCard
