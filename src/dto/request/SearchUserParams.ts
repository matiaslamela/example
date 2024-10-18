import {
  IsDate,
  IsDateString,
  IsOptional,
  IsNumberString,
  Min,
} from "class-validator";
import SearchParams from "./SearchParams";

export default class SearchUserParams extends SearchParams {
  @IsOptional()
  @IsDateString()
  private birthdate_from?: string;

  @IsOptional()
  @IsDate()
  private birthdate_to?: string;

  constructor(
    offset?: string,
    limit?: string,
    birthdate_from?: string,
    birthdate_to?: string,
  ) {
    super(offset, limit);
    this.birthdate_from = birthdate_from;
    this.birthdate_to = birthdate_to;
  }

  get getBirthdateFrom() {
    return this.birthdate_from;
  }

  get getBirthdateTo() {
    return this.birthdate_to;
  }
}
