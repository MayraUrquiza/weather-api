import { Request, Response, NextFunction } from "express";
import { CONFIG } from "../config/secrets";

export const authMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!CONFIG.OPEN_WEATHER_API_KEY) {
    return res.status(401).send({
      code: 401,
      message: "There is no API KEY available",
      details: "Must provide Open Weather API KEY",
    });
  }

  next();
};
