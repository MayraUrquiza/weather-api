import { Router } from "express";
import { param } from "express-validator";
import { getWeather } from "../controllers/weatherController";

export const weather = Router();

weather.get("/:city?", param("city").optional().isString(), getWeather);
