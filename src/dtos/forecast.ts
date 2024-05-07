import { IForecast } from "../types/forecastTypes";

export interface IDayDTO {
  dt: number;
  temp: number;
  feels: number;
  pressure: number;
  humidity: number;
  mainCondition: { name: string; description: string };
  clouds: any;
  wind: any;
  snow: any;
}

export interface IForecastDTO {
  city: string;
  countryCode: string;
  lat: number;
  lon: number;
  sunrise: number;
  sunset: number;
  days: { [key: string]: IDayDTO[] };
}

export const transformData = (forecast: IForecast): IForecastDTO => {
  const days: Record<string, IDayDTO[]> = {};

  forecast.list.forEach((current) => {
    const day = current.dt_txt.split(" ")[0];

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
      clouds: current.clouds,
      wind: current.wind,
      snow: current.snow,
    });
  });

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
