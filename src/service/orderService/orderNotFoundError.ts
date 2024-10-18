import entityNotFoundError from "../../errors/entitiNotFoundError";

export default class OrderNotFoundError extends entityNotFoundError {
  constructor(id: number) {
    super("Order", id);
  }
}
