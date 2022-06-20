import { writable } from 'svelte/store';

import { getContextServices } from '$lib/services';

import type { UserFragmentFragment } from '$lib/graphql/schema';

function makeUserStore() {
  const store = writable<{
    user: UserFragmentFragment;
  }>({
    user: null
  });
  const { subscribe, set, update } = store;

  const me = async (): Promise<void> => {
    const services = getContextServices();
    const user = await services.user.me();

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
