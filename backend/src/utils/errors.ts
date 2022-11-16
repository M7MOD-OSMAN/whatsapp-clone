export class ValidationError extends Error {
  toJSON() {
    return this.message;
  }
}
export class DuplicateResourceError extends Error {}
