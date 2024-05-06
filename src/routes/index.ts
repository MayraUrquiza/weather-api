import { Router } from "express";
import { forecast } from "./forecastRoutes";
import { location } from "./locationRoutes";
import { weather } from "./weatherRoutes";

export const router = Router();

router.use("/forecast", forecast);
router.use("/location", location);
router.use("/current", weather);
