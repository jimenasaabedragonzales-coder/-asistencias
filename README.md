# Sistema de Desarrollo en Clases
### Sistema de Control de Asistencia con git 
## Desarrollado por 
# Nelson Koby
## Registro de Usuarios
- Registro del personal
# -asistencias

## Ejecución local

1. Inicia Apache y MySQL desde WAMP.
2. Abre `http://localhost/asistencias/frontend/` en el navegador.
3. Las solicitudes del frontend y los archivos `.rest` usan `http://api.controlasistenciasexto`. Ese nombre debe apuntar al sitio `api/public` de este proyecto en la configuración local de Apache.

## Conexión de la base de datos

La API lee las variables de conexión del archivo `.env` en la raíz del proyecto. Si `DB_SSL_CA` está configurada, debe apuntar a un certificado CA SSL existente y accesible; no desactives la validación SSL para evitar el error.
