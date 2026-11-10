from rest_framework import generics
from .models import Categoria, Producto
from .serializers import CategoriaSerializer, ProductoSerializer


class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class ProductoListView(generics.ListAPIView):
    serializer_class = ProductoSerializer

    def get_queryset(self):
        queryset = Producto.objects.select_related('categoria')
        categoria = self.request.query_params.get('categoria')
        if categoria:
            queryset = queryset.filter(categoria__nombre__iexact=categoria)
        return queryset


class ProductoDetailView(generics.RetrieveAPIView):
    queryset = Producto.objects.select_related('categoria')
    serializer_class = ProductoSerializer