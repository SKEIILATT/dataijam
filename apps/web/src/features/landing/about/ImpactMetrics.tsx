import { CountUp } from '@/components/ui/CountUp'

import { impactMetrics } from './about.data'

export function ImpactMetrics() {
  return (
    <div className="community-metrics">
      <dl data-stagger className="grid grid-cols-2 lg:grid-cols-4">
        {impactMetrics.map((metric) => {
          const Icon = metric.icon

          return (
            <div
              key={metric.id}
              data-reveal
              className="community-metric flex flex-col-reverse items-start gap-2 p-5 sm:p-6"
            >
              <dt className="line-clamp-2 min-h-10 text-xs leading-5 text-brand-gray sm:text-sm">
                {metric.label}
              </dt>
              <dd className="flex items-center gap-2 text-h3 font-semibold text-brand-white">
                <Icon aria-hidden="true" className="size-6 text-brand-cyan" />
                <span className={metric.value === '—' ? 'community-metric__pending' : undefined}>
                  {metric.value === '—' ? (
                    'Pronto'
                  ) : /^\d+$/.test(metric.value) ? (
                    <CountUp value={Number(metric.value)} />
                  ) : (
                    metric.value
                  )}
                </span>
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}

export default ImpactMetrics
