Localizar-Alcaldias
===================

Esta es una herramienta de práctica sobre geolocalización gratuita, la idea es simular que se captura la localización (latitud, longitud) de las alcaldias de El Salvador.

Requisitos de Instalación:
===========================
1) Python 2.7
2) Django 1.5
3) Sockjs-django-Tornado del repositorio de Peterbe ( muchas gracias !! )
4) Mysql.
4) Mysql para python https://pypi.python.org/pypi/MySQL-python o la versión de tu sistema operativo.

Instalación:
==========================
1) Instalar Python 2.7. Seguir las instrucciones de acuerdo a tu sistema operativo.
2) Instalar Django 1.5. Seguir las instrucciones de acerudo a tu sistema operativo.
3) Descargar Sockjs-django-Tornado https://github.com/peterbe/django-sockjs-tornado,
   Luego abrir una terminal y desplazarse a los archivos descargados, y ejecutar los siguientes comandos:
   # python setup.py build
   # python setub.pyinstall
   
   Si ningún mensaje de error es reportado, entonces se instaló de forma correcta.

4) Instalar Mysql y mysql para python
5) Crear una base de datos, puedes ponerle el nombre que gustes.
6) Dentro de la carpeta rnpn, modificar el archivo settings.py y colocar la siguiente información:

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'nombre_de_tu_base_de_datos',                      # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER': 'tu_usuario',
        'PASSWORD': 'tu_contrasennia',
        'HOST': 'tu_host',                      # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': 'tu_puerto',                      # Set to empty string for default.
    }
}

7)En una terminal, en la caperta de instalación, ejecutar el comando:
  # python manage.py syncdb
  
  Darle "yes" a la creación de super usuario y colocarle los datos que solicite el asistente.
  
  Si no hay mensaje de error, quiere decir que se instaló de forma correcta.
  
8) En una terminal, en la carpeta de instalación ejecutar el comando:

  # python mananage.py socketserver
  
9) En otra terminal, en la carpeta de instalación ejecutar el comando:
  # python manage.py runserver
  
10) Acceder a: 

Consolo de administración:
http://localhost:8000/admin

Aplicación:
http://localhost:8000/alcaldias

ingresa con el usuario que creaste o crea usuarios adicionales en la consola de administración.

Felicidades lo has instalado bien !! :D
