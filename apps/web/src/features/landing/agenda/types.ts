export interface AgendaItem {
  start: string
  kind: 'opening' | 'talk' | 'break' | 'workshop' | 'closing'
  title: string
  detail?: string
}
