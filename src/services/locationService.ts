import axios from "axios";
import { CONFIG as CONFIG_DEFAULT } from "../config/default";
import { CONFIG as CONFIG_SECRETS } from "../config/secrets";
import { transformData } from "../dtos/location";
import {
  ILocationByIp,
  ILocationParameters,
  ILocationByName,
} from "../types/locationTypes";

export const getCurrentLocation = async () => {
  const { data: currentLocation } = await axios.get<ILocationByIp>(
    `${CONFIG_DEFAULT.IP_API_URL}/json/`
  );

  return transformData(currentLocation);
};

const getLocationsByName = async ({
  cityName,
  stateCode = "",
  countryCode = "",
  limit = 10,
}: ILocationParameters) => {
  const { data: locationsByName } = await axios.get<ILocationByName[]>(
    `${CONFIG_DEFAULT.OPEN_WEATHER_API_URL}/geo/1.0/direct`,
    {
      params: {
        q: `${cityName},${stateCode},${countryCode}`,
        limit,
        appid: CONFIG_SECRETS.OPEN_WEATHER_API_KEY,
      },
    }
  );

  return locationsByName;
};

const getLocationByName = async (
  params: Omit<ILocationParameters, "limit">
) => {
  const locations = await getLocationsByName({ ...params, limit: 1 });
  return locations[0];
};

export const getCoordinates = async (city?: string) => {
  if (!city) {
    const currentLocation = await getCurrentLocation();

    if (!currentLocation) return;

    const { lat, lon } = currentLocation;
    return { lat, lon };
  }

  const [cityName, stateCode, countryCode] = city.split(",");
  const locationByName = await getLocationByName({
    cityName,
    stateCode,
    countryCode,
  });

  if (!locationByName) return;

  const { lat, lon } = locationByName;
  return { lat, lon };
};
