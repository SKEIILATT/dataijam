export interface AgendaItem {
  start: string
  end: string
  duration: string
  kind: 'opening' | 'talk' | 'break' | 'closing'
  /** Speaker name for talks; omitted while the speaker is still unannounced. */
  title?: string
  detail?: string
}
