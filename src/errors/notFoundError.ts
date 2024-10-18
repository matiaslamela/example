import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError";

export default class NotFoundError extends BaseError {
  constructor(description = "Not Found Error") {
    super("NotFoundError", StatusCodes.NOT_FOUND, description);
  }
}
