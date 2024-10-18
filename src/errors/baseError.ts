import IError from "./iError";

export default class BaseError extends Error implements IError {
  public readonly name: string;
  public readonly status: number;

  constructor(name: string, status: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.status = status;
    Error.captureStackTrace(this);
  }
}
