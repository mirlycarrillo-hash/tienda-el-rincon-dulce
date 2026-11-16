import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProductCard({
  nombre, descripcion, precio, precioFinal, descuento, destacado,
  imagen, categoria, stock, onVerDetalles,
}) {
  const agotado = stock === 0
  const ultimas = stock > 0 && stock <= 5
  const enOferta = descuento > 0

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative">
        <img
          src={imagen}
          alt={nombre}
          className={`h-48 w-full object-cover ${agotado ? 'opacity-60 grayscale' : ''}`}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x300/fef9c3/a16207?text=El+Rincon+Dulce'
          }}
        />
        {agotado && (
          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            Agotado
          </span>
        )}
        {!agotado && destacado && (
          <span className="absolute left-2 top-2 rounded-full bg-stone-800 px-3 py-1 text-xs font-semibold text-yellow-300">
            ⭐ Destacado
          </span>
        )}
        {enOferta && (
          <span className="absolute right-2 top-2 rounded-full bg-yellow-300 px-3 py-1 text-xs font-bold text-stone-900 shadow">
            -{descuento}%
          </span>
        )}
      </div>

      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">{categoria}</Badge>
          {ultimas && <span className="text-xs font-medium text-orange-600">¡Últimas {stock} unidades!</span>}
          {!agotado && !ultimas && <span className="text-xs text-green-700">Quedan {stock}</span>}
        </div>
        <CardTitle className="text-base">{nombre}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-stone-600">{descripcion}</p>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold text-amber-700">S/ {precioFinal.toFixed(2)}</span>
          {enOferta && (
            <span className="text-sm text-stone-400 line-through">S/ {precio.toFixed(2)}</span>
          )}
        </p>
      </CardContent>

      <CardFooter>
        <Button className="btn-neon w-full" onClick={onVerDetalles}>
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  )
}