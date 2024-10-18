import { ValidationError } from "class-validator";
import FieldValidationErrorDTO from "../dto/error/fieldValidationErrorDTO";

export function mapValidationErrorToFieldValidationErrorDTOList(
  errors: ValidationError[],
): FieldValidationErrorDTO[] {
  return errors
    .filter(
      (error: ValidationError) =>
        error.constraints && Object.entries(error.constraints).length > 0,
    )
    .map(
      (error: ValidationError) =>
        new FieldValidationErrorDTO(
          error.property,
          Object.values(error.constraints!).join(", "),
        ),
    );
}
