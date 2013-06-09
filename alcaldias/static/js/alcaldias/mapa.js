function Mapa()
{
	this.layer_id = '';
	this.map;
	this.latitud_inicial = 13.736717;
	this.longitud_inicial = -88.748545;
	this.escala_inicial = 9;
	this.marcadores = [];

	//this.iniciar = iniciarMapa();
 }

 Mapa.prototype.iniciarMapa  = function ()
	{
		console.log('Layer = ' + this.layer_id);
		this.map = L.map(this.layer_id).setView([this.latitud_inicial, this.longitud_inicial], this.escala_inicial);
		L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(this.map)
		L.layerGroup(this.marcadores).addTo(this.map);
	}

 Mapa.prototype.agregarMarcador  = function(data)
	{
		var latitud = data.latitud;
		var longitud = data.longitud;
		var texto = data.municipio;
		var marker = L.marker([latitud,longitud]);

		marker.id_municipio = data.id_municipio;

		marker.bindPopup('<strong>' + texto + '</strong>' );

		this.marcadores[this.marcadores.length] = marker;
		marker.addTo(this.map);
	}

Mapa.prototype.quitarMarcador = function(idMarcador)
	{
		console.log('quitando marcador: ' + idMarcador)
		for(var i = 0;i<this.marcadores.length;i++)
		{
			console.log('comparando con = ' + this.marcadores[i].id_municipio);
			
			if(this.marcadores[i].id_municipio == idMarcador)
			{
				console.log('se encontro el marcador lokillo');
				this.map.removeLayer(this.marcadores[i]);
			}
		}
	}