import { useId, useState } from 'react'

import { rubrics } from './hackathon.data'

export function HackathonEvaluation() {
  const [activeStage, setActiveStage] = useState(0)
  const panelId = useId()
  const rubric = rubrics[activeStage]

  return (
    <div className="hackathon-evaluation__content">
      <div className="rubric-selector" role="group" aria-label="Etapa de evaluación">
        {rubrics.map((item, index) => (
          <button
            key={item.stage}
            type="button"
            aria-pressed={index === activeStage}
            aria-controls={panelId}
            onClick={() => setActiveStage(index)}
          >
            <span>{item.stage}</span>
            {index === 0 ? 'Eliminatoria' : 'Final'}
          </button>
        ))}
      </div>

      <section
        id={panelId}
        aria-label={`${rubric.title} (${rubric.stage})`}
        className="rubric-panel"
      >
        <div className="rubric-panel__intro">
          <p className="text-xs font-medium tracking-[0.14em] text-brand-cyan uppercase">
            {rubric.stage}
          </p>
          <h4 className="mt-2 ds-card-title text-brand-white">{rubric.title}</h4>
          <p className="mt-3 text-body text-brand-gray">{rubric.summary}</p>
          <p className="rubric-panel__total">
            <strong>
              {rubric.criteria.reduce((total, criterion) => total + criterion.weight, 0)}%
            </strong>
            <span>de la evaluación de esta etapa</span>
          </p>
        </div>

        <ul key={rubric.stage} className="rubric-criteria">
          {rubric.criteria.map((criterion) => (
            <li key={criterion.name}>
              <div className="rubric-criteria__label">
                <span>{criterion.name}</span>
                <strong>{criterion.weight}%</strong>
              </div>
              <div className="rubric-criteria__track" aria-hidden="true">
                <div style={{ width: `${criterion.weight}%` }} />
              </div>
              <p className="mt-2 text-sm text-brand-gray">{criterion.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default HackathonEvaluation
