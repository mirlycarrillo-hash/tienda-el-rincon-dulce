from django.urls import path
from .views import (
    CategoriaListView, ProductoListView, ProductoDetailView,
    ProductoRecomendadosView, VenderProductoView, InventarioResumenView,
)

urlpatterns = [
    path('categorias/', CategoriaListView.as_view(), name='categoria-list'),
    path('productos/', ProductoListView.as_view(), name='producto-list'),
    path('productos/<int:pk>/', ProductoDetailView.as_view(), name='producto-detail'),
    path('productos/<int:pk>/recomendados/', ProductoRecomendadosView.as_view(), name='producto-recomendados'),
    path('productos/<int:pk>/vender/', VenderProductoView.as_view(), name='producto-vender'),
    path('inventario/', InventarioResumenView.as_view(), name='inventario-resumen'),
]