import axios from "axios";
import {
  IP_API_URL,
  OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_API_URL,
} from "../config/default";
import { transformData } from "../dtos/location";
import {
  ILocationByIp,
  ILocationParameters,
  ILocationByName,
} from "../types/locationTypes";

export const getCurrentLocation = async () => {
  const { data: currentLocation } = await axios.get<ILocationByIp>(
    `${IP_API_URL}/json/`
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
    `${OPEN_WEATHER_API_URL}/geo/1.0/direct`,
    {
      params: {
        q: `${cityName},${stateCode},${countryCode}`,
        limit,
        appid: OPEN_WEATHER_API_KEY,
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

  const locationByName = await getLocationByName({ cityName: city });

  if (!locationByName) return;

  const { lat, lon } = locationByName;
  return { lat, lon };
};
