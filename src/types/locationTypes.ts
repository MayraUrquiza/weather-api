export interface ILocationParameters {
  cityName: string;
  stateCode?: string;
  countryCode?: string;
  limit?: number;
}

export interface ILocation {
  country: string;
  lat: number;
  lon: number;
}

export interface ILocationByIp extends ILocation {
  status: "success" | "fail";
  message?: "private range" | "reserved range" | "invalid query";
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

export interface ILocationByName extends ILocation {
  name: string;
  local_names: Record<string, string>;
  state?: string;
}
