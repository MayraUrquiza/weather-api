import axios from "axios";
import { IP_API_URL } from "../config/default";
import { ILocationByIp } from "../types/locationTypes";

export const getCurrentLocation = async () => {
  const { data: currentLocation } = await axios.get<ILocationByIp>(
    `${IP_API_URL}/json/`
  );

  return currentLocation;
};
