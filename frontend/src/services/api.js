const API_URL = 'http://127.0.0.1:8000/api'

async function obtener(ruta) {
  const respuesta = await fetch(`${API_URL}${ruta}`)
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al consultar el servidor`)
  }
  return respuesta.json()
}

export function getProductos(categoria) {
  if (categoria && categoria !== 'Todos') {
    return obtener(`/productos/?categoria=${encodeURIComponent(categoria)}`)
  }
  return obtener('/productos/')
}

export function getCategorias() {
  return obtener('/categorias/')
}