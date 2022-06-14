<script lang="ts">
  import SmileyXEyes from 'phosphor-svelte/lib/SmileyXEyes';
  import Post from '$lib/components/Post.svelte';
  import classNames from 'classnames';
  import Placeholder from 'svelte-content-placeholder';

  import Card from './Card.svelte';

  import type { OperationResultStore } from '@urql/svelte/dist/types/common';

  let customClassNames: string = null;
  export { customClassNames as class };

  export let posts: OperationResultStore;

  let className = classNames('w-full space-y-4', customClassNames);
</script>

<ul class={className}>
  {#if $posts.fetching}
    <li class="pt-4">
      <Card class="h-[122px]">
        <Placeholder width="100%">
          <rect x="2" y="2" rx="8" ry="8" width="63" height="62" />
          <rect x="75" y="3" rx="8" ry="8" width="149" height="22" />
          <rect x="77" y="41" rx="8" ry="8" width="110" height="19" />
          <rect x="2" y="72" rx="8" ry="8" width="394" height="19" />
        </Placeholder>
      </Card>
    </li>
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
