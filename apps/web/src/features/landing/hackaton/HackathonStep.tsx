import type { HackathonStep as HackathonStepData } from './types'

interface HackathonStepProps {
  step: HackathonStepData
  index: number
}

export function HackathonStep({ step, index }: HackathonStepProps) {
  const Icon = step.icon

  return (
    <li className="hackathon-process__step">
      <div className="hackathon-process__icon-wrap" aria-hidden="true">
        <span className="hackathon-process__step-number">{String(index + 1).padStart(2, '0')}</span>

        <span className="hackathon-process__icon">
          <Icon />
        </span>
      </div>

      <div className="hackathon-process__step-body">
        {step.date && <time className="hackathon-process__step-date">{step.date}</time>}

        <h3 className="hackathon-process__step-title">{step.title}</h3>

        <p className="hackathon-process__step-desc">{step.description}</p>
      </div>
    </li>
  )
}

export default HackathonStep
