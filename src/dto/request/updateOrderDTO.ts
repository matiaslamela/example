import {
  IsNotEmpty,
  IsString,
  Matches,
  IsPositive,
  IsOptional,
} from "class-validator";
import { OrderStatus } from "../../database/models/order";

export default class UpdateOrderDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  public userId?: number;

  @IsOptional()
  @IsNotEmpty()
  @Matches(`^${Object.values(OrderStatus).join("|")}$`, "i")
  public status?: OrderStatus;

  constructor(userId: number, status: OrderStatus) {
    this.userId = userId;
    this.status = status;
  }
}
