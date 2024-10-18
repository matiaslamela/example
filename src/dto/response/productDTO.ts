import { Expose, Transform } from "class-transformer";

export default class ProductDTO {
  @Expose()
  private id: number;

  @Expose()
  private name: string;

  @Expose()
  private stock: number;

  @Expose({ name: "created_at" })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  private createdAt: Date;

  @Expose({ name: "updated_at" })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  private updatedAt: Date;

  constructor(
    id: number,
    name: string,
    stock: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.stock = stock;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
