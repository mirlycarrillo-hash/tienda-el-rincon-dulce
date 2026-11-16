import Logo from '@/components/Logo'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-yellow-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between">
        <a href="#catalogo" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 p-1">
            <Logo className="h-full w-full" />
          </span>
          <span className="font-brand text-2xl text-stone-800 underline decoration-yellow-400 decoration-4 underline-offset-4 sm:text-3xl">
            El Rincón Dulce
          </span>
        </a>

        <nav className="flex gap-6 text-sm font-medium text-stone-700">
          <a href="#catalogo" className="transition-colors hover:text-amber-600">Catálogo</a>
          <a href="#categorias" className="transition-colors hover:text-amber-600">Categorías</a>
          <a href="#contacto" className="transition-colors hover:text-amber-600">Contacto</a>
        </nav>
      </div>
    </header>
  )
}