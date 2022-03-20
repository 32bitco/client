import { urqlClient } from '$lib/utils/urql';
import { UserCreateDocument } from '$lib/graphql/schema';

import type { UserCreateInput, UserFragmentFragment } from '$lib/graphql/schema';

export type UserCreate = (input: UserCreateInput) => Promise<UserFragmentFragment>;

export type UserService = {
  userCreate: UserCreate;
};

function makeUserService(): UserService {
  const userCreate: UserCreate = async (input: UserCreateInput) => {
    const { data = {}, error } = await urqlClient
      .mutation(UserCreateDocument, {
        input
      })
      .toPromise();

    if (error) {
      throw error;
    }

    return data;
  };

  return {
    userCreate
  };
}

export const userService: UserService = makeUserService();
