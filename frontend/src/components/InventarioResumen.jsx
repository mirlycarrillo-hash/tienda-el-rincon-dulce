import { useEffect, useState } from 'react'
import { getInventario } from '@/services/api'

export default function InventarioResumen({ recarga }) {
  const [datos, setDatos] = useState(null)

  useEffect(() => {
    getInventario().then(setDatos).catch(() => setDatos(null))
  }, [recarga])

  if (!datos) return null

  const items = [
    { etiqueta: 'Productos', valor: datos.total_productos },
    { etiqueta: 'Unidades en stock', valor: datos.unidades_totales },
    { etiqueta: 'Últimas unidades', valor: datos.ultimas_unidades },
    { etiqueta: 'Agotados', valor: datos.agotados },
    { etiqueta: 'Valor del inventario', valor: `S/ ${datos.valor_inventario.toFixed(2)}` },
  ]

  return (
    <section className="rounded-xl border border-yellow-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-stone-800">Resumen de inventario</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => (
          <div key={item.etiqueta} className="rounded-lg bg-yellow-100 p-3 text-center">
            <p className="text-lg font-bold text-amber-700">{item.valor}</p>
            <p className="text-xs text-stone-600">{item.etiqueta}</p>
          </div>
        ))}
      </div>
    </section>
  )
}