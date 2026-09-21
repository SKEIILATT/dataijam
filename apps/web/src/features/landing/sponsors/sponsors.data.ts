export interface Sponsor {
  id: string
  name: string
  /** Import a local SVG or transparent PNG. Logos sit on a light surface in both themes. */
  logo: string
  website?: string
}

// Add confirmed partners here. Empty data intentionally displays reserved spaces,
// not fictional brands or implied endorsements.
export const sponsors: Sponsor[] = []
