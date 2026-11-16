import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getRecomendados, venderProducto } from '@/services/api'

export default function ProductModal({ producto, onCerrar, onSeleccionar, onStockCambiado }) {
  const [recomendados, setRecomendados] = useState([])
  const [mensaje, setMensaje] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const agotado = producto.stock === 0
  const enOferta = producto.descuento > 0

  useEffect(() => {
    setMensaje(null)
    getRecomendados(producto.id)
      .then(setRecomendados)
      .catch(() => setRecomendados([]))
  }, [producto.id])

  useEffect(() => {
    const alPresionar = (e) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [onCerrar])

  const reservar = async () => {
    setEnviando(true)
    try {
      const actualizado = await venderProducto(producto.id, 1)
      onStockCambiado(actualizado)
      setMensaje({ tipo: 'ok', texto: '¡Reserva registrada! El stock se actualizó.' })
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.message })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={onCerrar}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={producto.imagen} alt={producto.nombre} className="h-56 w-full object-cover sm:h-72" />
          <button
            onClick={onCerrar}
            aria-label="Cerrar"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow"
          >
            ✕
          </button>
          {enOferta && (
            <span className="absolute left-3 top-3 rounded-full bg-yellow-300 px-3 py-1 text-sm font-bold text-stone-900 shadow">
              -{producto.descuento}%
            </span>
          )}
        </div>

        <div className="space-y-3 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-amber-700">
            {producto.categoria.nombre}
          </p>
          <h2 className="text-xl font-bold text-stone-800">{producto.nombre}</h2>
          <p className="text-sm text-stone-600">{producto.descripcion}</p>

          <p className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-700">
              S/ {Number(producto.precio_final).toFixed(2)}
            </span>
            {enOferta && (
              <span className="text-sm text-stone-400 line-through">
                S/ {Number(producto.precio).toFixed(2)}
              </span>
            )}
          </p>

          <p className={`text-sm ${agotado ? 'text-red-600' : 'text-green-700'}`}>
            {agotado ? 'Producto agotado' : `Disponibles: ${producto.stock}`}
          </p>

          <Button className="btn-neon w-full" disabled={agotado || enviando} onClick={reservar}>
            {enviando ? 'Procesando...' : agotado ? 'No disponible' : 'Reservar 1 unidad'}
          </Button>

          {mensaje && (
            <p
              className={`rounded-md p-3 text-sm ${
                mensaje.tipo === 'ok' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
              }`}
            >
              {mensaje.texto}
            </p>
          )}
        </div>

        {recomendados.length > 0 && (
          <div className="border-t border-yellow-200 bg-yellow-50 p-5">
            <h3 className="mb-3 text-sm font-semibold text-stone-800">También te puede gustar</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {recomendados.map((rec) => (
                <button
                  key={rec.id}
                  onClick={() => onSeleccionar(rec)}
                  className="overflow-hidden rounded-lg border border-yellow-200 bg-white text-left transition-shadow hover:shadow-md"
                >
                  <img src={rec.imagen} alt={rec.nombre} className="h-24 w-full object-cover" />
                  <div className="p-2">
                    <p className="truncate text-xs font-medium text-stone-800">{rec.nombre}</p>
                    <p className="text-sm font-bold text-amber-700">
                      S/ {Number(rec.precio_final).toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}