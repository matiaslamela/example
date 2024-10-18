import { IsNotEmpty, IsString, Min } from "class-validator";

export default class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @Min(0)
  public stock: number;

  constructor(name: string, stock: number) {
    this.name = name;
    this.stock = stock;
  }
}
