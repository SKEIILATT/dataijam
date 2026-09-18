import { impactMetrics } from './about.data'

export function ImpactMetrics() {
  return (
    <div className="mt-12 sm:mt-16">
      <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {impactMetrics.map((metric) => {
          const Icon = metric.icon

          return (
            <div
              key={metric.id}
              className="flex flex-col-reverse items-center gap-1 rounded-xl border border-brand-white/10 bg-brand-white/5 p-5 text-center sm:items-start sm:text-left"
            >
              <dt className="line-clamp-2 min-h-10 text-xs leading-5 text-brand-gray sm:text-sm">
                {metric.label}
              </dt>
              <dd className="flex items-center gap-2 text-2xl font-bold text-brand-white sm:text-3xl">
                <Icon aria-hidden="true" className="h-5 w-5 text-brand-cyan sm:h-6 sm:w-6" />
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
