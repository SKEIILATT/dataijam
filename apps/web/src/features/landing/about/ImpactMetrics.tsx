import { impactMetrics } from './about.data'

export function ImpactMetrics() {
  return (
    <div className="ds-content-gap">
      <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {impactMetrics.map((metric) => {
          const Icon = metric.icon

          return (
            <div
              key={metric.id}
              data-reveal
              className="flex flex-col-reverse items-center gap-2 ds-card ds-card--metric p-6 text-center sm:items-start sm:text-left"
            >
              <dt className="line-clamp-2 min-h-10 text-xs leading-5 text-brand-gray sm:text-sm">
                {metric.label}
              </dt>
              <dd className="flex items-center gap-2 text-h3 font-semibold text-brand-white">
                <Icon aria-hidden="true" className="size-6 text-brand-cyan" />
                {metric.value}
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}

export default ImpactMetrics
