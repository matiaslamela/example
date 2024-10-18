import { IsNotEmpty, IsString, Matches, IsPositive } from "class-validator";
import { OrderStatus } from "../../database/models/order";
import { Transform } from "class-transformer";

export default class CreateOrderDTO {
  @IsNotEmpty()
  @IsPositive()
  public userId: number;

  @IsNotEmpty()
  @Matches(`^${Object.values(OrderStatus).join("|")}$`, "i")
  public status: OrderStatus;

  constructor(userId: number, status: OrderStatus) {
    this.userId = userId;
    this.status = status;
  }
}
