import { NextFunction, Request, Response } from "express";
import IError from "../errors/iError";
import { ReasonPhrases } from "http-status-codes";
import ErrorResponseDTO from "../dto/error/errorResponseDTO";
import { instanceToPlain } from "class-transformer";
import validationErrorResponseDTO from "../dto/error/validationErrorResponseDTO";

export default function errorHandler(
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err?.status || 500;
  const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

  const errorResponse = new validationErrorResponseDTO(
    statusCode,
    message,
    err.fieldErrors,
  );
  res.status(statusCode).json(instanceToPlain(errorResponse));
}
