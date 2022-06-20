import { setContext, getContext } from 'svelte';

import { makeAuthService, type AuthService } from './auth';
import { makeUserService, type UserService } from './user';
import { makePostService, type PostService } from './post';

import type { Client } from 'urql';

export type Services = {
  auth: AuthService;
  post: PostService;
  user: UserService;
};

const SERVICE_CONTEXT_KEY = Symbol('ServicesContext');

export const initServicesContext = (client: Client): Services => {
  const auth = makeAuthService(client);
  const post = makePostService(client);
  const user = makeUserService(client);
  const services = {
    auth,
    post,
    user
  };

  setContext(SERVICE_CONTEXT_KEY, services);

  return services;
};

export const getContextServices = (): Services => {
  const services = getContext<Services>(SERVICE_CONTEXT_KEY);

  if (!services) {
    throw new Error('Services Context is not initialized. You must call "initServicesContext".');
  }

  return services;
};
