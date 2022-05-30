<script lang="ts" context="module">
  export type AuthState = {
    token: string;
  };
</script>

<script lang="ts">
  import {
    dedupExchange,
    cacheExchange,
    fetchExchange,
    makeOperation,
    initContextClient
  } from '@urql/svelte';
  import { authExchange } from '@urql/exchange-auth';

  import Authenticate from '$lib/components/Authenticate/index.svelte';
  import Header from '$lib/components/Header.svelte';
  import { userStore } from '$lib/stores/user';

  import '$lib/styles/app.css';

  let isAuthenticationModalOpen = false;

  initContextClient({
    url: import.meta.env.VITE_API_URL,
    exchanges: [
      dedupExchange,
      cacheExchange,
      authExchange<AuthState>({
        addAuthToOperation: ({ authState, operation }) => {
          if (!authState) {
            return operation;
          }

          const fetchOptions = (operation.context.fetchOptions || {
            headers: {}
          }) as { headers: { authorization: string } };

          return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                authorization: `JWT ${authState.token}`
              }
            }
          });
        },
        willAuthError: ({ authState }) => !authState,
        didAuthError: ({ error }) => {
          // If didAuthError returns true, it will trigger the exchange to
          // trigger the logic for asking for re-authentication via getAuth.
          return error.graphQLErrors.some(
            (e) =>
              (e.extensions?.exception as unknown as { code?: string })?.code === 'UNAUTHORIZED'
          );
        },
        getAuth: async ({ authState }) => {
          if (typeof localStorage === 'undefined') {
            return null;
          }

          if (!authState) {
            // Triggered after an auth error has occurred
            localStorage.clear();
          }

          const token = localStorage.getItem('token');

          if (token) {
            return { token };
          }

          return null;
        }
      }),
      fetchExchange
    ]
  });

  $: {
    if (typeof document !== 'undefined') {
      if (isAuthenticationModalOpen && typeof document !== 'undefined') {
        document.documentElement.classList.add('overflow-hidden');
      } else {
        document.documentElement.classList.remove('overflow-hidden');
      }
    }
  }
</script>

<div
  id="app"
  class="relative min-h-screen min-w-screen bg-slate-100 overflow-x-hidden overflow-y-scroll pt-[64px]"
>
  <Header bind:isAuthenticationModalOpen />
  <slot />
</div>

{#if isAuthenticationModalOpen && !$userStore.user}
  <div class="bg-gray-600/25 fixed flex justify-center items-center top-0 left-0 h-screen w-screen">
    <Authenticate />
  </div>
{/if}
