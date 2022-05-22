import { makeOperation } from '@urql/core';
import { createClient } from '@urql/svelte';
import { authExchange } from '@urql/exchange-auth';
import { dedupExchange, cacheExchange, fetchExchange } from 'urql';

import type { Client } from '@urql/svelte';

export function makeUrqlClient(): Client {
  return createClient({
    url: import.meta.env.VITE_API_URL as string,
    exchanges: [
      dedupExchange,
      cacheExchange,
      authExchange<{ token: string }>({
        addAuthToOperation: ({ authState, operation }) => {
          console.log(authState);
          if (!authState || !authState?.token) {
            return operation;
          }

          const fetchOptions =
            typeof operation.context.fetchOptions === 'function'
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {};

          return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                Authorization: `JWT ${authState.token}`
              }
            }
          });
        },
        willAuthError: ({ authState }) => !authState,
        didAuthError: ({ error }) => {
          return error.graphQLErrors.some((e) => e.extensions?.code === 'FORBIDDEN');
        },
        getAuth: async ({ authState }) => {
          if (typeof window !== 'undefined') {
            console.log(authState);
            if (!authState) {
              const token = localStorage.getItem('token');

              if (token) {
                return {
                  token
                };
              }

              return null;
            }
          }

          return null;
        }
      }),
      fetchExchange
    ]
  });
}

export const urqlClient = makeUrqlClient();
