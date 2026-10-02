import type { HackathonStep as HackathonStepData } from './types'

interface HackathonStepProps {
  step: HackathonStepData
  index: number
}

export function HackathonStep({ step, index }: HackathonStepProps) {
  const Icon = step.icon

  return (
    <li data-reveal className="hackathon-step">
      <div className="hackathon-step__marker" aria-hidden="true">
        <Icon className="size-6" />
      </div>
      <p className="mt-5 text-xs font-medium tracking-[0.14em] text-brand-cyan uppercase">
        Semana {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="mt-2 font-heading text-lg font-medium text-brand-white">{step.title}</h3>
      <p className="mt-2 text-sm leading-6 text-brand-gray">{step.description}</p>
      <p className="hackathon-step__deliverable mt-3 text-xs leading-5 text-brand-gray">
        <span className="font-medium text-brand-white">Entregable: </span>
        {step.deliverable}
      </p>
    </li>
  )
}

export default HackathonStep
