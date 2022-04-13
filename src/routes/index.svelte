<script lang="ts">
  import { onMount } from 'svelte';
  import Authenticate from '$lib/components/Authenticate/index.svelte';
  import type { Unsplash } from './api/unsplash';

  let unsplash: Unsplash = null;

  async function fetchBackground(): Promise<Unsplash> {
    const result = await fetch(`${import.meta.env.VITE_DOMAIN_URL}/api/unsplash`);

    if (result.status === 200) {
      const response = await result.json();

      return response;
    }

    return {
      url: 'https://images.unsplash.com/photo-1647764493244-c8d090e852ca',
      author: {
        id: 'j7cX8rf5igo',
        avatar:
          'https://images.unsplash.com/profile-1630570264204-c545f320cc8a?fm=jpg&fit=crop&h=500&w=500',
        url: null,
        username: 'ceydaciftci'
      }
    };
  }

  onMount(async () => {
    unsplash = await fetchBackground();
  });
</script>

<div
  style="background-image: url('{unsplash?.url}');"
  class="bg-black flex items-center justify-center min-h-screen bg-cover"
>
  <Authenticate />

  <div class="flex absolute bottom-9 left-5 h-16 w-16">
    <img src={unsplash?.author.avatar} alt={unsplash?.author.username} class="rounded-full" />
    <div class="flex-col mt-1.5 ml-2.5">
      <p class="block whitespace-nowrap inline text-white ml-2">
        By <a class="font-semibold" target="__blank" href={unsplash?.author.url}
          >{unsplash?.author.username}</a
        >
      </p>
      <p class="block ml-2 whitespace-nowrap text-white">
        Find similar pictures on <a
          class="font-semibold"
          target="__blank"
          href={`http://unsplash.com/@${unsplash?.author.username}`}>Unsplash</a
        >
      </p>
    </div>
  </div>
</div>
