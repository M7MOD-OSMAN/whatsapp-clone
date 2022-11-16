import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DuplicateResourceError, ValidationError } from "utils/errors";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof ValidationError &&
    process.env.NODE_ENV === "development"
  ) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(err);
  } else if (err instanceof DuplicateResourceError) {
    return res.status(StatusCodes.CONFLICT).send();
  }
  if (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  } else {
    return next();
  }
};
