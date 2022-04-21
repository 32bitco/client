import { urqlClient } from '$lib/utils/urql';
import { AccountRegisterDocument } from '$lib/graphql/schema';
import { UniqueError } from '$lib/errors/UniqueError';

import type { AccountRegisterInput, UserFragmentFragment } from '$lib/graphql/schema';

export type AccountRegister = (input: AccountRegisterInput) => Promise<UserFragmentFragment>;

export type UserService = {
  accountRegister: AccountRegister;
};

function makeUserService(): UserService {
  const accountRegister: AccountRegister = async (input: AccountRegisterInput) => {
    const { data = { accountRegister }, error } = await urqlClient
      .mutation(AccountRegisterDocument, {
        input
      })
      .toPromise();

    if (error) {
      const extensions = (
        error.graphQLErrors[0].originalError as unknown as {
          extensions: {
            code: string;
            field: string;
          };
        }
      ).extensions;
      const { code, field } = extensions;

      if (code === 'UNIQUE') {
        throw new UniqueError(field);
      }

      throw new Error(`An error ocurred: ${code}`);
    }

    return data.accountRegister;
  };

  return {
    accountRegister
  };
}

export const userService: UserService = makeUserService();
