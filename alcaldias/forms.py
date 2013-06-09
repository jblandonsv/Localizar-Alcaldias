from django import forms
from alcaldias.models import Departamento

class LoginForm(forms.Form):
	username = forms.CharField(label=u'Usuario:')
	password = forms.CharField(widget=forms.PasswordInput(render_value=False))

class PosicionamientoForm(forms.Form):
	choices = (('0','---------'),)

	#	choices.append(c)
	#departamento = forms.CharField(queryset = Departamento.objects.all())
	departamento = forms.ModelChoiceField(queryset=Departamento.objects.all())
	municipio = forms.ChoiceField(choices = choices)

	#departamento = forms.CharField(required=False)
	#municipio = forms.CharField(required=False)
	incerteza = forms.IntegerField(required=False)