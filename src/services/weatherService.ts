import axios from "axios";
import { OPEN_WEATHER_API_URL } from "../config/default";
import { OPEN_WEATHER_API_KEY } from "../config/secrets";
import { transformData } from "../dtos/weather";
import { IWeather, IWeatherParameters } from "../types/weatherTypes";

export const getCurrentWeather = async ({
  lat,
  lon,
  lang = "sp",
  units = "metric",
}: IWeatherParameters) => {
  const { data: currentWeather } = await axios.get<IWeather>(
    `${OPEN_WEATHER_API_URL}/data/2.5/weather`,
    {
      params: {
        lat,
        lon,
        lang,
        units,
        appid: OPEN_WEATHER_API_KEY,
      },
    }
  );

  return transformData(currentWeather);
};
