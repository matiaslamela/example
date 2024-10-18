import entityNotFoundError from "../../errors/entitiNotFoundError";

export default class UserNotFoundError extends entityNotFoundError {
  constructor(id: number) {
    super("User", id);
  }
}
