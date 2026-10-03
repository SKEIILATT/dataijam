import { LegalPage } from '@/features/legal/LegalPage'
import { privacyPolicy, termsOfUse } from '@/features/legal/legal.data'

export function TermsPage() {
  return (
    <LegalPage
      document={termsOfUse}
      related={{ label: 'Ver política de privacidad', path: privacyPolicy.path }}
    />
  )
}
