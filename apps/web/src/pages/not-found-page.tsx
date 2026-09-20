import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="grid min-h-screen place-items-center bg-brand-navy px-6 py-16 text-center">
      <div className="max-w-md">
        <p className="text-sm font-medium tracking-widest text-brand-cyan">Error 404</p>
        <h1 className="mt-3 text-h2 font-semibold text-brand-white">Página no encontrada</h1>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-brand-cyan px-6 py-3 text-sm font-medium text-brand-navy transition-colors hover:bg-brand-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
        >
          Volver al Inicio
        </Link>
      </div>
    </section>
  )
}
