import {
  IsDate,
  IsDateString,
  IsOptional,
  IsNumberString,
  Min,
} from "class-validator";

export default class SearchParams {
  private defaultOffset = 0;
  private defaultLimit = 10;

  @IsOptional()
  @IsNumberString()
  @Min(0)
  private offset?: string;

  @IsOptional()
  @IsNumberString()
  @Min(1)
  private limit?: string;

  constructor(offset?: string, limit?: string) {
    this.offset = offset;
    this.limit = limit;
  }

  get getOffset() {
    return this.offset ? parseInt(this.offset) : this.defaultOffset;
  }

  get getLimit() {
    return this.limit ? parseInt(this.limit) : this.defaultLimit;
  }
}
