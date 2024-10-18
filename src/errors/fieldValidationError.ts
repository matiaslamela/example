import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError";
import FieldValidationErrorDTO from "../dto/error/fieldValidationErrorDTO";

export default class FieldValidationError extends BaseError {
  private fieldErrors: FieldValidationErrorDTO[];
  constructor(
    fieldErrors: FieldValidationErrorDTO[],
    description = "Validation Error",
  ) {
    super("ValidationError", StatusCodes.BAD_REQUEST, description);
    this.fieldErrors = fieldErrors;
  }
}
