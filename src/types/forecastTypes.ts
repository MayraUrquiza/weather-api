import { IWeatherParameters } from "./weatherTypes";

export interface IForecastParameters extends IWeatherParameters {
  cnt?: number;
}

export interface IForecast {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    visibility: number;
    pop: number; // probabilidad de precipitación (0 a 1)
    wind: {
      speed: number;
      deg: number;
      gust?: number; // ráfagas mts/s
    };
    rain?: {
      "3h"?: number;
    };
    snow?: {
      "3h"?: number;
    };
    clouds: {
      all: number; // porcentaje de nubes (0 a 100)
    };
    sys: {
      pod: "n" | "d"; // parte del día (noche | día)
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
