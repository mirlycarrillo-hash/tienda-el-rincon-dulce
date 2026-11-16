const API_URL = 'http://127.0.0.1:8000/api'

async function obtener(ruta) {
  const respuesta = await fetch(`${API_URL}${ruta}`)
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al consultar el servidor`)
  }
  return respuesta.json()
}

export function getProductos({ categoria, busqueda, orden, oferta } = {}) {
  const params = new URLSearchParams()
  if (categoria && categoria !== 'Todos') params.set('categoria', categoria)
  if (busqueda) params.set('search', busqueda)
  if (orden) params.set('orden', orden)
  if (oferta) params.set('oferta', '1')
  const consulta = params.toString()
  return obtener(`/productos/${consulta ? `?${consulta}` : ''}`)
}

export function getCategorias() {
  return obtener('/categorias/')
}

export function getRecomendados(id) {
  return obtener(`/productos/${id}/recomendados/`)
}

export function getInventario() {
  return obtener('/inventario/')
}

export async function venderProducto(id, cantidad = 1) {
  const respuesta = await fetch(`${API_URL}/productos/${id}/vender/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cantidad }),
  })
  const datos = await respuesta.json()
  if (!respuesta.ok) {
    throw new Error(datos.detalle || 'No se pudo registrar la reserva')
  }
  return datos
}