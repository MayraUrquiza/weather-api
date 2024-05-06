import { logger } from "./logger";

export const handleError = async (error: Error) => {
  logger.error(error.message);
  logger.verbose(error.stack);
};
