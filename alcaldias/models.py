from django.db import models

# Create your models here.
class Departamento(models.Model):
	codigo_depto = models.CharField(max_length = 2)
	departamento = models.CharField(max_length=60)

	def __unicode__(self):
		return self.departamento

class Municipio(models.Model):
	codigo_municipio = models.CharField(max_length = 10)
	municipio = models.CharField(max_length=60)
	departamento = models.ForeignKey(Departamento)

	def __unicode__(self):
		return self.municipio

class Alcaldia(models.Model):
	latitud = models.DecimalField(max_digits=18,decimal_places=15)
	longitud = models.DecimalField(max_digits=18,decimal_places=15)
	incerteza = models.IntegerField()
	municipio = models.ForeignKey(Municipio, unique=True)