import json
from django.conf import settings
from django.shortcuts import render_to_response
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.template import RequestContext
from alcaldias.forms import LoginForm, PosicionamientoForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from alcaldias.models import Municipio, Departamento, Alcaldia
from decimal import Decimal

@login_required(login_url='entrar')
def inicio(request):
	if request.method == 'POST':
		pass
	else:
		form = PosicionamientoForm()
		context = {'form': form,'socket_port': settings.SOCKJS_PORT,'socket_channel': settings.SOCKJS_CHANNEL}
		return render_to_response('alcaldias/principal.html',context,context_instance=RequestContext(request))

def entrar(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect('inicio')
	if request.method == 'POST':
		siguiente = request.GET.get('next')
		print 'valor de next = ' + str(siguiente)
		form = LoginForm(request.POST)
		if form.is_valid():
			username = form.cleaned_data['username']
			password = form.cleaned_data['password']
			usuario = authenticate(username=username,password=password)
			if usuario is not None:
				login(request,usuario)
				context = {'prueba':'mensaje'}
				#return render_to_response('alcaldias/principal.html',context,context_instance=RequestContext(request))
				return HttpResponseRedirect('inicio')
			else:
				form = LoginForm()
				return  render_to_response('alcaldias/login.html',{'form':form,'message':'Usuario o Password Incorrectos'},context_instance=RequestContext(request)) 
		else:
			return render_to_response('alcaldias/login.html',{'form':form},context_instance=RequestContext(request))
	else:
		form = LoginForm()
		context = {'form':form}
		return render_to_response('alcaldias/login.html',context,context_instance=RequestContext(request))


def salir(request):
	logout(request)
	return HttpResponseRedirect('entrar')


def getMunicipios(request,depto):
	if request.is_ajax:
		municipios = Municipio.objects.filter(departamento = depto)
		data = list()
		for municipio in municipios:
			elemento = {'id':municipio.id,'municipio':municipio.municipio}
			data.append(elemento)
		response = HttpResponse(
			json.dumps({'municipios':data}),
				content_type="application/json; charset=utf8"
			)
		return response
	else:
		return Http404

def getAlcaldias(request):
	if request.is_ajax:
		alcaldias = Alcaldia.objects.all()
		data = list()
		for alcaldia in alcaldias:
			elemento = {'latitud':float(alcaldia.latitud),'longitud':float(alcaldia.longitud),
			                'municipio':alcaldia.municipio.municipio,'id_municipio':alcaldia.municipio.id}
			data.append(elemento)
		response = HttpResponse(
				json.dumps({'data':data}),
				content_type="application/json; charset=utf8"
			)
		return response
	else:
		return Http404

def isRegistrada(request, idMunicipio):
	if request.is_ajax:
		a = Alcaldia.objects.filter(municipio = idMunicipio)
		registrado = False
		if(len(a)>0):
			registrado = True
		response = HttpResponse(json.dumps({'registrado':registrado}),
			content_type = "application/json; charset=utf8")
		return response
		
	else:
		return Http404

@login_required(login_url='entrar')
def socket_error(request):
	return render_to_response('alcaldias/errorsocket.html',context_instance=RequestContext(request))

@login_required(login_url='entrar')
def navegadores(request):
	return render_to_response('alcaldias/navegadores.html',context_instance=RequestContext(request))