import { ArrowUpRight, ChevronDown, MessageCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'

import { Container } from '@/components/ui/container'
import { ScrollWords } from '@/components/ui/ScrollWords'
import { usePrefersReducedMotion } from '@/components/ui/use-prefers-reduced-motion'

import { faqItems } from './faq.data'

const categories = [
  { id: 'evento', label: 'El evento' },
  { id: 'hackathon', label: 'Hackathon' },
  { id: 'inscripcion', label: 'Inscripción' },
] as const

export function Faq() {
  const [category, setCategory] = useState<(typeof categories)[number]['id']>('evento')
  const visibleItems = faqItems.filter((item) => item.category === category)
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const glyphRotate = useTransform(scrollYProgress, [0, 1], [-24, 18])
  const glyphY = useTransform(scrollYProgress, [0, 1], ['18%', '-22%'])

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      className="ds-section faq-section"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] lg:gap-16">
          <div className="order-2 min-w-0 lg:order-1">
            <div className="faq-categories" role="group" aria-label="Filtrar preguntas por tema">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  aria-pressed={category === item.id}
                  aria-controls="faq-answers"
                  onClick={() => setCategory(item.id)}
                >
                  {item.label}
                  <span>{faqItems.filter((question) => question.category === item.id).length}</span>
                  {category === item.id && (
                    <motion.span
                      layoutId="faq-category-indicator"
                      className="faq-category-indicator"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>
            <div id="faq-answers" className="faq-answers">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: reducedMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
                  {visibleItems.map((item, index) => (
                    <details key={item.question} className="faq-item border-b border-border">
                      <summary className="faq-item__summary text-brand-white">
                        <span className="font-heading text-base font-medium leading-6 sm:text-lg">
                          <span className="faq-question-number" aria-hidden="true">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {item.question}
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className="faq-item__chevron size-5 shrink-0"
                        />
                      </summary>
                      <p className="faq-item__answer text-body text-brand-gray">{item.answer}</p>
                    </details>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div data-reveal className="faq-intro order-1 max-w-md lg:order-2 lg:self-start">
            {!reducedMotion && (
              <motion.span
                aria-hidden="true"
                className="faq-intro__glyph"
                style={{ rotate: glyphRotate, y: glyphY }}
              >
                ?
              </motion.span>
            )}
            <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">FAQ</p>
            <h2 id="faq-heading" className="mt-3 text-h2 font-semibold text-brand-white">
              <ScrollWords text="Todo empieza con una pregunta." />
            </h2>
            <p className="mt-4 text-body text-brand-gray">
              Lo que más nos preguntan sobre DatAIJam.
            </p>
            <div className="faq-contact mt-6 lg:mt-8">
              <MessageCircle aria-hidden="true" className="mb-4 size-7 text-brand-cyan" />
              <p className="text-sm text-brand-gray">¿No encuentras tu duda? Escríbenos.</p>
              <a href="mailto:registros@dataijam.com" className="editorial-text-link mt-1">
                registros@dataijam.com
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Faq
