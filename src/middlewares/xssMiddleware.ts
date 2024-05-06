import { NextFunction, Request, Response } from "express";
import { body, param, query } from "express-validator";
import { ParsedQs } from "qs";

export const paramXSS =
  (name: string | string[] | undefined) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!name) return next();

    const decodedParam = decodeURIComponent(req.params[name.toString()]);
    param(decodedParam).escape();
    next();
  };

export const queryXSS =
  (name: string | string[] | ParsedQs | ParsedQs[] | undefined) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!name) return next();

    const queryParam = name ? req.query[name.toString()] : null;
    if (queryParam) {
      const decodedQuery = decodeURIComponent(queryParam.toString());
      query(decodedQuery).escape();
    }
    next();
  };

export const bodyXSS =
  (name: string) => (req: Request, _res: Response, next: NextFunction) => {
    if (!name) return next();

    const decodedBody = decodeURIComponent(req.body[name]);
    body(decodedBody).escape();
    next();
  };

export const headersXSS =
  (name: string | string[] | undefined) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!name) return next();

    const header = name ? req.headers[name.toString()] : null;
    if (header) {
      const decodedHeader = decodeURIComponent(header.toString());
      query(decodedHeader).escape();
    }
    next();
  };
