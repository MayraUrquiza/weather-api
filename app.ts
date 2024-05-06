import express, { json } from "express";
import helmet from "helmet";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./src/middlewares/errorsMiddleware";
import { router } from "./src/routes/index";
import { logger } from "./src/utils/logger";
import { API_PATH } from "./src/config/default";

export const app = express();
const port = 3000;

app.use(json());
app.use(helmet());
app.use(errorMiddleware);
app.use(API_PATH, router);
app.use(notFoundMiddleware);

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
