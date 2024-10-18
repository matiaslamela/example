import { IsNotEmpty, IsNumberString, IsPositive } from "class-validator";

export default class AddProductToOrderDTO {
  @IsNotEmpty()
  @IsPositive()
  private quantity: number;

  @IsNotEmpty()
  @IsNumberString()
  private orderId: string;

  @IsNotEmpty()
  @IsNumberString()
  private productId: string;

  constructor(quantity: number, orderId: string, productId: string) {
    this.quantity = quantity;
    this.orderId = orderId;
    this.productId = productId;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getOrderId(): number {
    return parseInt(this.orderId);
  }

  public getProductId(): number {
    return parseInt(this.productId);
  }
}
