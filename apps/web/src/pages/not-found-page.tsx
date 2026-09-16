import { Link } from 'react-router'
export function NotFoundPage() {
  return (
    <section className="grid min-h-screen place-items-center px-6 py-16 text-center [&_h1]:mt-3 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-white sm:[&_h1]:text-4xl">
      <div className="max-w-md">
        <p className="text-sm font-semibold tracking-widest text-cyan-400">Error 404</p>
        <h1>Página no encontrada</h1>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          Volver al Inicio
        </Link>
      </div>
    </section>
  )
}
