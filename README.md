Localizar-Alcaldias
===================

Esta es una herramienta de práctica sobre geolocalización gratuita, la idea es simular que se captura la localización (latitud, longitud) de las alcaldias de El Salvador.

Requisitos de Instalación:
===========================
* Python 2.7
* Django 1.5
* Sockjs-django-Tornado del repositorio de Peterbe ( muchas gracias !! )
* Mysql.
* Mysql para python https://pypi.python.org/pypi/MySQL-python o la versión de tu sistema operativo.

Instalación:
==========================
* Utilizando el instalador de paquetes pip:

  > pip install -r requirements.txt

* Instalar Python 2.7. Seguir las instrucciones de acuerdo a tu sistema operativo.
* Instalar Django 1.5. Seguir las instrucciones de acerudo a tu sistema operativo.
* Descargar Sockjs-django-Tornado https://github.com/peterbe/django-sockjs-tornado,
   Luego abrir una terminal y desplazarse a los archivos descargados, y ejecutar los siguientes comandos:
   
   > python setup.py build

Y luego:

   > python setub.py install
   
   Si ningún mensaje de error es reportado, entonces se instaló de forma correcta.

* Instalar Mysql y mysql para python
* Crear una base de datos, puedes ponerle el nombre que gustes.
* Dentro de la carpeta rnpn, modificar el archivo settings.py y colocar la siguiente información:

> DATABASES = {
>    'default': {
>        'ENGINE': 'django.db.backends.mysql',
>        'NAME': 'nombre_de_tu_base_de_datos',
>        'USER': 'tu_usuario',
>        'PASSWORD': 'tu_contrasennia',
>        'HOST': 'tu_host',                  
>        'PORT': 'tu_puerto',
>    }
> }

* En una terminal, en la caperta de instalación, ejecutar el comando:
  > python manage.py syncdb
  
  Darle "yes" a la creación de super usuario y colocarle los datos que solicite el asistente.
  
  Si no hay mensaje de error, quiere decir que se instaló de forma correcta.
  
* En una terminal, en la carpeta de instalación ejecutar el comando:

  > python mananage.py socketserver
  
* En otra terminal, en la carpeta de instalación ejecutar el comando:
  > python manage.py runserver
  
* Acceder a: 

Consolo de administración:
http://localhost:8000/admin

Aplicación:
http://localhost:8000/alcaldias

ingresa con el usuario que creaste o crea usuarios adicionales en la consola de administración.

Felicidades lo has instalado bien !! :D
