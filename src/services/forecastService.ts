import axios from "axios";
import { CONFIG as CONFIG_FEFAULT } from "../config/default";
import { CONFIG as CONFIG_SECRETS } from "../config/secrets";
import { transformData } from "../dtos/forecast";
import { IForecastParameters, IForecast } from "../types/forecastTypes";

export const getDailyForecast = async ({
  lat,
  lon,
  lang = "sp",
  units = "metric",
  cnt = 40,
}: IForecastParameters) => {
  const { data: forecast } = await axios.get<IForecast>(
    `${CONFIG_FEFAULT.OPEN_WEATHER_API_URL}/data/2.5/forecast`,
    {
      params: {
        lat,
        lon,
        lang,
        units,
        cnt,
        appid: CONFIG_SECRETS.OPEN_WEATHER_API_KEY,
      },
    }
  );

  return transformData(forecast);
};
