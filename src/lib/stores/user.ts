import { writable } from 'svelte/store';

import { makeAuthService } from '$lib/services/auth';
import { makeUserService } from '$lib/services/user';

import type { Client } from '@urql/svelte';
import type { UserFragmentFragment } from '$lib/graphql/schema';

function makeUserStore() {
  const store = writable<{
    user: UserFragmentFragment;
  }>({
    user: null
  });
  const { subscribe, set, update } = store;

  const me = async (urqlClient: Client): Promise<void> => {
    try {
      const userService = makeUserService(urqlClient);
      const user = await userService.me();

      set({
        user
      });
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (urqlClient: Client, username: string, password: string): Promise<void> => {
    try {
      const userService = makeUserService(urqlClient);
      const authService = makeAuthService(urqlClient);
      await authService.createToken(username, password);
      const user = await userService.me();

      set({
        user
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    login,
    me,
    subscribe,
    update
  };
}

const userStore = makeUserStore();

export { userStore };
