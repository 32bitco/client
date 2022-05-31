import { getContextClient } from '@urql/svelte';

import { CreatePostDocument, FeedDocument } from '$lib/graphql/schema';
import { AccountRegisterError } from '$lib/errors/AccountCreateError';

import type { PostCreateInput, PostFragmentFragment } from '$lib/graphql/schema';

export type Feed = () => Promise<PostFragmentFragment[]>;

export type CreatePost = (input: PostCreateInput) => Promise<PostFragmentFragment>;

export type PostService = {
  createPost: CreatePost;
  feed: Feed;
};

export function makePostService(): PostService {
  const createPost: CreatePost = async (input: PostCreateInput) => {
    const urqlClient = getContextClient();
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

  const feed: Feed = async () => {
    const urqlClient = getContextClient();
    const { data, error } = await urqlClient.query(FeedDocument).toPromise();

    if (data?.feed.error) {
      const err = AccountRegisterError.from(error[0]);

      throw err;
    }

    if (error) {
      throw error;
    }

    // TODO: Fix schemas in the Back-End to avoid repeition
    return data.feed.feed;
  };

  return {
    createPost,
    feed
  };
}

export const postService: PostService = makePostService();
