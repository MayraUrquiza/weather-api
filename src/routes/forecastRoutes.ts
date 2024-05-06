import { Router } from "express";
import { param } from "express-validator";
import { getForecast } from "../controllers/forecastController";

export const forecast = Router();

forecast.get("/:city?", param("city").optional().isString(), getForecast);
