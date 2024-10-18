import { Expose, Transform } from "class-transformer";

export default class UserDTO {
  @Expose()
  private id: number;

  @Expose()
  private name: string;

  @Expose()
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  private birthdate: Date;

  @Expose({ name: "created_at" })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  private createdAt: Date;

  @Expose({ name: "updated_at" })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  private updatedAt: Date;

  constructor(
    id: number,
    name: string,
    birthdate: Date,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.birthdate = birthdate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
