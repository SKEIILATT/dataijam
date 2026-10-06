export interface Speaker {
  name: string
  role: string
  education: string
  bio: string
  linkedin: string
  /** Without a photo the card shows the mystery silhouette. */
  imageSrc?: string
  imageAlt: string
  imagePosition?: string
}

export interface UpcomingSpeaker {
  name: string
  role: string
}
