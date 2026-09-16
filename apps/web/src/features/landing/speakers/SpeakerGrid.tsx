import { speakers } from './speakers.data'
import SpeakerCard from './SpeakerCard'
interface SpeakerGridProps {
  eyebrow: string
  heading: string
  subheading: string
}

export function SpeakerGrid({ eyebrow, heading, subheading }: SpeakerGridProps) {
  return (
    <section className="speaker-grid" aria-labelledby="speaker-grid-heading">
      <div className="speaker-grid__inner">
        <div className="speaker-grid__intro">
          <span className="speaker-grid__eyebrow" aria-hidden="true">
            {eyebrow}
          </span>
          <h2 id="speaker-grid-heading" className="speaker-grid__heading">
            {heading}
          </h2>
          <p className="speaker-grid__subheading">{subheading}</p>
        </div>

        <ul className="speaker-grid__list" aria-label="Speakers del evento">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </ul>
      </div>

      <style>{`
        /* ── Tokens ─────────────────────────────────────────── */
        .speaker-grid {
          --sg-bg: var(--color-brand-white);
          --sg-surface: var(--color-brand-navy);
          --sg-accent: var(--color-brand-cyan);
          --sg-accent-soft: var(--color-brand-turquoise);
          --sg-text: var(--color-brand-blue);
          --sg-muted: var(--color-brand-gray);
          --sg-border: color-mix(in srgb, var(--color-brand-cyan) 18%, transparent);
          --sg-radius: 14px;
          --sg-gap: clamp(1.5rem, 3vw, 2.5rem);

          background: var(--sg-bg);
          padding: clamp(3rem, 6vw, 6rem) 1.25rem;
        }

        .speaker-grid__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2rem, 4vw, 3rem);
          align-items: start;
        }

        @media (min-width: 900px) {
          .speaker-grid__inner {
            grid-template-columns: 280px 1fr;
          }
        }

        .speaker-grid__eyebrow {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--sg-accent);
          border: 1px solid var(--sg-border);
          border-radius: 100px;
          padding: 0.25rem 0.875rem;
          margin-bottom: 1rem;
        }

        .speaker-grid__heading {
          font-size: clamp(1.5rem, 3.5vw, 2.25rem);
          font-weight: 700;
          color: var(--sg-text);
          line-height: 1.2;
          margin: 0 0 0.875rem;
          max-width: 20ch;
        }

        .speaker-grid__subheading {
          font-size: 0.9rem;
          color: var(--sg-muted);
          line-height: 1.65;
          margin: 0 0 1.75rem;
          max-width: 38ch;
        }

        .speaker-grid__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--sg-accent);
          background: var(--sg-accent-soft);
          border: 1px solid var(--sg-border);
          border-radius: 100px;
          padding: 0.625rem 1.25rem;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease, outline-offset 0.15s ease;
          outline: 2px solid transparent;
          outline-offset: 2px;
        }

        .speaker-grid__cta:hover {
          background: var(--sg-accent);
          color: #060e1f;
        }

        .speaker-grid__cta:focus-visible {
          outline-color: var(--sg-accent);
          outline-offset: 4px;
        }

        .speaker-grid__cta svg {
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .speaker-grid__cta:hover svg {
          transform: translateX(3px);
        }

        .speaker-grid__list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .speaker-grid__list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .speaker-grid__list {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .speaker-grid__card {
          background: var(--sg-surface);
          border: 1px solid var(--sg-border);
          border-radius: var(--sg-radius);
          overflow: hidden;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .speaker-grid__card:hover {
          border-color: var(--sg-accent);
          transform: translateY(-4px);
        }

        .speaker-grid__photo-wrap {
          position: relative;
          aspect-ratio: 5 / 6;
          overflow: hidden;
        }

        .speaker-grid__photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          /* Desaturate slightly for visual cohesion; hovering restores color */
          filter: grayscale(20%);
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .speaker-grid__card:hover .speaker-grid__photo {
          filter: grayscale(0%);
          transform: scale(1.03);
        }

        .speaker-grid__photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(6, 14, 31, 0.85) 0%,
            transparent 55%
          );
          pointer-events: none;
        }

        /* ── Card body ──────────────────────────────────────── */
        .speaker-grid__card-body {
          padding: 0.875rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .speaker-grid__name {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--sg-text);
          line-height: 1.3;
        }

        .speaker-grid__role {
          font-size: 0.75rem;
          color: var(--sg-accent);
          font-weight: 500;
        }

        .speaker-grid__location {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          color: var(--sg-muted);
          margin-top: 0.15rem;
        }

        .speaker-grid__location svg {
          flex-shrink: 0;
          color: var(--sg-muted);
        }

        @media (prefers-reduced-motion: reduce) {
          .speaker-grid__card,
          .speaker-grid__photo,
          .speaker-grid__cta svg {
            transition: none;
          }
          .speaker-grid__card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  )
}

export default SpeakerGrid
