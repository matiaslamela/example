import { Expose, Type } from "class-transformer";
import FieldValidationErrorDTO from "./fieldValidationErrorDTO";

export default class errorResponseDTO {
  @Expose()
  private status: number;

  @Expose()
  private message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
