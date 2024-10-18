import { Expose, Transform } from "class-transformer";
import ErrorResponseDTO from "./errorResponseDTO";
import FieldValidationErrorDTO from "./fieldValidationErrorDTO";

export default class validationErrorResponseDTO extends ErrorResponseDTO {
  @Expose()
  @Transform(({ value }) => (value && value.length ? value : undefined), {
    toPlainOnly: true,
  })
  private fieldErrors?: FieldValidationErrorDTO[];

  constructor(
    status: number,
    message: string,
    fieldErrors?: FieldValidationErrorDTO[],
  ) {
    super(status, message);
    this.fieldErrors = fieldErrors;
  }
}
