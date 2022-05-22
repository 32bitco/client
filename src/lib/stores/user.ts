import Cookies from 'js-cookie';
import { writable } from 'svelte/store';

import { authService } from '$lib/services/auth';
import { userService } from '$lib/services/user';

import type { UserFragmentFragment } from '$lib/graphql/schema';

function makeUserStore() {
  const store = writable<{
    token: string;
    user: UserFragmentFragment;
  }>({
    token: null,
    user: null
  });
  const { subscribe, set, update } = store;

  const me = async (): Promise<void> => {
    const token = Cookies.get('token');
    const user = await userService.me();

    set({
      token,
      user
    });
  };

  const login = async (username: string, password: string): Promise<void> => {
    const tokens = await authService.createToken(username, password);
    const user = await userService.me();

    set({
      token: tokens.accessToken,
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
