import entityNotFoundError from "../../errors/entitiNotFoundError";

export default class productNotFoundError extends entityNotFoundError {
  constructor(id: number) {
    super("Product", id);
  }
}
