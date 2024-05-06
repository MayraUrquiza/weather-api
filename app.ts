import express, { json } from "express";
import helmet from "helmet";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./src/middlewares/errorsMiddleware";
import { router } from "./src/routes/index";
import { logger } from "./src/utils/logger";
import { API_PATH, PORT } from "./src/config/default";

export const app = express();

app.use(json());
app.use(helmet());
app.use(errorMiddleware);
app.use(API_PATH, router);
app.use(notFoundMiddleware);

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
