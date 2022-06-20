import { userStore } from '$lib/stores/user';

/**
 * Checks wether the user has an active session by fetching the token from
 * the `localStorage` and calling `userStore.me` method.
 *
 * If GraphQL returns an error with the Extension Code "UNAUTHORIZED", then
 * the `localStorage` is cleared and nothing happens.
 *
 * @remarks This function is intended to run Client Side only
 *
 * @beta This method is likely to move into Cookies in future iterations
 */
export async function fetchCurrentSession() {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
    try {
      await userStore.me();
    } catch (err) {
      const firstError = Array.isArray(err.graphQLErrors) ? err.graphQLErrors[0] : null;

      if (firstError?.extensions?.code === 'UNAUTHORIZED') {
        localStorage.clear();
      }
    }
  }
}
