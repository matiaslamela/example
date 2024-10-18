import NotFoundError from "./notFoundError";

export default class entityNotFoundError extends NotFoundError {
  constructor(entitiy: string, id: number) {
    super(`${entitiy} not found: ${id}`);
  }
}
