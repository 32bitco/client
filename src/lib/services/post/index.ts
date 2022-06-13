import { CreatePostDocument } from '$lib/graphql/schema';
import { AccountRegisterError } from '$lib/errors/AccountCreateError';

import type { Client } from '@urql/svelte';
import type { PostCreateInput, PostFragmentFragment } from '$lib/graphql/schema';

export type CreatePost = (input: PostCreateInput) => Promise<PostFragmentFragment>;

export type PostService = {
  createPost: CreatePost;
};

export function makePostService(urqlClient: Client): PostService {
  const createPost: CreatePost = async (input: PostCreateInput) => {
    const { data = {}, error } = await urqlClient
      .mutation(CreatePostDocument, {
        input
      })
      .toPromise();

    if (data.postCreate.error) {
      const err = AccountRegisterError.from(error[0]);

      throw err;
    }

    if (error) {
      throw error;
    }

    return data.postCreate.post;
  };

  return {
    createPost,
  };
}
