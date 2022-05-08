import { GraphQLError } from './GraphQLError';

import { TokenCreateErrorCode } from '$lib/graphql/schema';
import { variantFromValue } from '$lib/utils/enum';

export class TokenCreateError extends GraphQLError {
  private constructor(code: string, field: string, message: string) {
    super(code, field, message);
  }

  public static from(
    error: Record<string, unknown> & { message: string; code: string; field: string }
  ): TokenCreateError {
    return new TokenCreateError(
      variantFromValue(TokenCreateErrorCode, error.code),
      error.field,
      error.message
    );
  }
}
