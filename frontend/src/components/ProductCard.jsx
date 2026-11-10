import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProductCard({ nombre, descripcion, precio, imagen, categoria, stock }) {
  const agotado = stock === 0

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative">
        <img
          src={imagen}
          alt={nombre}
          className={`h-48 w-full object-cover ${agotado ? 'opacity-60 grayscale' : ''}`}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x300/fce7f3/db2777?text=El+Rincon+Dulce'
          }}
        />
        {agotado && (
          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            Agotado
          </span>
        )}
      </div>

      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">{categoria}</Badge>
          {!agotado && <span className="text-xs text-green-700">Quedan {stock}</span>}
        </div>
        <CardTitle className="text-base">{nombre}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-stone-600">{descripcion}</p>
        <p className="mt-2 text-xl font-bold text-pink-600">S/ {precio.toFixed(2)}</p>
      </CardContent>

      <CardFooter>
        <Button className="w-full bg-pink-600 hover:bg-pink-700" disabled={agotado}>
          {agotado ? 'No disponible' : 'Ver detalles'}
        </Button>
      </CardFooter>
    </Card>
  )
}