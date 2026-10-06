import { Sparkles } from 'lucide-react'
import type { MotionValue } from 'motion/react'

import { SpeakerCardShell } from './SpeakerCardShell'

interface SpeakerMysteryCardProps {
  name: string
  role: string
  index: number
  columns: number
  deal: MotionValue<number>
}

export function SpeakerMysteryCard({ name, role, index, columns, deal }: SpeakerMysteryCardProps) {
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
          Perfil próximamente
        </span>
      </div>
      <div className="speaker-editorial__info">
        <h3 className="font-heading text-base font-semibold">{name}</h3>
        <p className="mt-2 text-sm leading-5">{role}</p>
      </div>
    </SpeakerCardShell>
  )
}
