import type { MotionValue } from 'motion/react'
import { useRef, useState } from 'react'
import { FaLinkedinIn } from 'react-icons/fa6'

import { SpeakerBioDialog } from './SpeakerBioDialog'
import { SpeakerCardShell } from './SpeakerCardShell'
import type { Speaker } from './types'
import './speaker-bio-dialog.css'

interface SpeakerCardProps {
  speaker: Speaker
  index: number
  columns: number
  deal: MotionValue<number>
}

export function SpeakerCard({ speaker, index, columns, deal }: SpeakerCardProps) {
  const [bioOpen, setBioOpen] = useState(false)
  const [origin, setOrigin] = useState<HTMLElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const hasBio = speaker.bio.trim() !== ''

  function openBio() {
    setOrigin(toggleRef.current?.closest<HTMLElement>('.speaker-editorial') ?? null)
    setBioOpen(true)
  }

  return (
    <SpeakerCardShell index={index} columns={columns} deal={deal} lifted={bioOpen}>
      <div className="speaker-editorial__portrait">
        {speaker.imageSrc ? (
          <img
            src={speaker.imageSrc}
            alt={speaker.imageAlt}
            loading="lazy"
            decoding="async"
            className="speaker-editorial__photo"
            style={speaker.imagePosition ? { objectPosition: speaker.imagePosition } : undefined}
          />
        ) : (
          <svg aria-hidden="true" viewBox="0 0 200 220" className="speaker-mystery__silhouette">
            <circle cx="100" cy="78" r="44" />
            <path d="M20 220c0-52 36-86 80-86s80 34 80 86z" />
          </svg>
        )}
      </div>
      <div className="speaker-editorial__info">
        <h3 className="font-heading text-base font-semibold">{speaker.name}</h3>
        <p className="mt-2 text-sm leading-5">{speaker.role}</p>
        <p className="mt-1 text-xs">{speaker.education}</p>
        <div className="speaker-editorial__actions">
          {hasBio && (
            <button
              ref={toggleRef}
              type="button"
              aria-haspopup="dialog"
              onClick={openBio}
              className="speaker-editorial__bio-toggle"
            >
              Ver trayectoria
            </button>
          )}
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
      {hasBio && (
        <SpeakerBioDialog
          speaker={speaker}
          origin={origin}
          open={bioOpen}
          onClosed={() => setBioOpen(false)}
        />
      )}
    </SpeakerCardShell>
  )
}

export default SpeakerCard
