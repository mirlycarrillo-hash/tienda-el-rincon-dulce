import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import CategoryFilter from '@/components/CategoryFilter'
import ProductList from '@/components/ProductList'
import { getCategorias, getProductos } from '@/services/api'

function App() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCategorias()
      .then((datos) => setCategorias(['Todos', ...datos.map((c) => c.nombre)]))
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    setCargando(true)
    setError(null)
    getProductos(categoriaActiva)
      .then((datos) => setProductos(datos))
      .catch(() => setError('No se pudo cargar el catálogo. Verifica que el servidor esté activo.'))
      .finally(() => setCargando(false))
  }, [categoriaActiva])

  return (
    <div className="min-h-screen bg-amber-50/40">
      <Header />

      <section className="bg-gradient-to-r from-pink-100 via-amber-50 to-pink-100 py-10 text-center">
        <h2 className="font-brand text-3xl text-pink-600 sm:text-4xl">
          Dulces momentos, hechos a mano
        </h2>
        <p className="mx-auto mt-2 max-w-xl px-4 text-sm text-stone-600">
          Tortas, mini donuts, galletas y combos elaborados con ingredientes frescos para tus
          celebraciones.
        </p>
      </section>

      <main id="catalogo" className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <CategoryFilter
          categorias={categorias}
          categoriaActiva={categoriaActiva}
          onSeleccionar={setCategoriaActiva}
        />

        {cargando && <p className="py-10 text-center text-stone-500">Cargando productos...</p>}

        {error && (
          <p className="rounded-md bg-red-100 p-4 text-center text-sm text-red-700">{error}</p>
        )}

        {!cargando && !error && <ProductList productos={productos} />}
      </main>

      <footer id="contacto" className="border-t border-pink-100 bg-white py-6 text-center text-sm text-stone-500">
        © 2026 El Rincón Dulce · Pedidos al WhatsApp 913 412 507
      </footer>
    </div>
  )
}

export default App