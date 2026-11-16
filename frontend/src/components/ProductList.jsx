import ProductCard from './ProductCard'

export default function ProductList({ productos, onVerDetalles }) {
  if (productos.length === 0) {
    return (
      <p className="py-10 text-center text-stone-500">
        No se encontraron productos con esos criterios.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          nombre={producto.nombre}
          descripcion={producto.descripcion}
          precio={Number(producto.precio)}
          precioFinal={Number(producto.precio_final)}
          descuento={producto.descuento}
          destacado={producto.destacado}
          imagen={producto.imagen}
          categoria={producto.categoria.nombre}
          stock={producto.stock}
          onVerDetalles={() => onVerDetalles(producto)}
        />
      ))}
    </div>
  )
}