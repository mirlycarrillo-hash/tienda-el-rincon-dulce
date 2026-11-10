from django.urls import path
from .views import CategoriaListView, ProductoListView, ProductoDetailView

urlpatterns = [
    path('categorias/', CategoriaListView.as_view(), name='categoria-list'),
    path('productos/', ProductoListView.as_view(), name='producto-list'),
    path('productos/<int:pk>/', ProductoDetailView.as_view(), name='producto-detail'),
]