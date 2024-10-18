import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError";

export default class ValidationError extends BaseError {
  constructor(description = "Validation Error") {
    super("ValidationError", StatusCodes.BAD_REQUEST, description);
  }
}
