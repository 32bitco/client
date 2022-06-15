<script lang="ts">
  import SmileyXEyes from 'phosphor-svelte/lib/SmileyXEyes';

  import Post from '$lib/components/Post.svelte';
  import classNames from 'classnames';

  import type { OperationResultStore } from '@urql/svelte/dist/types/common';

  let customClassNames: string = null;
  export { customClassNames as class };

  export let posts: OperationResultStore;

  let className = classNames('w-full space-y-4', customClassNames);
</script>

<ul class={className}>
  {#if $posts.fetching}
    Please wait...
  {:else}
    {#each $posts.data.feed.feed.edges.map(({ node }) => node) as post}
      <li>
        <Post {post} />
      </li>
    {:else}
      <li class="text-gray-600 flex flex-col justify-center items-center">
        <figure class="text-[100px]">
          <SmileyXEyes />
        </figure>
        <strong class="text-xl"> Looking empty... </strong>
      </li>
    {/each}
  {/if}
</ul>
