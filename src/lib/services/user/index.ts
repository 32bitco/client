import { urqlClient } from '$lib/utils/urql';
import { AccountRegisterDocument } from '$lib/graphql/schema';
import { AccountRegisterError } from '$lib/errors/AccountCreateError';

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

    if (data.accountRegister.error) {
      const err = AccountRegisterError.from(error[0]);

      throw err;
    }

    if (error) {
      throw error;
    }

    return data.accountRegister.user;
  };

  return {
    accountRegister
  };
}

export const userService: UserService = makeUserService();
