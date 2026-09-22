import { MoveUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

const REGISTRATION_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfSW-sIAGlG3L-RHPybx89g0rdN2c5-F9AqADtLJFIv78vuuA/viewform?usp=dialog'

export function Registration() {
  return (
    <section
      id="registro"
      aria-labelledby="registration-heading"
      className="ds-section ds-section--accented"
    >
      <Container>
        <div data-stagger className="mx-auto max-w-2xl text-center">
          <div data-reveal>
            <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">
              Registro
            </p>
            <h2 id="registration-heading" className="mt-3 text-h2 font-semibold text-brand-white">
              Reserva tu lugar en DatAIJam
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-body text-brand-gray">
              Sé parte de DatAIJam. Completa tu inscripción en un par de minutos.
            </p>
          </div>

          <div data-reveal className="mt-8 flex flex-col items-center gap-4">
            <Button
              as="a"
              href={REGISTRATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              aria-describedby="registration-note"
              className="w-full sm:w-auto sm:min-w-56"
            >
              Quiero participar
              <MoveUpRight aria-hidden="true" className="size-4" />
            </Button>

            <p id="registration-note" className="text-xs leading-5 text-brand-gray">
              Formulario en Google Forms · Se abre en otra pestaña.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Registration
