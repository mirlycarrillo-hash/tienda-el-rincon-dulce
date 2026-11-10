import ProductCard from './ProductCard'

export default function ProductList({ productos }) {
  if (productos.length === 0) {
    return <p className="py-10 text-center text-gray-500">No hay productos en esta categoría.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          nombre={producto.nombre}
          descripcion={producto.descripcion}
          precio={Number(producto.precio)}
          imagen={producto.imagen}
          categoria={producto.categoria.nombre}
          stock={producto.stock}
        />
      ))}
    </div>
  )
}