import { Request, Response } from "express";
import { IForecastDTO } from "../dtos/forecast";
import { getDailyForecast } from "../services/forecastService";
import { getCoordinates } from "../services/locationService";
import { IErrorResponse } from "../types/errorTypes";
import { handleError } from "../utils/errorHandler";

export const getForecast = async (
  req: Request,
  res: Response<IForecastDTO | IErrorResponse>
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

    const forecast = await getDailyForecast(coords);

    return res.status(200).send(forecast);
  } catch (error: any) {
    handleError(error);
    return res.status(500).send({
      code: 500,
      message: "Failure to get forecast",
      details: error.message,
    });
  }
};
