import { ChevronDown } from 'lucide-react'

import { Container } from '@/components/ui/container'

import { faqItems } from './faq.data'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="ds-section ds-contrast">
      <Container>
        <div data-reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">FAQ</p>
          <h2 id="faq-heading" className="mt-3 text-h2 font-semibold text-brand-white">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-body text-brand-gray">
            Lo que más nos preguntan sobre DatAIJam. ¿No encuentras tu duda? Escríbenos a{' '}
            <a href="mailto:hola@dataijam.com" className="text-brand-cyan hover:underline">
              hola@dataijam.com
            </a>
            .
          </p>
        </div>

        <div data-reveal className="ds-content-gap flex flex-col gap-3">
          {faqItems.map((item) => (
            <details key={item.question} className="faq-item ds-card ds-card--quiet">
              <summary className="faq-item__summary">
                <span className="ds-card-title text-brand-white">{item.question}</span>
                <ChevronDown aria-hidden="true" className="faq-item__chevron size-5 shrink-0" />
              </summary>
              <p className="faq-item__answer text-body text-brand-gray">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Faq
