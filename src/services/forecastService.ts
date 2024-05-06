import axios from "axios";
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_API_URL } from "../config/default";
import { IForecastParameters, IForecast } from "../types/forecastTypes";

export const getDailyForecast = async ({
  lat,
  lon,
  lang = "sp",
  units = "metric",
  cnt = 40,
}: IForecastParameters) => {
  const { data: forecast } = await axios.get<IForecast>(
    `${OPEN_WEATHER_API_URL}/data/2.5/forecast`,
    {
      params: {
        lat,
        lon,
        lang,
        units,
        cnt,
        appid: OPEN_WEATHER_API_KEY,
      },
    }
  );

  return forecast;
};
