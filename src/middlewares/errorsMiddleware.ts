import { Request, Response, NextFunction } from "express";
import { handleError } from "../utils/errorHandler";

export const errorMiddleware = async (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  handleError(error);
  return res.status(500).send({
    code: 500,
    message: "Internal server error",
    details: error.message,
  });
};

export const notFoundMiddleware = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { method, originalUrl } = req;

  return res
    .status(404)
    .send({ code: 404, message: `Cannot ${method} ${originalUrl}` });
};
