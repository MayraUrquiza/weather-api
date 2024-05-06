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
