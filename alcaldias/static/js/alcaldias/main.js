$(document).ready(inicio);

var miPosicion = new Posicion();
var miMapa = new Mapa(); //Objeto para controlar el mapa
var toggle = true;

function inicio()
{

	//Iniciando el Mapa
	miMapa.layer_id = 'map';
	miMapa.iniciarMapa();
	fillMapa();


	//Iniciando los Eventos
	$('#id_departamento').on('change',fillMunicipios);
	$('#localizar_btn').click(localizar)
	$('#cancelar_btn').click(reset_all);
	$('#guardar_btn').click(reset_all);
	$('#mapa_btn').click(toggleMapa);

	//Conectado Al WebSocket
	initsock(function(socket) {
    	//TODO;
    	$('#guardar_btn').on('click',function(){

    		var municipio = $('#id_municipio option:selected').val();
    		var incerteza = $('#id_incerteza').val();

    		socket.send_json(
    			{municipio: municipio, 
    			latitud : miPosicion.latitud,
    			longitud:miPosicion.longitud,
    			incerteza:incerteza}
    		);
    	});

  	});
}


function localizar()
{
	//validando que el navegador tenga geolocalización
	if(navigator.geolocation)
	{
		// El navegador soporta geolocalización y ahora se ubicará el punto donde se encuentra el usuario
		navigator.geolocation.getCurrentPosition(encontrado,errorLocalizar)
                $('#Espera').addClass('exito');
                $('#Espera').show('slow');
                /*$('#opciones_completar').addClass('exito');
                $('#opciones_completar').show("slow");
                $('#id_municipio').attr('disabled','disabled');
                $('#id_departamento').attr('disabled','disabled');
                $('#localizar_btn').attr('disabled','disabled');*/


	}else{
		// El navegador no soporta geolozalización
		$('#map').hide('fast');
		$('#form-container').html('<h3> Tu navegador no soporta las funcionalidades de esta aplicación, cambialo por un navegador más actualizado como Opera Mobile, Google Chrome o Mozilla Firefox</h3>');

	}
}

function encontrado(posicion)
{
	miPosicion.latitud = posicion.coords.latitude;
	miPosicion.longitud = posicion.coords.longitude;
	id_municipio = $('#id_municipio option:selected').val();
	//Se procede a verificar que la alcaldia estaba registrada previamente
	$('#Espera').hide('fast');
         $('#opciones_completar').addClass('exito');
                $('#opciones_completar').show("slow");
                $('#id_municipio').attr('disabled','disabled');
                $('#id_departamento').attr('disabled','disabled');
                $('#localizar_btn').attr('disabled','disabled');

	estaRegistrada(id_municipio)
}

function errorLocalizar(e)
{
	var error = 'Ha Ocurrido un error : ' + e;
	//COLOCANDO COORDENADAS 0 
	miPosicion.latitud = 0;
	miPosicion.longitud = 0;
	//TODO
	console.log(error);
}

function reset_all()
{
	$('#localizar_btn').removeAttr('disabled');
	//$('#id_municipio').html('<option>---------</option>');
	$('#opciones_completar').hide("slow");

	$('#id_municipio').removeAttr('disabled');
	$('#id_departamento').removeAttr('disabled');
}

function toggleMapa()
{
	$('#map').fadeToggle('fast');
	$('#form-container').fadeToggle('fast');
	if(toggle)
	{
		$('#mapa_btn p').html('Ocultar')
		toggle = false;
	}else{
		$('#mapa_btn p').html('Mapa')
		toggle = true;
	}
}