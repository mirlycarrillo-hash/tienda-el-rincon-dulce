# El Rincón Dulce - Tienda virtual de pastelería

Estructura inicial de una aplicación de comercio electrónico con ReactJS y Django REST Framework.

## Tecnologías
- Frontend: ReactJS (Vite), Tailwind CSS v4, shadcn/ui
- Backend: Django 3.2, Django REST Framework 3.14, SQLite

## Ejecución del backend
```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
API: http://127.0.0.1:8000/api/productos/ y /api/categorias/

## Ejecución del frontend
```
cd frontend
npm install
npm run dev
```
Aplicación: http://localhost:5173

## Estructura
- `frontend/src/components`: Header, ProductCard, ProductList, CategoryFilter
- `frontend/src/pages`: páginas
- `frontend/src/services`: llamadas a la API
- `backend/catalogo`: modelos, serializadores, vistas y rutas

## Laboratorio 14: mejoras
- Búsqueda, orden por precio o nombre y filtro de ofertas
- Descuentos y productos destacados
- Gestión de inventario (admin editable, resumen y reserva que descuenta stock)
- Recomendaciones de productos en el detalle
- Diseño responsivo para móviles

## Autor
Mirly Carrillo López