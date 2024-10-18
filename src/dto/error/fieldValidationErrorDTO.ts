import { Expose } from "class-transformer";

export default class FieldValidationErrorDTO {
  @Expose()
  private field: string;

  @Expose()
  private message: string;

  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }
}
