import { LegalPage } from '@/features/legal/LegalPage'
import { privacyPolicy, termsOfUse } from '@/features/legal/legal.data'

export function PrivacyPage() {
  return (
    <LegalPage
      document={privacyPolicy}
      related={{ label: 'Ver términos y condiciones', path: termsOfUse.path }}
    />
  )
}
