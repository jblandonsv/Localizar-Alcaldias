
/*
var Chat = (function() {
  var _socket;

  function init(socket) {
    _socket = socket;

    $('form').submit(function() {
      var name = $.trim($('input[name="name"]').val());
      var message = $.trim($('input[name="message"]').val());
      if (!name.length) {
        alert("No name :(");
      } else if (!message.length) {
        $('input[name="message"]').focus();
      } else {
        _socket.send_json({name: name, message: message});
        $('input[name="message"]').val('');
        $('input[name="message"]').focus();
      }
      return false;
    });

  }

  return {
     init: init
  };

})();
*/
SockJS.prototype.send_json = function(data) {
  this.send(JSON.stringify(data));
};

var initsock = function(callback) 
{
	console.log('inicinado socket :D ' + SOCK.host);
	sock = new SockJS('http://'+SOCK.host+":"+SOCK.port + "/" +SOCK.channel);

	console.log('Se creo el objeto SockJS conexión')

	sock.onmessage = function(e){
		console.log('Se recibieron mensajes del socket: ');
    console.log(e.data);
    
    //Dependiendo de la acción realizada, se actuliza el mapa
    if(e.data.accion == 'insert'){
        miMapa.agregarMarcador(e.data);
    }

    if(e.data.accion == 'update')
    {
      miMapa.quitarMarcador(e.data.id_municipio)
      miMapa.agregarMarcador(e.data);
    }
    
		console.log(' Mensaje = ' + e.data)
	}

	sock.onclose = function(){
		console.log('Socket Cerrado');
		window.location = '/alcaldias/errorsocket';
	}

	sock.onopen = function(){
		console.log('Socket Intentando ver si el socket se abrió');
		if (sock.readyState !== SockJS.OPEN) {
      		throw "Connection NOT open";
    	}
    	console.log('creo que el socket está abierto ');
    	callback(sock);
	}
}


function Posicion()
{

	var _socket;

	latitud = 0;
	longitud = 0;
	precision = 0;
	idMunicipio = -1;
	idDepartamento = -1;
	incerteza = 0;

	function cargandoSocket(socket)
	{
		_socket = socket;
		enviarDatos(); //Listener que quedará escuchando confirmación para envío de datos
	}

	function enviarDatos()
	{
		//TODO
	}
}

function fillMunicipios()
{
	var idDepto = $('#id_departamento option:selected').val();
	$('#id_municipio').html('<option>Cargando...</option>');
	$('#localizar_btn').removeAttr("disabled");

	$.getJSON('/alcaldias/getMunicipios/'+idDepto,function(datos){
		
		var opciones = '';
		municipios = datos.municipios
		console.log(municipios);

		for(var i = 0;i<municipios.length;i++)
		{
			opciones += '<option value="'+municipios[i].id+'">' + municipios[i].municipio + '</option>';
		}

		$('#id_municipio').html(opciones)

	},function(){
		//Error
		console.log('OCURRIO UN PROBLEMA');
	});
}

function fillMapa()
{
   $.getJSON('/alcaldias/getAlcaldias',function(datos){
      data = datos.data;
      for(var i = 0;i<data.length;i++)
      {
        miMapa.agregarMarcador(data[i]);
      }
   });
}

function estaRegistrada(id_municipio)
{

	$.getJSON('/alcaldias/isRegistrada/'+id_municipio+"/",function(data){
		console.log('VERIFICANDO ALCALDIA:')
		console.log(data);
		if(data.registrado) 
		{
			$('#advertencia_registrada').html('Advertencia: La alcaldía ya ha sido localizada previamente, Si guardas los cambios, reemplazarás la ubicación anterior de esa alcaldia');
		}else{
			$('#advertencia_registrada').html('');
		}
	});

}