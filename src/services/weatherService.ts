import axios from "axios";
import { CONFIG as CONFIG_DEFAULT } from "../config/default";
import { CONFIG as CONFIG_SECRETS } from "../config/secrets";
import { transformData } from "../dtos/weather";
import { IWeather, IWeatherParameters } from "../types/weatherTypes";

export const getCurrentWeather = async ({
  lat,
  lon,
  lang = "sp",
  units = "metric",
}: IWeatherParameters) => {
  const { data: currentWeather } = await axios.get<IWeather>(
    `${CONFIG_DEFAULT.OPEN_WEATHER_API_URL}/data/2.5/weather`,
    {
      params: {
        lat,
        lon,
        lang,
        units,
        appid: CONFIG_SECRETS.OPEN_WEATHER_API_KEY,
      },
    }
  );

  return transformData(currentWeather);
};
