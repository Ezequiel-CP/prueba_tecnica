# Prueba de APP

El siguiente repositorio fue creado para construir y ejecutar una aplicación de javascript en un contenedor docker de node.js de forma local.

## Requerimientos

* Tener una instalación local o remota de docker y el plugin docker-compose
* Acceso a internet para la descarga de la imagen base de docker-hub
* Contar con conocimientos basicos de ejecución de comando en terminal

## Ejecución

Después de descragdo el repositorio, moverse dentro del directorio "prueba_tecnica" para ejecutar el siguiente comando:

```
docker-compose up -d
```

* `Se iniciará la construcción de la imagen docker y se ejecutará el container sin mantener el prompt de la terminal` 

### Prueba de funcionalidad

Dentro de una terminal se ejecuta el siguiente comando ejemplo con la fechas deseadas a calcular:

```
curl -X POST http://localhost:3000/calculate-periods -H "Content-Type: application/json" -d '[["2024-08-01T12:00:00", "2024-08-01T15:30:00"], ["2024-08-02T09:00:00", "2024-08-02T10:30:00"]]'
```

En la terminal observamos una respuesta de este tipo:

```
[{"startTime":"2024-08-01T12:00:00.000Z","endTime":"2024-08-01T15:30:00.000Z","diffMilliseconds":12600000,"diffSeconds":12600,"diffMinutes":210,"diffHours":3.5},{"startTime":"2024-08-02T09:00:00.000Z","endTime":"2024-08-02T10:30:00.000Z","diffMilliseconds":5400000,"diffSeconds":5400,"diffMinutes":90,"diffHours":1.5}]
```

## Detener ejecución y eliminar recursos creados

Ejecurar en la terminal el siguiente comando dentro del mismo directorio que la aplicación:

```
docker-compose stop && docker-compose rm && docker rmi prueba_tecnica-web:latest && docker network rm prueba_tecnica_default
```
