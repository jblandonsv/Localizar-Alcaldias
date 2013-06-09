from django.contrib import admin
from alcaldias.models import Departamento, Municipio, Alcaldia

class MunicipioTabular(admin.TabularInline):
	model = Municipio

class AlcaldiaTabular(admin.TabularInline):
	model = Alcaldia

class DepartamentoAdmin(admin.ModelAdmin):
	list_display  = ['codigo_depto','departamento']
	search_fields = ['departamento','codigo_depto']
	inlines = [MunicipioTabular]

class MunicipioAdmin(admin.ModelAdmin):
	list_display = ['codigo_municipio','municipio','departamento']
	list_filter = ['departamento']
	search_fields = ['municipio']

	inlines = [AlcaldiaTabular]

class AlcaldiaAdmin(admin.ModelAdmin):
	list_display = ['id','municipio','latitud','longitud','incerteza']
	search_fields = ['municipio']

admin.site.register(Departamento, DepartamentoAdmin)
admin.site.register(Municipio, MunicipioAdmin)
admin.site.register(Alcaldia, AlcaldiaAdmin)