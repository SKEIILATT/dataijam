export type LegalBlock = string | { list: string[] }

export interface LegalSection {
  id: string
  title: string
  blocks: LegalBlock[]
}

export interface LegalDocument {
  path: string
  eyebrow: string
  title: string
  intro: string
  updated: string
  highlights: { title: string; text: string }[]
  sections: LegalSection[]
}
