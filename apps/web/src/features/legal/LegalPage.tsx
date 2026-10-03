import { ArrowRight, Mail } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

import { Container } from '@/components/ui/container'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { contactEmail } from './legal.data'
import type { LegalBlock, LegalDocument } from './types'
import './legal.css'

function withEmailLinks(text: string): ReactNode {
  const parts = text.split(contactEmail)
  if (parts.length === 1) return text
  return parts.map((part, index) => (
    <Fragment key={index}>
      {part}
      {index < parts.length - 1 && <a href={`mailto:${contactEmail}`}>{contactEmail}</a>}
    </Fragment>
  ))
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') return <p>{withEmailLinks(block)}</p>
  return (
    <ul>
      {block.list.map((item) => (
        <li key={item}>{withEmailLinks(item)}</li>
      ))}
    </ul>
  )
}

type LegalPageProps = {
  document: LegalDocument
  related: { label: string; path: string }
}

export function LegalPage({ document: legal, related }: LegalPageProps) {
  const [activeId, setActiveId] = useState(legal.sections[0].id)

  useEffect(() => {
    const sections = legal.sections
      .map(({ id }) => window.document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [legal])

  return (
    <ScrollReveal className="legal-page">
      <title>{`${legal.title} · DatAIJam`}</title>
      <Container>
        <header data-reveal className="legal-page__header">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">
            {legal.eyebrow}
          </p>
          <h1 className="mt-3 text-h2 font-semibold text-brand-white">{legal.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-gray sm:text-lg sm:leading-8">
            {legal.intro}
          </p>
          <p className="legal-page__updated">Última actualización: {legal.updated}</p>
        </header>

        <ul data-stagger className="legal-page__highlights" aria-label="En resumen">
          {legal.highlights.map((item) => (
            <li key={item.title} data-reveal>
              <p className="legal-page__highlight-title">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-brand-gray">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="legal-page__layout">
          <nav aria-label="Contenido" className="legal-page__toc">
            <p className="legal-page__toc-title">Contenido</p>
            <ol>
              {legal.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={activeId === section.id ? 'true' : undefined}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="legal-page__body">
            {legal.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                data-reveal
              >
                <h2 id={`${section.id}-title`}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>
                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </section>
            ))}

            <div data-reveal className="legal-page__contact">
              <Mail aria-hidden="true" className="size-6 shrink-0 text-brand-cyan" />
              <div>
                <p className="font-heading text-base font-semibold text-brand-white">
                  ¿Tienes dudas?
                </p>
                <p className="mt-1 text-sm leading-6 text-brand-gray">
                  Escríbenos a <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
                </p>
              </div>
              <Link to={related.path} className="legal-page__related">
                {related.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </article>
        </div>
      </Container>
    </ScrollReveal>
  )
}
