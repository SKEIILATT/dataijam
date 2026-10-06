export interface WorkshopInstructor {
  name: string
  role: string
  linkedin: string
  imageSrc: string
  imageAlt: string
}

export interface WorkshopContent {
  eyebrow: string
  title: string
  description: string
  schedule: { start: string; end: string; label: string }
  price: { amount: string; note: string }
  instructor: WorkshopInstructor
  cta: { label: string; href: string }
}
