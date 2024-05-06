import { Request, Response } from "express";
import { IWeatherDTO } from "../dtos/weather";
import { getCoordinates } from "../services/locationService";
import { getCurrentWeather } from "../services/weatherService";
import { IErrorResponse } from "../types/errorTypes";
import { handleError } from "../utils/errorHandler";

export const getWeather = async (
  req: Request,
  res: Response<IWeatherDTO | IErrorResponse>
) => {
  try {
    const { city } = req.params;

    const coords = await getCoordinates(city);

    if (!coords) {
      return res.status(400).send({
        code: 400,
        message: "It is not possible to find the required city",
      });
    }

    const currentWeather = await getCurrentWeather(coords);

    return res.status(200).send(currentWeather);
  } catch (error: any) {
    handleError(error);
    return res.status(500).send({
      code: 500,
      message: "Failure to get weather",
      details: error.message,
    });
  }
};
