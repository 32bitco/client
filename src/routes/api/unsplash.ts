import dotenv from 'dotenv';
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';
import { parse } from 'cookie';

import type { RequestEvent } from '@sveltejs/kit/types/internal';

dotenv.config();

export type Unsplash = {
  url: string;
  author: {
    id: string;
    username: string;
    url: string;
    avatar: string;
  };
};

export async function get(event: RequestEvent) {
  const cookiesHeader = event.request.headers.get('cookie') || '';
  const cookies = parse(cookiesHeader);
  const UNSPLASH_DAILY_BACKGROUND = cookies.UNSPLASH_DAILY_BACKGROUND || null;

  if (UNSPLASH_DAILY_BACKGROUND) {
    return {
      status: 200,
      body: UNSPLASH_DAILY_BACKGROUND
    };
  }

  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    fetch: nodeFetch
  });

  const result = await unsplash.search.getPhotos({
    query: 'mountain'
  });

  if (result.status === 200) {
    const image = result.response.results[0];
    const today = new Date();

    today.setDate(today.getDate() + 1);

    const response = {
      url: image.urls.regular,
      author: {
        id: image.user.id,
        username: image.user.username,
        url: image.user.portfolio_url,
        avatar: image.user.profile_image.medium
      }
    };

    return {
      status: 200,
      body: response,
      headers: {
        'set-cookie': [
          `UNSPLASH_DAILY_BACKGROUND="${JSON.stringify(
            response
          )}";expires="${today.toUTCString()}";`
        ]
      }
    };
  }

  return {
    status: result.status,
    body: {
      message: 'An error ocurred fetching the resource'
    }
  };
}
