import { Expose, Transform } from "class-transformer";
import { OrderStatus } from "../../database/models/order";

export default class OrderDTO {
  @Expose()
  private id: number;

  @Expose()
  private status: OrderStatus;

  @Expose({ name: "user_id" })
  private userId: number;

  @Expose({ name: "created_at" })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  private createdAt: Date;

  @Expose({ name: "updated_at" })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  private updatedAt: Date;

  constructor(
    id: number,
    status: OrderStatus,
    userId: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.status = status;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
