import type { Speaker } from './types'

interface SpeakerCardProps {
  speaker: Speaker
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <li className="speaker-grid__card">
      <div className="speaker-grid__photo-wrap">
        <img
          src={speaker.imageSrc}
          alt={speaker.imageAlt}
          className="speaker-grid__photo"
          loading="lazy"
          width={200}
          height={240}
        />

        <div className="speaker-grid__photo-overlay" aria-hidden="true" />
      </div>

      <div className="speaker-grid__card-body">
        <strong className="speaker-grid__name">{speaker.name}</strong>

        <span className="speaker-grid__role">{speaker.role}</span>

        <span className="speaker-grid__location">
          <svg
            aria-hidden="true"
            focusable="false"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>

          {speaker.location}
        </span>
      </div>
    </li>
  )
}

export default SpeakerCard
