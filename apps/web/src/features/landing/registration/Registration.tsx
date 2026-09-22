import { Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function Registration() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const phone = String(data.get('phone') ?? '').trim()
    const interest = String(data.get('interest') ?? '')

    const subject = `Registro DatAIJam - ${name}`
    const body = [
      `Nombre: ${name}`,
      `Correo: ${email}`,
      phone ? `Teléfono: ${phone}` : null,
      `Interés: ${interest}`,
    ]
      .filter(Boolean)
      .join('\n')

    // No hay backend/API de registro todavía: en vez de fingir un "guardado"
    // que no ocurre, se arma un correo real con los datos hacia el equipo.
    window.location.href = `mailto:hola@dataijam.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setStatus('sent')
    form.reset()
  }

  return (
    <section
      id="registro"
      aria-labelledby="registration-heading"
      className="ds-section ds-section--accented"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div data-reveal className="max-w-xl">
            <p className="text-sm font-medium tracking-[0.18em] text-brand-cyan uppercase">
              Registro
            </p>
            <h2 id="registration-heading" className="mt-3 text-h2 font-semibold text-brand-white">
              Reserva tu lugar en DatAIJam
            </h2>
            <p className="mt-4 text-body text-brand-gray">
              La inscripción definitiva abre pronto. Déjanos tus datos ahora y te avisamos apenas
              esté disponible, o mándanos directamente el formulario para adelantarte al anuncio.
            </p>
          </div>

          <form
            data-reveal="side"
            onSubmit={handleSubmit}
            className="ds-card flex flex-col gap-5 p-6 sm:p-8"
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-name" className="text-sm font-medium text-brand-white">
                Nombre completo
              </label>
              <input
                id="reg-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Tu nombre"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-email" className="text-sm font-medium text-brand-white">
                Correo electrónico
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-phone" className="text-sm font-medium text-brand-white">
                Teléfono <span className="font-normal text-brand-gray">(opcional)</span>
              </label>
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+593 ..."
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-interest" className="text-sm font-medium text-brand-white">
                Me interesa
              </label>
              <select id="reg-interest" name="interest" required defaultValue="">
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="Conferencias">Conferencias</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Conferencias y Hackathon">Ambos</option>
              </select>
            </div>

            <Button type="submit" variant="primary" className="mt-2">
              Quiero registrarme
              <Mail aria-hidden="true" className="size-4" />
            </Button>

            <p role="status" aria-live="polite" className="text-xs text-brand-gray">
              {status === 'sent'
                ? 'Se abrió tu cliente de correo con tus datos listos -- confirma el envío ahí para completar tu registro.'
                : 'Al enviar, se abre tu cliente de correo con estos datos ya redactados hacia hola@dataijam.com.'}
            </p>
          </form>
        </div>
      </Container>
    </section>
  )
}

export default Registration
