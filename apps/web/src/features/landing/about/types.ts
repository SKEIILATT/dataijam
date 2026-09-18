import type { LucideIcon } from 'lucide-react'

export interface ImpactMetric {
  id: string
  value: string
  label: string
  icon: LucideIcon
}

export interface AboutProps {
  eyebrow: string
  heading: string
  description: string
  ctaLabel: string
  ctaHref: string
  imageSrc: string
  imageAlt: string
}
