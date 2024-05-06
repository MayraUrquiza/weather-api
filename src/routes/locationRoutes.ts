import { Router } from "express";
import { getLocation } from "../controllers/locationController";

export const location = Router();

location.get("/", getLocation);
