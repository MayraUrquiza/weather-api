import { IForecast } from "../types/forecastTypes";
import { ILocationDTO } from "./location";

export interface IDayDTO {
  dt: number;
  temp: number;
  feels: number;
  pressure: number;
  humidity: number;
  mainCondition: { name: string; description: string };
  clouds: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    "3h"?: number;
  };
  snow?: {
    "3h"?: number;
  };
}

export interface IForecastDTO extends Omit<ILocationDTO, "country"> {
  sunrise: number;
  sunset: number;
  days: { [key: string]: IDayDTO[] };
}

export const transformData = (forecast: IForecast): IForecastDTO => {
  const days: Record<string, IDayDTO[]> = {};
  const today = new Date().toLocaleDateString();

  for (const current of forecast.list) {
    const day = new Date(current.dt * 1000).toLocaleDateString();

    if (day === today) continue;

    if (!days[day]) {
      days[day] = [];
    }

    days[day].push({
      dt: current.dt,
      temp: current.main.temp,
      feels: current.main.feels_like,
      pressure: current.main.pressure,
      humidity: current.main.humidity,
      mainCondition: {
        name: current.weather[0].main,
        description: current.weather[0].description,
      },
      clouds: current.clouds.all,
      wind: current.wind,
      snow: current.snow,
      rain: current.rain,
    });
  }

  return {
    city: forecast.city.name,
    countryCode: forecast.city.country,
    lat: forecast.city.coord.lat,
    lon: forecast.city.coord.lon,
    sunrise: forecast.city.sunrise,
    sunset: forecast.city.sunset,
    days,
  };
};
