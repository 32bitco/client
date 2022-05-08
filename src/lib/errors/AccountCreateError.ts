import { GraphQLError } from './GraphQLError';

import { AccountRegisterErrorCode } from '$lib/graphql/schema';
import { variantFromValue } from '$lib/utils/enum';

export class AccountRegisterError extends GraphQLError {
  private constructor(code: string, field: string, message: string) {
    super(code, field, message);
  }

  public static from(
    error: Record<string, unknown> & { message: string; code: string; field: string }
  ): AccountRegisterError {
    return new AccountRegisterError(
      variantFromValue(AccountRegisterErrorCode, error.code),
      error.field,
      error.message
    );
  }
}
