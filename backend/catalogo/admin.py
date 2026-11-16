from django.contrib import admin
from .models import Categoria, Producto


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'categoria', 'precio', 'descuento', 'stock', 'destacado')
    list_editable = ('precio', 'descuento', 'stock', 'destacado')
    list_filter = ('categoria', 'destacado')
    search_fields = ('nombre',)
    actions = ['reponer_stock', 'quitar_descuento']

    @admin.action(description='Reponer +10 unidades de stock')
    def reponer_stock(self, request, queryset):
        for producto in queryset:
            producto.stock += 10
            producto.save(update_fields=['stock'])

    @admin.action(description='Quitar descuento')
    def quitar_descuento(self, request, queryset):
        queryset.update(descuento=0)