import { ILocationByIp } from "../types/locationTypes";

export interface ILocationDTO {
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
}

export const transformData = (
  currentLocation: ILocationByIp
): ILocationDTO => ({
  city: currentLocation.city,
  country: currentLocation.country,
  countryCode: currentLocation.countryCode,
  lat: currentLocation.lat,
  lon: currentLocation.lon,
});
