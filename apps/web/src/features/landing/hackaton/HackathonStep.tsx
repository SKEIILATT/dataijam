import type { HackathonStep as HackathonStepData } from './types'

interface HackathonStepProps {
  step: HackathonStepData
  index: number
}

export function HackathonStep({ step, index }: HackathonStepProps) {
  const Icon = step.icon

  return (
    <li data-reveal className="ds-card ds-card--step relative flex flex-col items-start gap-4 p-6">
      <div
        aria-hidden="true"
        className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-brand-cyan/15 bg-brand-cyan/10"
      >
        <span className="absolute -top-2 -right-2 rounded-full border border-brand-cyan/15 bg-brand-navy px-1.5 py-0.5 text-[0.625rem] font-bold leading-none text-brand-cyan">
          {String(index + 1).padStart(2, '0')}
        </span>
        <Icon aria-hidden="true" className="size-6 text-brand-cyan" />
      </div>

      <div>
        <h3 className="ds-card-title text-brand-white">{step.title}</h3>
        <p className="mt-2 text-body text-brand-gray">{step.description}</p>
      </div>
    </li>
  )
}

export default HackathonStep
