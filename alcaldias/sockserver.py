import json
from sockjs.tornado import SockJSConnection
from alcaldias.models import Alcaldia, Departamento,Municipio


class AlcaldiasConnection(SockJSConnection):
    _connected = set()

    def on_open(self, request):
        print "OPEN"
        #print request.get_cookie('name')
        #print request.user.username
        self._connected.add(self)
        alcaldias = Alcaldia.objects.all()
        #for alcaldia in alcaldias:
        #    self.send(self._package_message(alcaldia)) #REVISAR PARA QUE QUEDE BIEN EL FORMATO
        #for each in Message.objects.all().order_by('date')[:10]:
        #    self.send(self._package_message(each))

    def on_message(self, data):
        data = json.loads(data)
        print "DATA", repr(data)
        
        alcaldia2 = Alcaldia.objects.filter(municipio=data['municipio'])

        if(len(alcaldia2)>0):
            ## Esto es un Update
            alcaldia2[0].latitud = data['latitud']
            alcaldia2[0].longitud = data['longitud']
            alcaldia2[0].incerteza = data['incerteza']
            alcaldia2[0].save()
            self.broadcast(self._connected, self._package_message(alcaldia2[0],'update'))
        else:
            ## Esta es un nuevo registro
            alcaldia = Alcaldia()
            alcaldia.latitud = data['latitud']
            alcaldia.longitud = data['longitud']
            alcaldia.municipio = Municipio(id=data['municipio'])
            alcaldia.incerteza = data['incerteza']
            alcaldia.save()
            self.broadcast(self._connected, self._package_message(alcaldia,'insert'))

    def on_close(self):
        print "CLOSE"
        self._connected.remove(self)

    def _package_message(self, m,accion):
        municipio = Municipio.objects.filter(id = m.municipio.id)
        return {'latitud': m.latitud,
                'longitud': m.longitud,
                'municipio':municipio[0].municipio,
                'id_municipio':municipio[0].id,
                'accion':accion}
