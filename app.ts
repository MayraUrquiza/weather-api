import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import helmet from "helmet";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./src/middlewares/errorsMiddleware";
import { router } from "./src/routes/index";
import { logger } from "./src/utils/logger";
import { CONFIG as DEFAULT } from "./src/config/default";
import { CONFIG as SECRETS } from "./src/config/secrets";

/** Configuración de entorno */
dotenv.config();
DEFAULT.PORT = process.env.PORT ? +process.env.PORT : DEFAULT.PORT;
SECRETS.OPEN_WEATHER_API_KEY =
  process.env.OPEN_WEATHER_API_KEY || SECRETS.OPEN_WEATHER_API_KEY;

/** Configuración e inicialización del servidor */
export const app = express();
const { API_PATH, PORT } = DEFAULT;

app.use(json());
app.use(helmet());
app.use(cors());
app.use(errorMiddleware);
app.use(API_PATH, router);
app.use(notFoundMiddleware);

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
