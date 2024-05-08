# weather-api

API de consulta de clima que permite obtener datos de la ubicación actual a partir de la ip desde la que se consulta, pronóstico de clima actual y para los próximos cinco días ya sea de la ubicación actual o de otra ciudad.

https://github.com/MayraUrquiza/weather-api

## Construido con

- NodeJs
- Express
- Typescript

## Como utilizarlo

### Prerequisitos

Instalar npm en caso de ser necesario

```
npm install npm@latest -g
```

### Instalación

1. Obtener una api key gratuita en https://home.openweathermap.org/api_keys
2. Clonar el repositorio
   ```
   git clone https://github.com/MayraUrquiza/weather-api.git
   ```
3. Instalar paquetes de NPM
   ```
   npm install
   ```
4. Setear la api key obtenida en el paso 1 en src/config/secrets.ts

   ```
   export const CONFIG = {
      ...,
      OPEN_WEATHER_API_KEY: "Tu api key",
    };
   ```

   o en el archivo .env

   ```
   OPEN_WEATHER_API_KEY = "Tu api key"
   ```

   **Si no se realiza este paso los endpoints /api/v1/current y /api/v1/forecast no estarán disponibles. Además, en caso de ser ejecutados, fallarán todos los tests relacionados a estos dos endpoints.**

### Comandos de ejecución

- Para ejecutar el proyecto utilizar el comando `npm run start` o `npm start`
- Para ejecutar el proyecto escuchando los cambios realizados utilizar el comando `npm run watch`
- Para ejecutar las suites de tests usar el comando `npm run test` o `npm test`

## Endpoints disponibles

La aplicación se ejecuta por defecto en el puerto 3000, en caso de querer cambiarlo modificar el archivo src/config/default.ts con el nuevo valor del puerto. Los endpoints disponibles son los siguientes:

**GET /api/v1/location** - Permite obtener datos de la ubicación actual.

`curl --location 'localhost:3000/api/v1/location'`

respuesta:

```
{
    "city":"Buenos Aires",
    "country":"Argentina",
    "countryCode":"AR",
    "lat":-34.6142,
    "lon":-58.3811
}

```

**GET /api/v1/current/[city]** - Permite obtener el pronóstico de la ciudad actual si no se pasa el parámetro city o de la ciudad solicitada si se pasa el parámetro.

`curl --location 'localhost:3000/api/v1/current/bariloche'`

respuesta:

```
{
    "city":"Bariloche",
    "countryCode":"AR",
    "lat":-41.1334,
    "lon":-71.3098,
    "sunrise":1714995472,
    "sunset":1715031944,
    "dt":1715039306,
    "temp":5.14,
    "feels":5.14,
    "pressure":1003,
    "humidity":65,
    "mainCondition": {
        "name":"Snow",
        "description":"aguanieve"
    },
    "clouds": {
        "all":100
    },
    "wind": {
        "speed":1.03,
        "deg":0
    },
    "snow": {
        "1h":2.68
    }
}

```

**GET /api/v1/forecast/[city]** - Permite obtener el pronóstico extendido a 5 días de la ciudad actual si no se pasa el parámetro city o de la ciudad solicitada si se pasa el parámetro.

`curl --location 'localhost:3000/api/v1/forecast/bariloche'`

respuesta:

```
{
    "city": "Bariloche",
    "countryCode": "AR",
    "lat": -41.1334,
    "lon": -71.3098,
    "sunrise": 1714995472,
    "sunset": 1715031944,
    "days": {
      "2024-05-07": [
        {
          "dt": 1715040000,
          "dttxt": "2024-05-07 00:00:00",
          "temp": 5.14,
          "feels": 5.14,
          "pressure": 1003,
          "humidity": 65,
          "mainCondition": {
            "name": "Snow",
            "description": "nieve"
          },
          "clouds": {
            "all": 100
          },
          "wind": {
            "speed": 0.9,
            "deg": 260,
            "gust": 1.63
          },
          "snow": {
            "3h": 8.03
          }
        },
        ...
      ],
      "2024-05-08": [...],
      "2024-05-09": [...],
      "2024-05-10": [...],
      "2024-05-11": [...]
    }
}
```
