import { IWeather } from "../types/weatherTypes";

export interface IWeatherDTO {
  city: string;
  countryCode: string;
  lat: number;
  lon: number;
  sunrise: number;
  sunset: number;
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

export const transformData = (weather: IWeather): IWeatherDTO => ({
  city: weather.name,
  countryCode: weather.sys.country,
  lat: weather.coord.lat,
  lon: weather.coord.lon,
  sunrise: weather.sys.sunrise,
  sunset: weather.sys.sunset,
  dt: weather.dt,
  temp: weather.main.temp,
  feels: weather.main.feels_like,
  pressure: weather.main.pressure,
  humidity: weather.main.humidity,
  mainCondition: {
    name: weather.weather[0].main,
    description: weather.weather[0].description,
  },
  clouds: weather.clouds,
  wind: weather.wind,
  snow: weather.snow,
});
