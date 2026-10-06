import { ArrowUpRight, CalendarDays, MapPin, Ticket } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { usePrefersReducedMotion } from '@/components/ui/use-prefers-reduced-motion'
import { trackRegistrationFormOpen } from '@/features/analytics/analytics'
import { ConnectionOrbit } from './ConnectionOrbit'

const REGISTRATION_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfSW-sIAGlG3L-RHPybx89g0rdN2c5-F9AqADtLJFIv78vuuA/viewform?usp=dialog'

export function Registration() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  // The ticket rises and tilts into place, the finale's glow growing behind it.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'center 0.6'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [34, 0])
  const y = useTransform(scrollYProgress, [0, 1], [110, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const glowOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1])
  const glowScale = useTransform(scrollYProgress, [0.3, 1], [0.6, 1.1])

  return (
    <section
      ref={sectionRef}
      id="registro"
      aria-labelledby="registration-heading"
      className="ds-section registration-editorial"
    >
      <Container className="relative">
        {!reducedMotion && (
          <motion.div
            aria-hidden="true"
            className="registration-glow"
            style={{ opacity: glowOpacity, scale: glowScale }}
          />
        )}
        <motion.div
          data-stagger
          className="registration-ticket"
          style={reducedMotion ? undefined : { rotateX, y, scale, transformPerspective: 1400 }}
        >
          <BorderBeam />
          <div aria-hidden="true" className="registration-ticket__orbit" />
          <ConnectionOrbit />
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
                Auditorio ESPAE · ESPOL Peñas, Guayaquil
              </span>
              <span>
                <Ticket aria-hidden="true" className="size-4" />
                Conferencias gratuitas · Taller $30
              </span>
            </div>
          </div>

          <div data-reveal className="registration-ticket__action">
            <Button
              as="a"
              href={REGISTRATION_FORM_URL}
              onClick={trackRegistrationFormOpen}
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
        </motion.div>
      </Container>
    </section>
  )
}

export default Registration
