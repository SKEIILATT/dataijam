import { steps } from './hackathon.data'
import HackathonStep from './HackathonStep'
interface HackathonProcessProps {
  eyebrow: string
  heading: string
  subheading: string
}

export function HackathonProcess({ eyebrow, heading, subheading }: HackathonProcessProps) {
  return (
    <section className="hackathon-process" aria-labelledby="hackathon-process-heading">
      <div className="hackathon-process__inner">
        <div className="hackathon-process__header">
          <span className="hackathon-process__eyebrow" aria-hidden="true">
            {eyebrow}
          </span>
          <h2 id="hackathon-process-heading" className="hackathon-process__heading">
            {heading}
          </h2>
          <p className="hackathon-process__subheading">{subheading}</p>
        </div>

        <ol className="hackathon-process__steps" aria-label="Pasos del hackathon">
          {steps.map((step, index) => (
            <HackathonStep key={step.title} step={step} index={index} />
          ))}
        </ol>
      </div>

      <style>{`
        .hackathon-process {
          --hp-bg: var(--color-brand-navy);
          --hp-surface: var(--color-brand-navy);
          --hp-accent: var(--color-brand-cyan);
          --hp-accent-2: var(--color-brand-turquoise);
          --hp-text: var(--color-brand-white);
          --hp-muted: var(--color-brand-gray);
          --hp-border: color-mix(in srgb, var(--color-brand-cyan) 18%, transparent);
          --hp-number: color-mix(in srgb, var(--color-brand-cyan) 12%, transparent);
          --hp-radius: 16px;
          --hp-gap: clamp(1.5rem, 3vw, 2.5rem);

          background: var(--hp-bg);
          padding: clamp(3rem, 6vw, 6rem) 1.25rem;
          overflow: hidden;
        }

        .hackathon-process__inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Header ─────────────────────────────────────────── */
        .hackathon-process__header {
          text-align: center;
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
        }

        .hackathon-process__eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--hp-accent);
          border: 1px solid var(--hp-border);
          border-radius: 100px;
          padding: 0.25rem 0.875rem;
          margin-bottom: 1rem;
        }

        .hackathon-process__heading {
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 700;
          color: var(--hp-text);
          line-height: 1.15;
          margin: 0 0 0.875rem;
          max-width: 32ch;
          margin-left: auto;
          margin-right: auto;
        }

        .hackathon-process__subheading {
          font-size: 1rem;
          color: var(--hp-muted);
          max-width: 52ch;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Steps list ─────────────────────────────────────── */
        .hackathon-process__steps {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: var(--hp-gap);
          position: relative;
        }

        @media (min-width: 768px) {
          .hackathon-process__steps::before {
            content: "";
            position: absolute;
            top: 2.25rem; 
            left: calc(var(--hp-gap) / 2 + 2.25rem);
            right: calc(var(--hp-gap) / 2 + 2.25rem);
            height: 2px;
            background: linear-gradient(
              90deg,
              var(--hp-accent) 0%,
              rgba(0, 212, 170, 0.15) 100%
            );
            z-index: 0;
          }
        }

        .hackathon-process__step {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          background: var(--hp-surface);
          border: 1px solid var(--hp-border);
          border-radius: var(--hp-radius);
          padding: 1.5rem;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .hackathon-process__step:hover {
          border-color: var(--hp-accent);
          transform: translateY(-3px);
        }

        @media (max-width: 700px) {
          .hackathon-process__steps {
            grid-template-columns: 1fr;
          }
        }

        .hackathon-process__icon-wrap {
          position: relative;
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background: var(--hp-number);
          border: 2px solid var(--hp-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hackathon-process__step-number {
          position: absolute;
          top: -0.5rem;
          right: -0.5rem;
          font-size: 0.625rem;
          font-weight: 700;
          color: var(--hp-accent);
          background: var(--hp-bg);
          border: 1px solid var(--hp-border);
          border-radius: 100px;
          padding: 0.1rem 0.35rem;
          line-height: 1;
        }

        .hackathon-process__icon {
          color: var(--hp-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.5rem;
          height: 1.5rem;
        }

        .hackathon-process__icon svg {
          width: 100%;
          height: 100%;
        }

        /* ── Step body ──────────────────────────────────────── */
        .hackathon-process__step-body {
          flex: 1;
        }

        .hackathon-process__step-date {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--hp-accent-2);
          margin-bottom: 0.375rem;
        }

        .hackathon-process__step-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--hp-text);
          margin: 0 0 0.5rem;
          line-height: 1.3;
        }

        .hackathon-process__step-desc {
          font-size: 0.875rem;
          color: var(--hp-muted);
          margin: 0;
          line-height: 1.6;
        }

        /* ── Reduced motion ─────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .hackathon-process__step {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}

export default HackathonProcess
