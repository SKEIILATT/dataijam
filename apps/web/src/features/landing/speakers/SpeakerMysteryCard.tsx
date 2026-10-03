import { Sparkles } from 'lucide-react'
import type { MotionValue } from 'motion/react'

import { SpeakerCardShell } from './SpeakerCardShell'

interface SpeakerMysteryCardProps {
  name?: string
  index: number
  columns: number
  deal: MotionValue<number>
}

export function SpeakerMysteryCard({ name, index, columns, deal }: SpeakerMysteryCardProps) {
  return (
    <SpeakerCardShell index={index} columns={columns} deal={deal} className="speaker-mystery">
      <div className="speaker-editorial__portrait">
        <svg aria-hidden="true" viewBox="0 0 200 220" className="speaker-mystery__silhouette">
          <circle cx="100" cy="78" r="44" />
          <path d="M20 220c0-52 36-86 80-86s80 34 80 86z" />
        </svg>
        <span className="speaker-mystery__scan" aria-hidden="true" />
        <span className="speaker-editorial__label speaker-mystery__label">
          <Sparkles aria-hidden="true" className="size-3.5" />
          Pronto se revelará
        </span>
      </div>
      <div className="speaker-editorial__info">
        {name ? (
          <h3 className="font-heading text-base font-semibold">{name}</h3>
        ) : (
          <>
            <h3 className="sr-only">Speaker por revelar</h3>
            <p
              aria-hidden="true"
              className="speaker-mystery__redacted font-heading text-base font-semibold"
            >
              Nombre del speaker
            </p>
          </>
        )}
        <p aria-hidden="true" className="speaker-mystery__redacted mt-2 text-sm leading-5">
          Cargo y organización
        </p>
        {name && <p className="sr-only">Perfil por revelar</p>}
      </div>
    </SpeakerCardShell>
  )
}
