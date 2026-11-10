import { Button } from '@/components/ui/button'

export default function CategoryFilter({ categorias, categoriaActiva, onSeleccionar }) {
  return (
    <div id="categorias" className="flex flex-wrap justify-center gap-2">
      {categorias.map((categoria) => {
        const activa = categoria === categoriaActiva
        return (
          <Button
            key={categoria}
            variant={activa ? 'default' : 'outline'}
            className={activa ? 'bg-pink-600 text-white hover:bg-pink-700' : 'border-pink-200 text-stone-700 hover:bg-pink-50'}
            onClick={() => onSeleccionar(categoria)}
          >
            {categoria}
          </Button>
        )
      })}
    </div>
  )
}