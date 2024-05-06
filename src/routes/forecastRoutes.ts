import { Router } from "express";
import { param } from "express-validator";
import { getForecast } from "../controllers/forecastController";
import { paramXSS } from "../middlewares/xssMiddleware";

export const forecast = Router();

forecast.get(
  "/:city?",
  param("city").optional().isString(),
  paramXSS("city"),
  getForecast
);
