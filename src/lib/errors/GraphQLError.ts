export abstract class GraphQLError extends Error {
  protected __code: string;
  protected __field: string;
  protected __message: string;

  protected constructor(code: string, field: string, message: string) {
    super(`(${code}) ${message}`);

    this.__code = code;
    this.__field = field;
    this.__message = message;
  }

  get code(): string {
    return this.__code;
  }

  get field(): string {
    return this.__field;
  }

  get message(): string {
    return this.__message;
  }
}
