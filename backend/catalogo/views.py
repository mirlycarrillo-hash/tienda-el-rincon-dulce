from django.db import transaction
from django.db.models import DecimalField, ExpressionWrapper, F, Q, Sum
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Categoria, Producto
from .serializers import CategoriaSerializer, ProductoSerializer

UMBRAL_STOCK_BAJO = 5


class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class ProductoListView(generics.ListAPIView):
    """Lista productos. Parámetros opcionales: categoria, search, oferta, orden."""
    serializer_class = ProductoSerializer

    def get_queryset(self):
        params = self.request.query_params
        queryset = Producto.objects.select_related('categoria')

        categoria = params.get('categoria')
        if categoria:
            queryset = queryset.filter(categoria__nombre__iexact=categoria)

        busqueda = params.get('search')
        if busqueda:
            queryset = queryset.filter(
                Q(nombre__icontains=busqueda) | Q(descripcion__icontains=busqueda)
            )

        if params.get('oferta') == '1':
            queryset = queryset.filter(descuento__gt=0)

        orden = {
            'precio_asc': 'precio',
            'precio_desc': '-precio',
            'nombre': 'nombre',
        }.get(params.get('orden'))
        if orden:
            queryset = queryset.order_by(orden)

        return queryset


class ProductoDetailView(generics.RetrieveAPIView):
    queryset = Producto.objects.select_related('categoria')
    serializer_class = ProductoSerializer


class ProductoRecomendadosView(generics.ListAPIView):
    """Recomienda hasta 3 productos: primero de la misma categoría, luego destacados u ofertas."""
    serializer_class = ProductoSerializer

    def get_queryset(self):
        producto = get_object_or_404(Producto, pk=self.kwargs['pk'])
        base = (Producto.objects.select_related('categoria')
                .exclude(pk=producto.pk).filter(stock__gt=0))

        recomendados = list(
            base.filter(categoria=producto.categoria).order_by('-destacado', '-descuento')[:3]
        )
        if len(recomendados) < 3:
            ya_incluidos = [p.pk for p in recomendados]
            faltan = 3 - len(recomendados)
            recomendados += list(
                base.exclude(pk__in=ya_incluidos).order_by('-destacado', '-descuento')[:faltan]
            )
        return recomendados


class VenderProductoView(APIView):
    """Descuenta stock al reservar un producto (gestión básica de inventario)."""
    authentication_classes = []
    permission_classes = []

    def post(self, request, pk):
        try:
            cantidad = int(request.data.get('cantidad', 1))
        except (TypeError, ValueError):
            return Response({'detalle': 'Cantidad inválida.'}, status=400)

        with transaction.atomic():
            producto = get_object_or_404(Producto.objects.select_for_update(), pk=pk)
            if cantidad < 1 or producto.stock < cantidad:
                return Response({'detalle': 'Stock insuficiente.'}, status=400)
            producto.stock -= cantidad
            producto.save(update_fields=['stock'])

        return Response(ProductoSerializer(producto).data)


class InventarioResumenView(APIView):
    """Resumen del inventario para el panel."""

    def get(self, request):
        productos = Producto.objects.all()
        valor = productos.aggregate(
            v=Sum(ExpressionWrapper(F('precio') * F('stock'),
                                    output_field=DecimalField(max_digits=12, decimal_places=2)))
        )['v'] or 0
        unidades = productos.aggregate(u=Sum('stock'))['u'] or 0

        return Response({
            'total_productos': productos.count(),
            'unidades_totales': unidades,
            'agotados': productos.filter(stock=0).count(),
            'ultimas_unidades': productos.filter(stock__gt=0, stock__lte=UMBRAL_STOCK_BAJO).count(),
            'valor_inventario': float(valor),
        })