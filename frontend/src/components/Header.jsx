export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-pink-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between">
        <a href="#catalogo" className="flex items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100 text-2xl" role="img" aria-label="Logotipo">
            🧁
          </span>
          <span className="font-[Pacifico] text-2xl text-pink-600">El Rincón Dulce</span>
        </a>

        <nav className="flex gap-6 text-sm font-medium text-stone-700">
          <a href="#catalogo" className="transition-colors hover:text-pink-600">Catálogo</a>
          <a href="#categorias" className="transition-colors hover:text-pink-600">Categorías</a>
          <a href="#contacto" className="transition-colors hover:text-pink-600">Contacto</a>
        </nav>
      </div>
    </header>
  )
}