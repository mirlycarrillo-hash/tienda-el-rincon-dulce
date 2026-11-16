export default function SearchBar({ busqueda, onBusqueda, orden, onOrden, soloOfertas, onOfertas }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="search"
        value={busqueda}
        onChange={(e) => onBusqueda(e.target.value)}
        placeholder="Buscar tortas, donuts, galletas..."
        className="w-full flex-1 rounded-lg border border-yellow-300 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-300"
      />

      <select
        value={orden}
        onChange={(e) => onOrden(e.target.value)}
        className="rounded-lg border border-yellow-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-300"
      >
        <option value="">Ordenar por</option>
        <option value="precio_asc">Precio: menor a mayor</option>
        <option value="precio_desc">Precio: mayor a menor</option>
        <option value="nombre">Nombre (A-Z)</option>
      </select>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
        <input
          type="checkbox"
          checked={soloOfertas}
          onChange={(e) => onOfertas(e.target.checked)}
          className="h-4 w-4 accent-yellow-500"
        />
        Solo ofertas
      </label>
    </div>
  )
}