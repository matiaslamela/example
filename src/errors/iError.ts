import { StatusCodes } from "http-status-codes";
import FieldValidationErrorDTO from "../dto/error/fieldValidationErrorDTO";

export default interface IError extends Error {
  readonly status?: StatusCodes;
  readonly fieldErrors?: FieldValidationErrorDTO[];
  readonly name: string;
}
