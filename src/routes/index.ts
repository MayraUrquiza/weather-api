import { Router } from "express";
import { weather } from "./weatherRoutes";

export const router = Router();

router.use("/current", weather);
