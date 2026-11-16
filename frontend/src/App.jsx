import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import ProductList from '@/components/ProductList'
import ProductModal from '@/components/ProductModal'
import InventarioResumen from '@/components/InventarioResumen'
import { getCategorias, getProductos } from '@/services/api'

function App() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState('')
  const [soloOfertas, setSoloOfertas] = useState(false)
  const [seleccionado, setSeleccionado] = useState(null)
  const [recarga, setRecarga] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCategorias()
      .then((datos) => setCategorias(['Todos', ...datos.map((c) => c.nombre)]))
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    let activo = true
    setCargando(true)
    setError(null)

    // Pequeña espera para no consultar la API en cada letra que se escribe
    const temporizador = setTimeout(() => {
      getProductos({ categoria: categoriaActiva, busqueda, orden, oferta: soloOfertas })
        .then((datos) => activo && setProductos(datos))
        .catch(() => activo && setError('No se pudo cargar el catálogo. Verifica que el servidor esté activo.'))
        .finally(() => activo && setCargando(false))
    }, 300)

    return () => {
      activo = false
      clearTimeout(temporizador)
    }
  }, [categoriaActiva, busqueda, orden, soloOfertas, recarga])

  const stockCambiado = (actualizado) => {
    setSeleccionado(actualizado)
    setRecarga((r) => r + 1)
  }

  return (
    <div className="min-h-screen bg-yellow-50/60">
      <div className="bg-yellow-300 px-4 py-2 text-center text-xs font-semibold text-stone-900 sm:text-sm">
        🎉 Promoción de temporada: envío gratis en compras desde S/ 100 · Usa el código DULCE10
      </div>

      <Header />

      <section className="bg-gradient-to-r from-yellow-100 via-amber-50 to-yellow-100 py-10 text-center">
        <h2 className="inline-block font-brand text-3xl text-stone-800 underline decoration-yellow-400 decoration-4 underline-offset-8 sm:text-5xl">
          Dulces momentos, hechos a mano
        </h2>
        <p className="mx-auto mt-4 max-w-xl px-4 text-sm text-stone-600">
          Tortas, mini donuts, galletas y combos elaborados con ingredientes frescos para tus celebraciones.
        </p>
      </section>

      <main id="catalogo" className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <SearchBar
          busqueda={busqueda}
          onBusqueda={setBusqueda}
          orden={orden}
          onOrden={setOrden}
          soloOfertas={soloOfertas}
          onOfertas={setSoloOfertas}
        />

        <CategoryFilter
          categorias={categorias}
          categoriaActiva={categoriaActiva}
          onSeleccionar={setCategoriaActiva}
        />

        {cargando && <p className="py-10 text-center text-stone-500">Cargando productos...</p>}

        {error && (
          <p className="rounded-md bg-red-100 p-4 text-center text-sm text-red-700">{error}</p>
        )}

        {!cargando && !error && (
          <ProductList productos={productos} onVerDetalles={setSeleccionado} />
        )}

        <InventarioResumen recarga={recarga} />
      </main>

      <footer id="contacto" className="border-t border-yellow-200 bg-white py-6 text-center text-sm text-stone-500">
        © 2026 El Rincón Dulce · Pedidos al WhatsApp 999 999 999
      </footer>

      {seleccionado && (
        <ProductModal
          producto={seleccionado}
          onCerrar={() => setSeleccionado(null)}
          onSeleccionar={setSeleccionado}
          onStockCambiado={stockCambiado}
        />
      )}
    </div>
  )
}

export default App