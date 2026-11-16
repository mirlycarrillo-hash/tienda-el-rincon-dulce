import { Button } from '@/components/ui/button'

export default function CategoryFilter({ categorias, categoriaActiva, onSeleccionar }) {
  return (
    <div id="categorias" className="flex flex-wrap justify-center gap-2">
      {categorias.map((categoria) => {
        const activa = categoria === categoriaActiva
        return (
          <Button
            key={categoria}
            variant="outline"
            className={
              activa
                ? 'btn-neon'
                : 'border-yellow-300 bg-white text-stone-700 hover:bg-yellow-50'
            }
            onClick={() => onSeleccionar(categoria)}
          >
            {categoria}
          </Button>
        )
      })}
    </div>
  )
}