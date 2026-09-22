import { ChevronDown } from 'lucide-react'

import { Container } from '@/components/ui/container'

import { faqItems } from './faq.data'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="ds-section ds-contrast">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
          <div data-reveal className="max-w-md lg:self-center">
            <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">FAQ</p>
            <h2 id="faq-heading" className="mt-3 text-h2 font-semibold text-brand-white">
              Preguntas frecuentes
            </h2>
            <p className="mt-4 text-body text-brand-gray">
              Lo que más nos preguntan sobre DatAIJam.
            </p>
            <div className="mt-6 lg:mt-8">
              <p className="text-sm text-brand-gray">¿No encuentras tu duda? Escríbenos.</p>
              <a
                href="mailto:hola@dataijam.com"
                className="mt-1 inline-flex min-h-11 items-center text-sm font-medium text-brand-cyan underline-offset-4 hover:underline"
              >
                hola@dataijam.com
              </a>
            </div>
          </div>

          <div data-stagger className="min-w-0 border-t border-border">
            {faqItems.map((item) => (
              <details
                data-reveal="fade"
                key={item.question}
                className="faq-item border-b border-border"
              >
                <summary className="faq-item__summary text-brand-white">
                  <span className="font-heading text-base font-medium leading-6 sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown aria-hidden="true" className="faq-item__chevron size-5 shrink-0" />
                </summary>
                <p className="faq-item__answer text-body text-brand-gray">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Faq
