import { StatusCodes, ReasonPhrases } from "http-status-codes";
import BaseError from "./baseError";

class APIError extends BaseError {
  constructor(
    name: string,
    httpCode = StatusCodes.INTERNAL_SERVER_ERROR,
    message = ReasonPhrases.INTERNAL_SERVER_ERROR,
  ) {
    super(name, httpCode, message);
  }
}
