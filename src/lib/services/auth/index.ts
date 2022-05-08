import { urqlClient } from '$lib/utils/urql';
import { TokenCreateDocument } from '$lib/graphql/schema';
import { TokenCreateError } from '$lib/errors/TokenCreateError';

import type { TokensFragmentFragment } from '$lib/graphql/schema';

export type TokenCreate = (username: string, password: string) => Promise<TokensFragmentFragment>;

export type AuthService = {
  createToken: TokenCreate;
};

function makeAuthService(): AuthService {
  const createToken: TokenCreate = async (username, password) => {
    const { data = {}, error } = await urqlClient
      .mutation(TokenCreateDocument, {
        username,
        password
      })
      .toPromise();

    if (data.accountRegister.error) {
      const err = TokenCreateError.from(error[0]);

      throw err;
    }

    if (error) {
      throw error;
    }

    return data.tokenCreate.tokens;
  };

  return {
    createToken
  };
}

export const authService: AuthService = makeAuthService();
