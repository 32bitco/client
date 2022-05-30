import { getContextClient } from '@urql/svelte';
import { writable } from 'svelte/store';

import { makeAuthService } from '$lib/services/auth';
import { makeUserService } from '$lib/services/user';

import type { UserFragmentFragment } from '$lib/graphql/schema';

function makeUserStore() {
  const store = writable<{
    user: UserFragmentFragment;
  }>({
    user: null
  });
  const { subscribe, set, update } = store;

  const me = async (): Promise<void> => {
    const userService = makeUserService(getContextClient());
    const user = await userService.me();

    set({
      user
    });
  };

  const login = async (username: string, password: string): Promise<void> => {
    const userService = makeUserService(getContextClient());
    const authService = makeAuthService(getContextClient());
    await authService.createToken(username, password);
    const user = await userService.me();

    set({
      user
    });
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
