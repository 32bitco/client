import { writable } from 'svelte/store';

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
    const userService = makeUserService(urqlClient);
    const user = await userService.me();

    set({
      user
    });
  };

  return {
    me,
    subscribe,
    update
  };
}

const userStore = makeUserStore();

export { userStore };
