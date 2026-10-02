import type { LucideIcon } from 'lucide-react'

export interface HackathonStep {
  title: string
  description: string
  deliverable: string
  icon: LucideIcon
}

export interface RubricCriterion {
  name: string
  description: string
  weight: number
}

export interface Rubric {
  title: string
  stage: string
  summary: string
  criteria: RubricCriterion[]
}
