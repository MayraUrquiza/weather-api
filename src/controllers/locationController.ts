import { Request, Response } from "express";
import { ILocationDTO } from "../dtos/location";
import { getCurrentLocation } from "../services/locationService";
import { IErrorResponse } from "../types/errorTypes";
import { handleError } from "../utils/errorHandler";

export const getLocation = async (
  _req: Request,
  res: Response<ILocationDTO | IErrorResponse>
) => {
  try {
    const currentLocation = await getCurrentLocation();

    return res.status(200).send(currentLocation);
  } catch (error: any) {
    handleError(error);
    return res.status(500).send({
      code: 500,
      message: "Failure to get location information",
      details: error.message,
    });
  }
};
