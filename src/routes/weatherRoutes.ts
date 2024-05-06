import { Router } from "express";
import { param } from "express-validator";
import { getWeather } from "../controllers/weatherController";
import { paramXSS } from "../middlewares/xssMiddleware";

export const weather = Router();

weather.get(
  "/:city?",
  param("city").optional().isString(),
  paramXSS("city"),
  getWeather
);
