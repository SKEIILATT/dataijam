import type { HackathonCTAProps } from './types'

export function HackathonCTA({
  heading,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HackathonCTAProps) {
  return (
    <section className="hackathon-cta" aria-labelledby="hackathon-cta-heading">
      <div className="hackathon-cta__blob hackathon-cta__blob--left" aria-hidden="true" />
      <div className="hackathon-cta__blob hackathon-cta__blob--right" aria-hidden="true" />

      <div className="hackathon-cta__inner">
        <div className="hackathon-cta__text">
          <h2 id="hackathon-cta-heading" className="hackathon-cta__heading">
            {heading}
          </h2>
          <p className="hackathon-cta__body">{body}</p>
        </div>

        <div className="hackathon-cta__actions">
          <a href={primaryHref} className="hackathon-cta__btn hackathon-cta__btn--primary">
            {primaryLabel}
            <svg
              aria-hidden="true"
              focusable="false"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {secondaryLabel && secondaryHref && (
            <a href={secondaryHref} className="hackathon-cta__btn hackathon-cta__btn--secondary">
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>

      <style>{`
        .hackathon-cta {
          --cta-bg: var(--color-brand-navy);
          --cta-accent: var(--color-brand-cyan);
          --cta-accent-dark: var(--color-brand-turquoise);
          --cta-text: var(--color-brand-white);
          --cta-muted: var(--color-brand-gray);
          --cta-border: rgba(0, 212, 170, 0.2);
          --cta-focus-ring: #00d4aa;

          position: relative;
          background: var(--cta-bg);
          border-top: 1px solid var(--cta-border);
          padding: clamp(3.5rem, 7vw, 6rem) 1.25rem;
          overflow: hidden;
        }

        .hackathon-cta__blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
          pointer-events: none;
        }

        .hackathon-cta__blob--left {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #00d4aa 0%, transparent 70%);
          top: -100px;
          left: -120px;
        }

        .hackathon-cta__blob--right {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
          bottom: -80px;
          right: -80px;
        }

        /* ── Layout ─────────────────────────────────────────── */
        .hackathon-cta__inner {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          text-align: center;
        }

        /* ── Text ───────────────────────────────────────────── */
        .hackathon-cta__heading {
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 700;
          color: var(--cta-text);
          line-height: 1.15;
          margin: 0 0 0.875rem;
          max-width: 28ch;
        }

        .hackathon-cta__body {
          font-size: 1rem;
          color: var(--cta-muted);
          line-height: 1.65;
          margin: 0;
          max-width: 52ch;
        }

        /* ── Actions ────────────────────────────────────────── */
        .hackathon-cta__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        /* ── Buttons ────────────────────────────────────────── */
        .hackathon-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9375rem;
          font-weight: 700;
          border-radius: 100px;
          padding: 0.8125rem 1.75rem;
          text-decoration: none;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            box-shadow 0.2s ease,
            transform 0.15s ease;
          outline: 2px solid transparent;
          outline-offset: 3px;
        }

        /* Primary: filled teal */
        .hackathon-cta__btn--primary {
          background: var(--cta-accent);
          color: #060e1f; /* near-black on teal — contrast > 7:1 */
          border: 2px solid var(--cta-accent);
        }

        .hackathon-cta__btn--primary:hover {
          background: #00f5c4;
          border-color: #00f5c4;
          box-shadow: 0 0 0 6px rgba(0, 212, 170, 0.18);
          transform: translateY(-2px);
        }

        .hackathon-cta__btn--primary:focus-visible {
          outline-color: var(--cta-focus-ring);
          outline-offset: 4px;
        }

        .hackathon-cta__btn--primary:active {
          transform: translateY(0);
          background: var(--cta-accent-dark);
        }

        .hackathon-cta__btn--primary svg {
          transition: transform 0.2s ease;
        }

        .hackathon-cta__btn--primary:hover svg {
          transform: translateX(3px);
        }

        /* Secondary: ghost */
        .hackathon-cta__btn--secondary {
          background: transparent;
          color: var(--cta-text);
          border: 2px solid rgba(232, 240, 254, 0.25);
        }

        .hackathon-cta__btn--secondary:hover {
          border-color: var(--cta-text);
          background: rgba(232, 240, 254, 0.07);
        }

        .hackathon-cta__btn--secondary:focus-visible {
          outline-color: var(--cta-text);
          outline-offset: 4px;
        }

        /* ── Reduced motion ─────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .hackathon-cta__btn {
            transition: none;
          }
          .hackathon-cta__btn--primary:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  )
}

export default HackathonCTA
