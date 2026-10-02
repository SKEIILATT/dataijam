import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

const REGISTRATION_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfSW-sIAGlG3L-RHPybx89g0rdN2c5-F9AqADtLJFIv78vuuA/viewform?usp=dialog'

export function Registration() {
  return (
    <section
      id="registro"
      aria-labelledby="registration-heading"
      className="ds-section registration-editorial"
    >
      <Container>
        <div data-stagger className="registration-ticket">
          <div aria-hidden="true" className="registration-ticket__orbit" />
          <div data-reveal>
            <p className="registration-ticket__eyebrow">El próximo paso es tuyo</p>
            <h2 id="registration-heading" className="mt-3 text-h2 font-semibold text-brand-white">
              Las ideas nos unen.
              <br />
              <span>Tú las haces posibles.</span>
            </h2>
            <p className="mt-6 max-w-lg text-body">
              Un encuentro puede ser el inicio de algo grande. Reserva tu lugar y conecta con la
              comunidad DatAIJam.
            </p>
            <div className="registration-ticket__meta">
              <span>
                <CalendarDays aria-hidden="true" className="size-4" />
                16 OCT 2026
              </span>
              <span>
                <MapPin aria-hidden="true" className="size-4" />
                Guayaquil, Ecuador
              </span>
            </div>
          </div>

          <div data-reveal className="registration-ticket__action">
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
              <ArrowUpRight aria-hidden="true" className="size-5" />
            </Button>

            <p id="registration-note" className="mt-4 max-w-56 text-xs leading-5">
              Formulario en Google Forms · Se abre en otra pestaña.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Registration
