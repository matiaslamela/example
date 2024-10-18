import { IsString, IsNotEmpty, IsISO8601 } from "class-validator";

export default class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsISO8601()
  public birthdate: string;

  constructor(name: string, birthdate: string) {
    this.name = name;
    this.birthdate = birthdate;
  }
}
